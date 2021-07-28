import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { Summary } from '@shared/model/summary';
import { environment } from 'src/environments/environment';
import { HttpService } from '../../core/services/http.service';

import { SummaryService } from './summary.service';

describe('SummaryService', () => {
  let httpMock: HttpTestingController;
  let service: SummaryService;
  const apiEndpointSolicitudSummary = `${environment.endpoint}/summary`;

  beforeEach(() => {
    const injector = TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [SummaryService, HttpService]
    });
    httpMock = injector.inject(HttpTestingController);
    service = TestBed.inject(SummaryService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('obtener sumario', () => {
    const dummySummary: Summary = {
      request_ton: 25,
      pending_ton: 10,
      percentage_success_request: 85
    };

    service.consultarSummary().subscribe(sumario => {
      expect(sumario[`request_ton`]).toBe(25);
      expect(sumario).toEqual(dummySummary);
    });
    const req = httpMock.expectOne(apiEndpointSolicitudSummary);
    expect(req.request.method).toBe('GET');
    req.flush(dummySummary);
  });



});
