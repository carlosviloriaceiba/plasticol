import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormBuilder, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpService } from '@core/services/http.service';
import { FaIconComponent } from '@fortawesome/angular-fontawesome';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { TrackByPipe } from '@shared/pipe/track-by.pipe';
import { AuthenticateService } from '@shared/service/authenticate.service';
import { SolicitudService } from '@solicitud/shared/service/solicitud.service';

import { CrearSolicitudComponent } from './crear-solicitud.component';

describe('CrearSolicitudComponent', () => {
  let component: CrearSolicitudComponent;
  let fixture: ComponentFixture<CrearSolicitudComponent>;
  let authenticateService: AuthenticateService;
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
      imports: [HttpClientTestingModule,
        RouterTestingModule,
        NgbModule,
        FormsModule,
        ReactiveFormsModule
      ],
      declarations: [ CrearSolicitudComponent, FaIconComponent  ],
      providers: [SolicitudService,
                  HttpService,
                  AuthenticateService,
                  FormBuilder,
                  TrackByPipe
                ]
    })
    .compileComponents();
    authenticateService = TestBed.inject(AuthenticateService);
    spyOnProperty(authenticateService, 'currentUserValue', 'get').and.returnValue(usuario);
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CrearSolicitudComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
