import { HttpResponse } from '@angular/common/http';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
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
      providers: [SolicitudService, HttpService]
    });
    httpMock = injector.inject(HttpTestingController);
    service = TestBed.inject(SolicitudService);

  });

  it('should be created', () => {
    const solicitudService: SolicitudService = TestBed.inject(SolicitudService);
    expect(solicitudService).toBeTruthy();
  });

  it('listar solicitudes', () => {
    const dummySolicitud = [
      new Solicitud('1',
                    'Calle 55 #32',
                    1,
                    23,
                    'Ton',
                    '30024902',
                    '2021-08-01 08:00:00'),
      new Solicitud('2',
                    'Calle 55 #32',
                    3,
                    633,
                    'KG',
                    '3002222222',
                    '2021-08-01 08:00:00',
                    )
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
    const dummySolicitud = new Solicitud('1',
    'Calle 55 #32',
    1,
    23,
    'Ton',
    '30024902',
    '2021-08-01 08:00:00');
    service.guardar(dummySolicitud).subscribe((respuesta) => {
      expect(respuesta).toEqual(true);
    });
    const req = httpMock.expectOne(apiEndpointSolicitudConsulta);
    expect(req.request.method).toBe('POST');
    req.event(new HttpResponse<boolean>({body: true}));
  });

  it('eliminar un producto', () => {
    const dummyProducto = new Solicitud('1',
    'Calle 55 #32',
    1,
    23,
    'Ton',
    '30024902',
    '2021-08-01 08:00:00');
    service.eliminar(dummyProducto).subscribe((respuesta) => {
      expect(respuesta).toEqual(true);
    });
    const req = httpMock.expectOne(`${apiEndpointSolicitudConsulta}/1`);
    expect(req.request.method).toBe('DELETE');
    req.event(new HttpResponse<boolean>({body: true}));
  });

});
