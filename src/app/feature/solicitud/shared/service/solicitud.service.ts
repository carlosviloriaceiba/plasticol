import { Injectable } from '@angular/core';
import { Solicitud } from 'src/app/feature/solicitud/shared/model/solicitud';
import { environment } from 'src/environments/environment';
import { HttpService, Options } from '@core/services/http.service';
import { AuthenticateService } from '@shared/service/authenticate.service';
import { HttpParams } from '@angular/common/http';
import { Session } from '@shared/model/session';
import * as moment from 'moment';

@Injectable()
export class SolicitudService {
  solicitudes: Solicitud [];
  private currentUser: Session;
  constructor(private httpService: HttpService,
              private authenticateService: AuthenticateService,
    ) {
    this.currentUser = this.authenticateService.currentUserValue;
   }

  public consultar() {
    const opts: Options = {
      params: new HttpParams()
      .set('userId', this.currentUser.user.id.toString())
      .set('_sort', 'day_to_dispatch')
      .set('_order', 'desc')
    };
    return this.httpService.doGet<Solicitud[]>(`${environment.endpoint}/requests`, opts);
  }

  public guardar(solicitud: Solicitud) {
    solicitud.day_to_dispatch =  moment(solicitud.day_to_dispatch).format('YYYY-MM-DD HH:mm:ss');
    return this.httpService.doPost<Solicitud, boolean>(`${environment.endpoint}/requests`, solicitud,
                                                this.httpService.optsName('crear/actualizar solicitudes'));
  }

  public actualizar(solicitud: Solicitud) {
    return this.httpService.doPut<Solicitud, boolean>(`${environment.endpoint}/requests/${solicitud.id}`, solicitud,
                                                this.httpService.optsName('crear/actualizar solicitudes'));
  }

  public eliminar(solicitud: Solicitud) {
    return this.httpService.doDelete<boolean>(`${environment.endpoint}/requests/${solicitud.id}`,
                                                 this.httpService.optsName('eliminar solicitudes'));
  }
}
