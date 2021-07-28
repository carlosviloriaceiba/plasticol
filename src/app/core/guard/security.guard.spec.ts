import { TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { StorageService } from '@shared/service/storage.service';

import { SecurityGuard } from './security.guard';

describe('SecurityGuard', () => {
  let guard: SecurityGuard;
  let router: Router;
  let storageService: StorageService;

  beforeEach(() => {

    TestBed.configureTestingModule({
      imports: [RouterTestingModule],
      providers: [SecurityGuard]
    });
    guard = TestBed.inject(SecurityGuard);
    router = TestBed.inject(Router);
    storageService = TestBed.inject(StorageService);

  });

  it('should ...', () => {
    expect(guard).toBeTruthy();
  });

  it('chequear usuario no autenticado redirect login route', () => {
    spyOn(storageService, 'estaAutenticado').and.returnValue(false);
    const navigateSpy = spyOn(router, 'navigate');
    expect(guard.canActivate()).toEqual(false);
    expect(navigateSpy).toHaveBeenCalledWith(['/login']);
  });

  it('chequear usuario autenticado', () => {
    spyOn(storageService, 'estaAutenticado').and.returnValue(true);
    expect(guard.canActivate()).toBeTrue();

  });

});
