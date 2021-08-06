import { CommonModule } from '@angular/common';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpService } from '@core/services/http.service';
import { FaIconComponent } from '@fortawesome/angular-fontawesome';
import { SummaryComponent } from '@shared/components/summary/summary.component';
import { ConfigModal } from '@shared/model/config-modal';
import { TrackByPipe } from '@shared/pipe/track-by.pipe';
import { AuthenticateService } from '@shared/service/authenticate.service';
import { Solicitud } from '@solicitud/shared/model/solicitud';
import { SolicitudService } from '@solicitud/shared/service/solicitud.service';


import { ListarSolicitudComponent } from './listar-solicitud.component';
import swal from 'sweetalert2';
import { of } from 'rxjs';

describe('ListarSolicitudComponent', () => {
  let component: ListarSolicitudComponent;
  let fixture: ComponentFixture<ListarSolicitudComponent>;
  let authenticateService: AuthenticateService;
  let solicitudService: SolicitudService;
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
  const solicitud: Solicitud = {
      id: 1,
      status: 'delivered',
      city: 'Cartagena',
      address: 'carrera 30 #63B 30',
      productId: 1,
      material_count: 2,
      material_unit: 'Ton',
      total_price: '333000',
      contact_person: 'Rogelio Martinez',
      contact_number: '3009002222',
      day_to_dispatch: '2021-08-01 08:00:00',
      created_at: '2021-01-01 08:00:59',
      update_at: '2021-01-01 08:00:59',
      deleted_at: null,
      userId: 1
  };
  const configModal: ConfigModal = {
        titulo:  'Cancelada!',
        mensaje: 'Tu solicitud ha sido cancelada.',
        tipo: 'success'
  };
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HttpClientTestingModule,
                CommonModule

      ],
      declarations: [ ListarSolicitudComponent, TrackByPipe, FaIconComponent, SummaryComponent ],
      providers: [
                  SolicitudService,
                  HttpService,
                  AuthenticateService,
                  TrackByPipe,

      ]
    })
    .compileComponents();
    authenticateService = TestBed.inject(AuthenticateService);
    solicitudService = TestBed.inject(SolicitudService);
    solicitudService.currentUser = usuario;
    spyOnProperty(authenticateService, 'currentUserValue', 'get').and.returnValue(usuario);

  });
  afterEach(() => {
    if (swal.isVisible()){
      swal.close();
    }
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListarSolicitudComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    if (swal.isVisible()){
      swal.close();
    }
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('Deberia chequear Eliminar', (done) => {

    component.checkEliminar(solicitud);
    setTimeout(() => {
      expect(swal.isVisible()).toBeTruthy();
      expect(swal.getTitle().textContent).toEqual('Estas seguro de eliminar?');
      swal.clickConfirm();
    }, 2500);

    setTimeout(() => {
      swal.clickConfirm();
      done();
    }, 3500);

  });

  it('Deberia chequear cancelar', (done) => {
    component.cancelar(solicitud);
    setTimeout(() => {
      expect(swal.isVisible()).toBeTruthy();
      expect(swal.getTitle().textContent).toEqual('Estas seguro de cancelar?');
      swal.clickConfirm();
    }, 2500);
    setTimeout(() => {
      swal.clickConfirm();
      done();
    }, 3500);
  });


  it('Deberia chequear actualizar', (done) => {
    spyOn(solicitudService, 'actualizar').and.returnValue(of(true));
    component.actualizar(solicitud, configModal);
    setTimeout(() => {
      expect(swal.isVisible()).toBeTruthy();
      expect(swal.getTitle().textContent).toEqual(configModal.titulo);
      done();
    }, 2500);


  });

  it('Deberia chequear cancelar confirmacion cancelar solicitud', (done) => {
    component.cancelar(solicitud);
    setTimeout(() => {
      expect(swal.isVisible()).toBeTruthy();
      swal.clickCancel();
    }, 2500);

    setTimeout(() => {
      expect(swal.isVisible()).toBeFalse();
      done();
    }, 3500);
  });

  it('Deberia chequear cancelar confirmacion eliminar solicitud', (done) => {
    component.checkEliminar(solicitud);
    setTimeout(() => {
      expect(swal.isVisible()).toBeTruthy();
      swal.clickCancel();
    }, 2500);
    setTimeout(() => {
      expect(swal.isVisible()).toBeFalsy();
      done();
    }, 3500);
  });


  it('Deberia chequear actualizar falso', (done) => {
    spyOn(solicitudService, 'actualizar').and.returnValue(of(false));

    component.actualizar(solicitud, configModal);
    solicitudService.actualizar(solicitud).subscribe((response) => {
      expect(response).toEqual(false);
      done();
    });

  });


});
