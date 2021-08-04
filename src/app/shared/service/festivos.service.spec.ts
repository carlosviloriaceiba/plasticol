import { TestBed } from '@angular/core/testing';
import { NgbDate } from '@ng-bootstrap/ng-bootstrap';

import { FestivosService } from './festivos.service';

describe('FestivosService', () => {
  let service: FestivosService;
  const diaFestivo: NgbDate = new NgbDate(2021, 8, 16);
  const diaNormal: NgbDate =  new NgbDate(2021, 8, 17);
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
});
