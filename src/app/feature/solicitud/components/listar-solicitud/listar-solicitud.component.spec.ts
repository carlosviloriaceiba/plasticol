import { CommonModule } from '@angular/common';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpService } from '@core/services/http.service';
import { FaIconComponent } from '@fortawesome/angular-fontawesome';
import { TrackByPipe } from '@shared/pipe/track-by.pipe';
import { AuthenticateService } from '@shared/service/authenticate.service';
import { SolicitudService } from '@solicitud/shared/service/solicitud.service';

import { ListarSolicitudComponent } from './listar-solicitud.component';

describe('ListarSolicitudComponent', () => {
  let component: ListarSolicitudComponent;
  let fixture: ComponentFixture<ListarSolicitudComponent>;
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
                CommonModule

      ],
      declarations: [ ListarSolicitudComponent, TrackByPipe, FaIconComponent ],
      providers: [SolicitudService,
                  HttpService,
                  AuthenticateService,
                  TrackByPipe,

      ]
    })
    .compileComponents();
    authenticateService = TestBed.inject(AuthenticateService);
    spyOnProperty(authenticateService, 'currentUserValue', 'get').and.returnValue(usuario);
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListarSolicitudComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
