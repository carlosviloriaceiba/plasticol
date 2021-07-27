import { Injectable } from '@angular/core';
import { Summary } from '@core/modelo/summary';
import { environment } from 'src/environments/environment';
import { HttpService } from './http.service';

@Injectable()
export class SummaryService {

  constructor(private httpService: HttpService) { }

  public consultarSummary() {
    return this.httpService.doGet<Summary>(`${environment.endpoint}/summary`, this.httpService.optsName('consultar sumario'));
  }
}
