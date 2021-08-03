import { LOCALE_ID, NgModule } from '@angular/core';


import { SharedModule } from '@shared/shared.module';

import { SolicitudComponent } from './components/solicitud/solicitud.component';
import { SolicitudService } from './shared/service/solicitud.service';
import { SolicitudRoutingModule } from './solicitud-routing.module';
import { CrearSolicitudComponent } from './components/crear-solicitud/crear-solicitud.component';
import { ListarSolicitudComponent } from './components/listar-solicitud/listar-solicitud.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import localeEsCo from '@angular/common/locales/es-CO';
import { registerLocaleData } from '@angular/common';

registerLocaleData(localeEsCo, 'es-CO');

@NgModule({
  declarations: [
    SolicitudComponent,
    CrearSolicitudComponent,
    ListarSolicitudComponent
  ],
  imports: [
    SolicitudRoutingModule,
    SharedModule,
    NgbModule
  ],
  providers: [SolicitudService,
    { provide: LOCALE_ID, useValue: 'es-CO' }
  ]
})
export class SolicitudModule { }
