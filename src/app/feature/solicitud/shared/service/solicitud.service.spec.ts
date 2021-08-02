import { HttpResponse } from '@angular/common/http';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { AuthenticateService } from '@shared/service/authenticate.service';
import { environment } from 'src/environments/environment';
import { HttpService } from '../../../../core/services/http.service';
import { Solicitud } from '../model/solicitud';

import { SolicitudService } from './solicitud.service';

describe('SolicitudService', () => {
  let httpMock: HttpTestingController;
  let service: SolicitudService;
  const apiEndpointSolicitudConsulta = `${environment.endpoint}/requests`;

  beforeEach(() => {

    const injector = TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [SolicitudService, HttpService, AuthenticateService]
    });
    httpMock = injector.inject(HttpTestingController);
    service = TestBed.inject(SolicitudService);

  });

  it('should be created', () => {
    const solicitudService: SolicitudService = TestBed.inject(SolicitudService);
    expect(solicitudService).toBeTruthy();
  });

  it('listar solicitudes', () => {
    const dummySolicitud: Solicitud[] =  [

      {
        id: 1,
        city: 'Bogota',
        address:  'Calle 55 #32',
        productId: 1,
        material_count: 23,
        material_unit: 'Ton',
        contact_person: 'Carlos Viloria',
        contact_number: '3003003030',
        day_to_ispatch:  '2021-08-01 08:00:00',
        created_at:  '2021-07-01 08:00:00',
        update_at:  '2021-07-01 08:00:00',
        delete_at: null,
        userId: 1,
      },
      {
        id: 2,
        city: 'Cartagena',
        address:  'Calle 55 #32',
        productId: 2,
        material_count: 633,
        material_unit: 'KG',
        contact_person: 'Viviana Villa',
        contact_number: '3003003131',
        day_to_ispatch:  '2021-09-11 08:00:00',
        created_at:  '2021-07-01 08:00:00',
        update_at:  '2021-07-01 08:00:00',
        delete_at: null,
        userId: 1,
      },



    ];
    service.consultar().subscribe(solicitudes => {
      expect(solicitudes.length).toBe(2);
      expect(solicitudes).toEqual(dummySolicitud);
    });
    const req = httpMock.expectOne(apiEndpointSolicitudConsulta);
    expect(req.request.method).toBe('GET');
    req.flush(dummySolicitud);
  });

  it('crear un producto', () => {
    const dummySolicitud: Solicitud = {
      id: 1,
      city: 'Bogota',
      address:  'Calle 55 #32',
      productId: 1,
      material_count: 23,
      material_unit: 'Ton',
      contact_person: 'Carlos Viloria',
      contact_number: '3003003030',
      day_to_ispatch:  '2021-08-01 08:00:00',
      created_at:  '2021-07-01 08:00:00',
      update_at:  '2021-07-01 08:00:00',
      delete_at: null,
      userId: 1,
    };
    service.guardar(dummySolicitud).subscribe((respuesta) => {
      expect(respuesta).toEqual(true);
    });
    const req = httpMock.expectOne(apiEndpointSolicitudConsulta);
    expect(req.request.method).toBe('POST');
    req.event(new HttpResponse<boolean>({body: true}));
  });

  it('eliminar un producto', () => {
    const dummyProducto: Solicitud = {
      id: 1,
      city: 'Bogota',
      address:  'Calle 55 #32',
      productId: 1,
      material_count: 23,
      material_unit: 'Ton',
      contact_person: 'Carlos Viloria',
      contact_number: '3003003030',
      day_to_ispatch:  '2021-08-01 08:00:00',
      created_at:  '2021-07-01 08:00:00',
      update_at:  '2021-07-01 08:00:00',
      delete_at: null,
      userId: 1,
    };
    service.eliminar(dummyProducto).subscribe((respuesta) => {
      expect(respuesta).toEqual(true);
    });
    const req = httpMock.expectOne(`${apiEndpointSolicitudConsulta}/1`);
    expect(req.request.method).toBe('DELETE');
    req.event(new HttpResponse<boolean>({body: true}));
  });

});
