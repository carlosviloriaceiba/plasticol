import { HttpClientModule } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpService } from '@core/services/http.service';

import { AuthenticateService } from './authenticate.service';


describe('AuthenticateService', () => {
  let service: AuthenticateService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule,
                RouterTestingModule,
                HttpClientModule
      ],
      providers: [AuthenticateService, HttpService]
    });
    service = TestBed.inject(AuthenticateService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
