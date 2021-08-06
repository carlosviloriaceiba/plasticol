import { HttpClientModule } from '@angular/common/http';
import { TestBed } from '@angular/core/testing';
import { HttpService } from '@core/services/http.service';
import { Trm } from '@shared/model/trm';
import { of } from 'rxjs';


import { TrmService } from './trm.service';

describe('TrmService', () => {
  let service: TrmService;
  let httpService: HttpService;
  const trm: Trm[] = [
    {
      valor: '3910.81',
      unidad: 'COP',
      vigenciadesde: '2021-08-06T00:00:00.000'
    }
  ];

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientModule
      ],
      providers: [HttpService]

    });
    service = TestBed.inject(TrmService);
    httpService = TestBed.inject(HttpService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });


  it('chequear setTrm', () => {

    service.setTrm(trm);

    expect(service.currenTrmValue).toEqual(trm);
  });

  it('chequear mostrarTrm', () => {
    spyOn(httpService, 'doGet').and.returnValue(of(trm));
    service.mostrarTrm().subscribe( (trmResult) => {
      expect(trmResult).toEqual(trm);
    });

  });
});
