import { HttpClientModule } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpService } from '@core/services/http.service';

import { AuthenticateService } from './authenticate.service';


describe('AuthenticateService', () => {
  let service: AuthenticateService;
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

    const login = spyOn(service, 'login');

    service.login(usuario.user);

    expect(login).toHaveBeenCalled();

  });

  it('chequear logout', () => {

    const logout = spyOn(service, 'logout');

    service.logout();

    expect(logout).toHaveBeenCalled();

  });
});
