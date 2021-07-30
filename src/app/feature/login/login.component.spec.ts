import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpService } from '@core/services/http.service';
import { HomeComponent } from '@home/home.component';
import { TrmComponent } from '@shared/components/trm/trm.component';
import { AuthenticateService } from '@shared/service/authenticate.service';
import { of } from 'rxjs/internal/observable/of';

import { LoginComponent } from './login.component';

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;
  let authenticateService: AuthenticateService;
  let router: Router;

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
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LoginComponent, TrmComponent ],
      imports: [
            CommonModule,
            HttpClientModule,
            RouterTestingModule.withRoutes([
              { path: 'home', component: HomeComponent },
            ]),
            ReactiveFormsModule,

      ],
      providers: [AuthenticateService, HttpService, FormBuilder]
    })
    .compileComponents();

  });

  beforeEach(waitForAsync(() => {

    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    authenticateService = TestBed.inject(AuthenticateService);
    router = TestBed.inject(Router);

    fixture.detectChanges();

  }));



  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('deberia obtener controls form',  waitForAsync(() => {
    const controls = component.f;
    expect(Object.keys(controls)).toContain('username');
    expect(Object.keys(controls)).toContain('password');
  }));

  it('deberia cambiar enviado al hacer login ',  waitForAsync(() => {

    spyOn(authenticateService, 'login').and.returnValue(
      of(usuario)
      );
    component.loginForm.controls[`username`].setValue('admin@sofyplastic.com');
    component.loginForm.controls[`password`].setValue('user1');
    component.login();

    expect(component.enviado).toBeTrue();

  }));

  it('deberia obtener credenciales del', waitForAsync(() => {


    spyOn(authenticateService, 'login').and.returnValue(
      of(usuario)
      );

    component.loginForm.controls[`username`].setValue('admin@sofyplastic.com');
    component.loginForm.controls[`password`].setValue('user1');
    component.login();

    expect(authenticateService.login).toHaveBeenCalled();

  }));


  it('chequear usuario autenticado redirect home', waitForAsync(() => {
    spyOn(authenticateService, 'login').and.returnValue(
      of(usuario)
    );
    const navigateSpy = spyOn(router, 'navigate');

    component.loginForm.controls[`username`].setValue('admin@sofyplastic.com');
    component.loginForm.controls[`password`].setValue('user1');

    component.login();

    expect(navigateSpy ).toHaveBeenCalledWith(['/home']);

  }));

  it('chequear redirect function', waitForAsync(() => {

    const redirect = spyOn(component, 'redirect');
    component.redirect();

    expect(redirect).toHaveBeenCalled();

  }));

});
