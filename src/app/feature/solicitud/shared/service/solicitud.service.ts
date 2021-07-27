import { Injectable } from '@angular/core';
import { Solicitud } from 'src/app/feature/solicitud/shared/model/solicitud';
import { environment } from 'src/environments/environment';
import { HttpService } from '@core/services/http.service';

@Injectable()
export class SolicitudService {
  solicitudes: Solicitud [];
  constructor(private httpService: HttpService) { }

  public consultar() {
    return this.httpService.doGet<Solicitud[]>(`${environment.endpoint}/requests`, this.httpService.optsName('consultar solicitudes'));
  }

  public guardar(producto: Solicitud) {
    return this.httpService.doPost<Solicitud, boolean>(`${environment.endpoint}/requests`, producto,
                                                this.httpService.optsName('crear/actualizar solicitudes'));
  }

  public eliminar(producto: Solicitud) {
    return this.httpService.doDelete<boolean>(`${environment.endpoint}/requests/${producto.id}`,
                                                 this.httpService.optsName('eliminar solicitudes'));
  }
}
