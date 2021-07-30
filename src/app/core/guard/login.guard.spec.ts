import { TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';



import { LoginGuard } from './login.guard';

describe('LoginGuard', () => {
  let guard: LoginGuard;
  let router: Router;


  beforeEach(() => {

    TestBed.configureTestingModule({
      imports: [RouterTestingModule],
      providers: [LoginGuard]
    });
    guard = TestBed.inject(LoginGuard);
    router = TestBed.inject(Router);


  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });

  it('chequear usuario autenticado redirect home route', () => {
    // spyOn(storageService, 'estaAutenticado').and.returnValue(true);
    const navigateSpy = spyOn(router, 'navigate');
    expect(guard.canActivate()).toEqual(false);
    expect(navigateSpy).toHaveBeenCalledWith(['/home']);
  });

  it('chequear usuario no autenticado puede acceder login', () => {
    // spyOn(storageService, 'estaAutenticado').and.returnValue(false);
    expect(guard.canActivate()).toBeTrue();
  });

});
