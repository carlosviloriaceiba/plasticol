import { HttpClientModule } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpService } from '@core/services/http.service';
import { TrmService } from '@shared/service/trm.service';

import { TrmComponent } from './trm.component';

describe('TrmComponent', () => {
  let component: TrmComponent;
  let fixture: ComponentFixture<TrmComponent>;

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
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
