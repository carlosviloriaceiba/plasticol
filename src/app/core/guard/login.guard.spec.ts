import { HttpClientModule } from '@angular/common/http';
import { TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpService } from '@core/services/http.service';
import { HomeComponent } from '@home/home.component';
import { AuthenticateService } from '@shared/service/authenticate.service';



import { LoginGuard } from './login.guard';

describe('LoginGuard', () => {
  let guard: LoginGuard;
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
      imports: [RouterTestingModule.withRoutes([
                          { path: 'home', component: HomeComponent },
                ]),
                HttpClientModule
      ],
      providers: [LoginGuard, HttpService, AuthenticateService]
    });
    guard = TestBed.inject(LoginGuard);
    router = TestBed.inject(Router);
    authenticateService = TestBed.inject(AuthenticateService);

  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });

  it('chequear usuario autenticado redirect home route', () => {
    const navigateSpy = spyOn(router, 'navigate');
    spyOnProperty(authenticateService, 'currentUserValue', 'get').and.returnValue(usuario);

    guard.canActivate();

    expect(navigateSpy).toHaveBeenCalledWith(['/home']);
  });

  it('chequear usuario no autenticado puede acceder login', () => {
    spyOnProperty(authenticateService, 'currentUserValue', 'get').and.returnValue(null);
    expect(guard.canActivate()).toBeTrue();
  });

});
