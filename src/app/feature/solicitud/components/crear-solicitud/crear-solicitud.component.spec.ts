import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormBuilder, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpService } from '@core/services/http.service';
import { FaIconComponent } from '@fortawesome/angular-fontawesome';
import { NgbDate, NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { TrackByPipe } from '@shared/pipe/track-by.pipe';
import { AuthenticateService } from '@shared/service/authenticate.service';
import { ProductoService } from '@shared/service/producto.service';
import { SolicitudService } from '@solicitud/shared/service/solicitud.service';
import { of } from 'rxjs';
import { ListarSolicitudComponent } from '../listar-solicitud/listar-solicitud.component';

import { CrearSolicitudComponent } from './crear-solicitud.component';

describe('CrearSolicitudComponent', () => {
  let component: CrearSolicitudComponent;
  let fixture: ComponentFixture<CrearSolicitudComponent>;
  let authenticateService: AuthenticateService;
  let productoService: ProductoService;
  let solicitudService: SolicitudService;
  const producto = {
    id: 1,
    name: 'Poliestireno (PS)',
    active: true,
    price: 300,
    percentage_surcharge: 10,
    created_at: '2021-01-01 08:00:59',
    update_at: '2021-01-01 08:00:59',
    deleted_at: null
  };
  const productos = [producto, producto ];
  const usuario = {
    sessionToken: '123EFXEX235',
    user: {
      id: 1,
      name: 'SOFY',
      last_name: 'PLASTIC',
      document: '112000000',
      nit: 'N900517190',
      email: 'admin@sofyplastic.com',
      status: 'active',
      type: 'client',
      password: 'user1',
      created_at: '2021-01-01 08:00:59',
      update_at: '2021-01-01 08:00:59',
      deleted_at: null
    }
  };
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HttpClientTestingModule,
        RouterTestingModule.withRoutes([
          { path: 'listar', component: ListarSolicitudComponent },
        ]),
        NgbModule,
        FormsModule,
        ReactiveFormsModule
      ],
      declarations: [ CrearSolicitudComponent, FaIconComponent  ],
      providers: [SolicitudService,
                  HttpService,
                  AuthenticateService,
                  FormBuilder,
                  TrackByPipe,
                  ProductoService
                ]
    })
    .compileComponents();
    authenticateService = TestBed.inject(AuthenticateService);
    productoService = TestBed.inject(ProductoService);
    solicitudService = TestBed.inject(SolicitudService);

    spyOnProperty(authenticateService, 'currentUserValue', 'get').and.returnValue(usuario);

  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CrearSolicitudComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });


  it('deberia calcular precio total sin recargo', () => {
    const precioTotal = producto.price * 200;

    component.esFestivo(new NgbDate(2021, 8, 17));
    component.formSolicitud.controls[`material_unit`].setValue('KG');
    component.formSolicitud.controls[`product`].setValue(producto);
    component.formSolicitud.controls[`material_count`].setValue(200);

    component.calcularPrecio();

    expect(component.formSolicitud.get('total_price').value).toEqual(precioTotal);
  });

  it('deberia calcular precio total con recargo', () => {
    let precioTotal = producto.price * 200;
    precioTotal = precioTotal + (precioTotal * 0.10);

    component.esFestivo(new NgbDate(2021, 8, 16));
    component.formSolicitud.controls[`material_unit`].setValue('KG');
    component.formSolicitud.controls[`product`].setValue(producto);
    component.formSolicitud.controls[`material_count`].setValue(200);

    component.calcularPrecio();

    expect(component.formSolicitud.get('total_price').value).toEqual(precioTotal);
  });

  it('deberia obtener productos', () => {
    spyOn(productoService, 'consultarProductos').and.returnValue(of(productos));

    component.setupProductos();
    productoService.consultarProductos().subscribe( (response) => {

      expect(response.length).toEqual(productos.length);
    });

  });
  it('no deberia mostrar campos extras', () => {

    component.formSolicitud.controls[`day_to_dispatch`].setValue('');
    component.formSolicitud.controls[`material_count`].setValue('');
    component.formSolicitud.controls[`material_unit`].setValue('');
    component.formSolicitud.controls[`productId`].setValue('');

    const show = component.showExtras();

    expect(show).toBeTrue();

  });

  it('deberia mostrar campos extras', () => {

    component.formSolicitud.controls[`day_to_dispatch`].setValue(new NgbDate(2021, 8, 17));
    component.formSolicitud.controls[`material_count`].setValue(200);
    component.formSolicitud.controls[`material_unit`].setValue('KG');
    component.formSolicitud.controls[`productId`].setValue(1);
    component.formSolicitud.controls[`product`].setValue(producto);

    const show = component.showExtras();

    expect(show).toBeFalsy();

  });

  it('deberia crear Solicitud', () => {
    spyOn(solicitudService, 'guardar').and.returnValue(of(true));
    spyOn(productoService, 'returnProductoById').and.returnValue(producto);
    component.baseProductos = productos;

    component.ngOnInit();

    component.formSolicitud.controls[`day_to_dispatch`].setValue(new NgbDate(2021, 8, 17));
    component.formSolicitud.controls[`material_count`].setValue(200);
    component.formSolicitud.controls[`material_unit`].setValue('KG');
    component.formSolicitud.controls[`productId`].setValue(1);
    component.formSolicitud.controls[`product`].setValue(producto);
    component.formSolicitud.controls[`city`].setValue('Barranquilla');
    component.formSolicitud.controls[`address`].setValue('Carrera 30 #39 Sur');
    component.formSolicitud.controls[`contact_number`].setValue('3000101010');
    component.formSolicitud.controls[`contact_person`].setValue('Julio Lopez');

    expect(component.formSolicitud.valid).toBeTruthy();
    component.crearSolicitud();



    solicitudService.guardar(component.formSolicitud.value).subscribe((response) => {
      expect(response).toBeTrue();
    });



  });

});
