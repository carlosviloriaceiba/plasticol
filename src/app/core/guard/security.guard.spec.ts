import { TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';


import { SecurityGuard } from './security.guard';

describe('SecurityGuard', () => {
  let guard: SecurityGuard;
  let router: Router;


  beforeEach(() => {

    TestBed.configureTestingModule({
      imports: [RouterTestingModule],
      providers: [SecurityGuard]
    });
    guard = TestBed.inject(SecurityGuard);
    router = TestBed.inject(Router);


  });

  it('should ...', () => {
    expect(guard).toBeTruthy();
  });

  it('chequear usuario no autenticado redirect login route', () => {
    //spyOn(storageService, 'estaAutenticado').and.returnValue(false);
    const navigateSpy = spyOn(router, 'navigate');
    expect(guard.canActivate()).toEqual(false);
    expect(navigateSpy).toHaveBeenCalledWith(['/login']);
  });

  it('chequear usuario autenticado', () => {
    //spyOn(storageService, 'estaAutenticado').and.returnValue(true);
    expect(guard.canActivate()).toBeTrue();

  });

});
