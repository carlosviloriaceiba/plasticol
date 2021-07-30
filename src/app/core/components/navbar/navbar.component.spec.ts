import { HttpClientModule } from '@angular/common/http';
import { waitForAsync, ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpService } from '@core/services/http.service';
import { AuthenticateService } from '@shared/service/authenticate.service';



import { NavbarComponent } from './navbar.component';

describe('NavbarComponent', () => {
  let component: NavbarComponent;
  let fixture: ComponentFixture<NavbarComponent>;
  // let dummySession: Session;


  beforeEach(waitForAsync(() => {
    let store = {};
   /*  dummySession = {
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
    }; */
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
      declarations: [ NavbarComponent ],
      imports: [
        RouterTestingModule,
        HttpClientModule
      ],
      providers: [AuthenticateService, HttpService ]
    })
    .compileComponents();


    spyOn(sessionStorage, 'getItem')
    .and.callFake(mockSessionStorage.getItem);
    spyOn(sessionStorage, 'setItem')
      .and.callFake(mockSessionStorage.setItem);
    spyOn(sessionStorage, 'removeItem')
      .and.callFake(mockSessionStorage.removeItem);
    spyOn(sessionStorage, 'clear')
      .and.callFake(mockSessionStorage.clear);



  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NavbarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
