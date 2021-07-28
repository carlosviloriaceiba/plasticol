import { TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { Session } from '@shared/model/session';
import { environment } from 'src/environments/environment';


import { StorageService } from './storage.service';

describe('StorageService', () => {
  let service: StorageService;
  let dummySession: Session;
  let router: Router;

  beforeEach(() => {
    let store = {};
    dummySession = {
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
    const mockSessionStorage = {
      getItem: (key: string): string => {
        return key in store ? store[key] : null;
      },
      setItem: (key: string, value: string) => {
        store[key] = `${value}`;
      },
      removeItem: (key: string) => {
        delete store[key];
      },
      clear: () => {
        store = {};
      }
    };
    TestBed.configureTestingModule({
      imports: [RouterTestingModule],
      providers: [StorageService]
    });
    service = TestBed.inject(StorageService);
    router = TestBed.inject(Router);

    spyOn(sessionStorage, 'getItem')
    .and.callFake(mockSessionStorage.getItem);
    spyOn(sessionStorage, 'setItem')
      .and.callFake(mockSessionStorage.setItem);
    spyOn(sessionStorage, 'removeItem')
      .and.callFake(mockSessionStorage.removeItem);
    spyOn(sessionStorage, 'clear')
      .and.callFake(mockSessionStorage.clear);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('setear sessionActual', () => {
      service.setsessionActual(dummySession);
      expect(JSON.parse(sessionStorage.getItem(environment.session_key))[`sessionToken`]).toEqual('123EFXEX235');
  });

  it('chequear cargarSession', () => {
    sessionStorage.setItem(environment.session_key, JSON.stringify(dummySession));
    expect(service.cargarSession()).toEqual(dummySession);

  });

  it('chequear getSessionActual', () => {
    service.setsessionActual(dummySession);
    expect(service.getSessionActual()).toEqual(dummySession);

  });

  it('chequear borrarActualSession', () => {
    sessionStorage.setItem(environment.session_key, JSON.stringify(dummySession));
    service.borrarActualSession();
    expect(service.cargarSession()).toBeNull();

  });

  it('chequear estaAutenticado', () => {
    sessionStorage.setItem(environment.session_key, JSON.stringify(dummySession));
    expect(service.estaAutenticado()).toBeTrue();

  });
  it('chequear no estaAutenticado', () => {
    expect(service.estaAutenticado()).toBeFalse();

  });

  it('obtener getToken', () => {
    sessionStorage.setItem(environment.session_key, JSON.stringify(dummySession));
    expect(service.getToken()).toEqual('123EFXEX235');

  });

  it('chequear getToken null', () => {
    expect(service.getToken()).toBeNull();

  });

  it('chequear logout', () => {
    const navigateSpy = spyOn(router, 'navigate');
    sessionStorage.setItem(environment.session_key, JSON.stringify(dummySession));
    service.logout();
    expect(service.cargarSession()).toBeNull();
    expect(navigateSpy ).toHaveBeenCalledWith(['/login']);


  });


});
