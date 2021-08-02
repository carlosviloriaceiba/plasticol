import { NgModule } from '@angular/core';


import { SharedModule } from '@shared/shared.module';

import { SolicitudComponent } from './components/solicitud/solicitud.component';
import { SolicitudService } from './shared/service/solicitud.service';
import { SolicitudRoutingModule } from './solicitud-routing.module';
import { CrearSolicitudComponent } from './components/crear-solicitud/crear-solicitud.component';
import { ListarSolicitudComponent } from './components/listar-solicitud/listar-solicitud.component';


@NgModule({
  declarations: [
    SolicitudComponent,
    CrearSolicitudComponent,
    ListarSolicitudComponent
  ],
  imports: [
    SolicitudRoutingModule,
    SharedModule
  ],
  providers: [SolicitudService]
})
export class SolicitudModule { }
