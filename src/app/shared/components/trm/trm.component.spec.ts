import { HttpClientModule } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpService } from '@core/services/http.service';
import { TrmService } from '@shared/service/trm.service';
import { environment } from 'src/environments/environment';

import { TrmComponent } from './trm.component';

describe('TrmComponent', () => {
  let component: TrmComponent;
  let fixture: ComponentFixture<TrmComponent>;
  let trmService: TrmService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TrmComponent ],
      imports: [
        HttpClientModule,
        HttpClientTestingModule
      ],
      providers: [TrmService, HttpService]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TrmComponent);
    trmService = TestBed.inject(TrmService);
    component = fixture.componentInstance;
    fixture.detectChanges();
    sessionStorage.removeItem(`${environment.session_key}_trm`);
  });

  afterEach(() => {
    sessionStorage.removeItem(`${environment.session_key}_trm`);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('deberia chequear trm null', () => {
    spyOnProperty(trmService, 'currenTrmValue', 'get').and.returnValue(null);
    component.currentTrm = null;
    component.ngOnInit();
    expect(component.currentTrm).toBeNull();
  });


});
