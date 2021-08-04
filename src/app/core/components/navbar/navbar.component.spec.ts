import { HttpClientModule } from '@angular/common/http';
import { waitForAsync, ComponentFixture, TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpService } from '@core/services/http.service';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { AuthenticateService } from '@shared/service/authenticate.service';



import { NavbarComponent } from './navbar.component';

describe('NavbarComponent', () => {
  let component: NavbarComponent;
  let fixture: ComponentFixture<NavbarComponent>;
  let authenticateService: AuthenticateService;
  let router: Router;


  beforeEach(waitForAsync(() => {

    TestBed.configureTestingModule({
      declarations: [ NavbarComponent ],
      imports: [
        RouterTestingModule,
        HttpClientModule,
        NgbModule
      ],
      providers: [AuthenticateService, HttpService ]
    })
    .compileComponents();

  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NavbarComponent);
    authenticateService = TestBed.inject(AuthenticateService);
    router = TestBed.inject(Router);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('chequear llamado logout ', () => {
    const logout = spyOn(authenticateService, 'logout');
    const navigateSpy = spyOn(router, 'navigate');

    component.logout();

    expect(logout).toHaveBeenCalled();
    expect(navigateSpy ).toHaveBeenCalledWith(['/login']);
  });

});
