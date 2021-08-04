import { HttpClientModule } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpService } from '@core/services/http.service';
import { of } from 'rxjs';
import { environment } from 'src/environments/environment';

import { AuthenticateService } from './authenticate.service';


describe('AuthenticateService', () => {
  let service: AuthenticateService;
  let httpService: HttpService;
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
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule,
                RouterTestingModule,
                HttpClientModule
      ],
      providers: [AuthenticateService, HttpService]
    });
    service = TestBed.inject(AuthenticateService);
    httpService = TestBed.inject(HttpService);
  });

  afterEach(() => {
    sessionStorage.removeItem(`${environment.session_key}`);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('obtener currentUserValue', () => {
    spyOnProperty(service, 'currentUserValue', 'get').and.returnValue(usuario);

    const dataUser = service.currentUserValue;

    expect(dataUser).toEqual(usuario);
  });
  it('chequear login', () => {
    spyOn(httpService, 'doPost');
    spyOn(service, 'login').and.returnValue(of(usuario));
    service.login(usuario.user).subscribe( (user) => {
      expect(user).toEqual(usuario);

    });

  });

  it('chequear logout', () => {

    sessionStorage.setItem(`${environment.session_key}`, JSON.stringify(usuario));
    service.logout();
    expect(sessionStorage.getItem(`${environment.session_key}`)).toBeNull();

  });
});
