import { Component, OnInit } from '@angular/core';
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


@Component({
  selector: 'app-crear-solicitud',
  templateUrl: './crear-solicitud.component.html',
  styleUrls: ['./crear-solicitud.component.scss']
})
export class CrearSolicitudComponent implements OnInit {
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
    month: new Date().getMonth() + 1,
    day: new Date().getDate() + 2
  };
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
      this.markDisabled =  (date: NgbDate) => this.calendar.getWeekday(date) >= 6;
      console.log(this.festivosService.consultar(new Date().getFullYear()));
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
      user: [this.currentUser.user, Validators.required]
    });

    this.formSolicitud.get('productId').valueChanges.subscribe( (val) => {

      if (val){
        const value = this.productoService.returnProductoById(this.baseProductos, val);
        console.log(value);
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
