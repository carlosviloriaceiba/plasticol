import { HttpClientModule } from '@angular/common/http';
import { TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpService } from '@core/services/http.service';
import { AuthenticateService } from '@shared/service/authenticate.service';


import { SecurityGuard } from './security.guard';

describe('SecurityGuard', () => {
  let guard: SecurityGuard;
  let router: Router;
  let authenticateService: AuthenticateService;
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
      imports: [RouterTestingModule,
                HttpClientModule
      ],
      providers: [SecurityGuard, HttpService, AuthenticateService ]
    });
    guard = TestBed.inject(SecurityGuard);
    router = TestBed.inject(Router);
    authenticateService = TestBed.inject(AuthenticateService);

  });

  it('should ...', () => {
    expect(guard).toBeTruthy();
  });

  it('chequear usuario no autenticado redirect login route', () => {
    spyOnProperty(authenticateService, 'currentUserValue', 'get').and.returnValue(null);
    const navigateSpy = spyOn(router, 'navigate');
    expect(guard.canActivate()).toEqual(false);
    expect(navigateSpy).toHaveBeenCalledWith(['/login']);
  });

  it('chequear usuario autenticado', () => {
    spyOnProperty(authenticateService, 'currentUserValue', 'get').and.returnValue(usuario);
    expect(guard.canActivate()).toBeTrue();

  });

});
