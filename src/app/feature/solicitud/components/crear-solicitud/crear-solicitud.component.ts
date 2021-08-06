import { AfterContentChecked, Component, OnInit } from '@angular/core';
import { ProductoService } from '@shared/service/producto.service';
import { FestivosService } from '@shared/service/festivos.service';
import { Producto } from '@shared/model/producto';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Session } from '@shared/model/session';
import { AuthenticateService } from '@shared/service/authenticate.service';
import { faCalendarAlt } from '@fortawesome/free-solid-svg-icons';
import { SolicitudService } from '@solicitud/shared/service/solicitud.service';
import { NgbCalendar, NgbDate } from '@ng-bootstrap/ng-bootstrap';
import { ActivatedRoute, Router } from '@angular/router';
import swal from 'sweetalert2';

const diasParaHabilitarPedido = 2;
const factoParaMes = 1;
const diasDisabled = 6;
const factorRecargo =  0.10;

@Component({
  selector: 'app-crear-solicitud',
  templateUrl: './crear-solicitud.component.html',
  styleUrls: ['./crear-solicitud.component.scss']
})



export class CrearSolicitudComponent implements OnInit, AfterContentChecked {
  public enviado = false;
  public baseProductos: Producto[];
  public ciudades = [
    {value: 'Barranquilla', label: 'Barranquilla' },
    {value: 'Cartagena', label: 'Cartagena' },
    {value: 'Santa Marta', label: 'Santa Marta' },
    {value: 'Valledeupar', label: 'Valledeupar' }
  ];
  public units = [
    {value: 'Ton', label: 'Ton' },
    {value: 'KG', label: 'KG' }
  ];
  public date: {year: number, month: number};
  private currentUser: Session;
  public formSolicitud: FormGroup;
  public faCalendarAlt = faCalendarAlt;
  public markDisabled;

  public minDate =  {
    year: new Date().getFullYear(),
    month: new Date().getMonth() + factoParaMes,
    day: new Date().getDate() + diasParaHabilitarPedido
  };
  public totalPedido = 0;
  public recargo = false;

  constructor(private festivosService: FestivosService,
              private productoService: ProductoService,
              private formBuilder: FormBuilder,
              private authenticateService: AuthenticateService,
              private solicitudService: SolicitudService,
              private calendar: NgbCalendar,
              private router: Router,
              private route: ActivatedRoute
    ) {
      this.currentUser = this.authenticateService.currentUserValue;
      this.markDisabled =  (date: NgbDate) => this.calendar.getWeekday(date) >= diasDisabled;
   }

  ngAfterContentChecked(): void {
    this.calcularPrecio();
  }
  ngOnInit(): void {
    this.formSolicitud = this.formBuilder.group({
      day_to_dispatch: ['', Validators.required],
      city: ['', Validators.required],
      address: ['', Validators.required],
      contact_number: ['', Validators.required],
      contact_person: ['', Validators.required],
      material_count: ['', Validators.required],
      material_unit: ['', Validators.required],
      product: [''],
      productId: ['', Validators.required],
      userId: [this.currentUser.user.id, Validators.required],
      user: [this.currentUser.user, Validators.required],
      total_price: [''],
    });

    this.formSolicitud.get('productId').valueChanges.subscribe( (val) => {
      if (val){
        const value = this.productoService.returnProductoById(this.baseProductos, val);
        this.formSolicitud.get('product').setValue(value);
      }else{
        this.formSolicitud.get('product').setValue('');
      }
    });

    this.setupProductos();
  }
  get f() { return this.formSolicitud.controls; }

  setupProductos() {
    this.productoService.consultarProductos().subscribe((productos) => {
      this.baseProductos = productos;
    });
  }
  calcularPrecio(){
    const unidad = this.formSolicitud.get('material_unit').value;
    const producto = this.formSolicitud.get('product').value;
    const cantidad = this.formSolicitud.get('material_count').value;

    if (unidad && producto !== '' &&  cantidad !== ''){

      const value = this.solicitudService.getPrice(producto, cantidad, unidad);
      this.totalPedido = value;
      if ( this.recargo) {
        this.totalPedido = this.totalPedido + (this.totalPedido * factorRecargo);

      }
    }else{
      this.totalPedido = 0;
    }
    this.formSolicitud.get('total_price').setValue(this.totalPedido);
  }

  esFestivo(data: NgbDate){
    const festivo = this.festivosService.consultar(data);
    if (festivo){
      this.recargo = true;
      swal.fire({
        title: 'Recargo Servicio',
        text: `Por seleccionar un dia festivo tienes un recargo de 10% en tu pedido!`,
        icon: 'warning',
        showCancelButton: false,
        confirmButtonColor: '#3085d6',
        confirmButtonText: 'Ok'
      });
    } else {
      this.recargo = false;
    }
    this.calcularPrecio();
  }

  showExtras(){
   return  (this.f.day_to_dispatch.status === 'INVALID' ||
          this.f.material_count.status === 'INVALID' ||
          this.f.material_unit.status === 'INVALID' ||
          this.f.productId.status === 'INVALID');

  }

  crearSolicitud(): void {

    this.enviado = true;
    if (this.formSolicitud.valid){
      const data = JSON.parse(JSON.stringify(this.formSolicitud.value));
      this.solicitudService.guardar(data).subscribe( (creado) => {
        if (creado){
          this.redirect();
        }
      });
    }
  }

  redirect(){
    this.router.navigate(['../listar'], {relativeTo: this.route});
  }

}
