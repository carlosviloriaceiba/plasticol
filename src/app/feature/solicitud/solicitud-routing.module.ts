import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SecurityGuard } from '@core/guard/security.guard';
import { CrearSolicitudComponent } from './components/crear-solicitud/crear-solicitud.component';
import { ListarSolicitudComponent } from './components/listar-solicitud/listar-solicitud.component';
import { SolicitudComponent } from './components/solicitud/solicitud.component';




const routes: Routes = [
  {
    path: '',
    component: SolicitudComponent,
    canActivate: [SecurityGuard],
    children: [
      {
        path: '',
        redirectTo: 'listar',
        pathMatch: 'full'
      },
      {
        path: 'crear',
        component: CrearSolicitudComponent
      },
      {
        path: 'listar',
        component: ListarSolicitudComponent
      },

    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SolicitudRoutingModule { }
