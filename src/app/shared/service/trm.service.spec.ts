import { HttpClientModule } from '@angular/common/http';
import { TestBed } from '@angular/core/testing';
import { HttpService } from '@core/services/http.service';

import { TrmService } from './trm.service';

describe('TrmService', () => {
  let service: TrmService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientModule
      ],
      providers: [HttpService]

    });
    service = TestBed.inject(TrmService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
