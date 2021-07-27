import { NgModule } from '@angular/core';


import { SharedModule } from '@shared/shared.module';

import { SolicitudComponent } from './components/solicitud/solicitud.component';
import { SolicitudService } from './shared/service/solicitud.service';
import { SolicitudRoutingModule } from './solictud-routing.module';


@NgModule({
  declarations: [
    SolicitudComponent
  ],
  imports: [
    SolicitudRoutingModule,
    SharedModule
  ],
  providers: [SolicitudService]
})
export class SolcitudModule { }
