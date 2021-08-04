import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { MensajeErrorCamposDirective } from './directivas/error-campos/directiva/mensaje-error-campos.directive';
import { MensajeErrorCamposSubmitDirective } from './directivas/error-campos/directiva/mensaje-error-campos-submit.directive';
import { MensajeErrorCamposContenedorDirective } from './directivas/error-campos/directiva/mensaje-error-campos-contenedor.directive';
import { ErrorCamposPlantillaComponent } from './directivas/error-campos/componente/error-campos-plantilla.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { TrackByPipe } from './pipe/track-by.pipe';
import { TrmComponent } from './components/trm/trm.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { NgCircleProgressModule } from 'ng-circle-progress';
import { SummaryComponent } from './components/summary/summary.component';


@NgModule({
  declarations: [
    ErrorCamposPlantillaComponent,
    MensajeErrorCamposDirective,
    MensajeErrorCamposContenedorDirective,
    MensajeErrorCamposSubmitDirective,
    TrackByPipe,
    TrmComponent,
    SummaryComponent
  ],
  imports: [CommonModule,
            ReactiveFormsModule,
            FormsModule,
            FontAwesomeModule,
            NgCircleProgressModule.forRoot({
              // set defaults here
              radius: 100,
              outerStrokeWidth: 16,
              innerStrokeWidth: 8,
              outerStrokeColor: '#78C000',
              innerStrokeColor: '#C7E596',
              animationDuration: 300,
            })
  ],
  exports: [
    CommonModule,
    HttpClientModule,
    MensajeErrorCamposDirective,
    MensajeErrorCamposContenedorDirective,
    MensajeErrorCamposSubmitDirective,
    ReactiveFormsModule,
    FormsModule,
    TrackByPipe,
    TrmComponent,
    FontAwesomeModule,
    NgCircleProgressModule,
    SummaryComponent
  ]
})
export class SharedModule { }
