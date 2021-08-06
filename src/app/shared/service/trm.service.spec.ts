import { HttpClientModule, HttpParams } from '@angular/common/http';
import { TestBed } from '@angular/core/testing';
import { HttpService, Options } from '@core/services/http.service';
import * as moment from 'moment';
import { of } from 'rxjs';
import { environment } from 'src/environments/environment';

import { TrmService } from './trm.service';

describe('TrmService', () => {
  let service: TrmService;
  let httpService: HttpService;
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

  it('should be created', () => {
    const opts: Options = {
      params: new HttpParams()
      .set('$$app_token', environment.token_trm)
      .set('$select', 'valor,unidad,vigenciadesde')
      .set('vigenciadesde', moment().format('YYYY-MM-DDT00:00:00.000'))
    };
    spyOn(httpService, 'doGet').and.returnValue(of(undefined));
    httpService.doGet(service.url, opts).subscribe( (trm) => {
      expect(trm).toBeUndefined();
    });
  });
});
