import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SecurityGuard } from '@core/guard/security.guard';
import { CrearSolicitudComponent } from './components/crear-solicitud/crear-solicitud.component';
import { SolicitudComponent } from './components/solicitud/solicitud.component';




const routes: Routes = [
  {
    path: '',
    component: SolicitudComponent,
    canActivate: [SecurityGuard],
    children: [
      {
        path: 'crear',
        component: CrearSolicitudComponent
      },

    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SolicitudRoutingModule { }
