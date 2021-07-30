import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
// import { Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpService } from '@core/services/http.service';
import { AuthenticateService } from '@shared/service/authenticate.service';
import { of } from 'rxjs/internal/observable/of';

import { LoginComponent } from './login.component';

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;
  let authenticateService: AuthenticateService;
  // let router: Router;

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
      declarations: [ LoginComponent ],
      imports: [
            CommonModule,
            HttpClientModule,
            RouterTestingModule,
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
    // router = TestBed.inject(Router);

    fixture.detectChanges();
/*     spyOn(authenticateService, 'login').and.returnValue(
      of(usuario)
      ); */
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
    component.login();
    spyOn(authenticateService, 'login').and.returnValue(
      of(usuario)
      );
    fixture.detectChanges();
    expect(component.enviado).toBeTrue();

  }));

  it('deberia obtener credenciales del', waitForAsync(() => {


    spyOn(authenticateService, 'login').and.callThrough();


    component.login();
    expect(authenticateService.login).toHaveBeenCalled();
   /*  component.login();
    fixture.detectChanges();
    expect(authenticateService.login).toHaveBeenCalled(); */

  }));


/*   it('chequear usuario no autenticado redirect login route', waitForAsync(() => {

    component.login();
    const navigateSpy = spyOn(router, 'navigate');

    //expect(component.redirect()).toHaveBeenCalled();

    expect(navigateSpy ).toHaveBeenCalledWith(['/home']);

  })); */

});
