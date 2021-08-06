import { TestBed } from '@angular/core/testing';
import { NgbDate } from '@ng-bootstrap/ng-bootstrap';

import { FestivosService } from './festivos.service';

describe('FestivosService', () => {
  let service: FestivosService;

  const diaFestivo: NgbDate = new NgbDate(new Date().getFullYear(), 12, 8);
  const diaNormal: NgbDate =  new NgbDate(new Date().getFullYear(), 12, 1);
  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FestivosService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('chequear dia festivo', () => {
   const date = service.consultar(diaFestivo);
   expect(date).toBeTrue();
  });
  it('chequear dia no festivo', () => {
    const date = service.consultar(diaNormal);
    expect(date).toBeFalse();
   });

  it('chequear date condicion consultar', () => {
    const date = service.consultar(undefined);
    expect(date).toBeFalse();
  });

});
