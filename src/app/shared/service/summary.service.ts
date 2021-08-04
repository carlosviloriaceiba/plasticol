import { Injectable } from '@angular/core';
import { Summary } from '@shared/model/summary';
import { environment } from 'src/environments/environment';
import { HttpService } from '../../core/services/http.service';

@Injectable()
export class SummaryService {

  constructor(private httpService: HttpService) { }

  public consultarSummary() {
    return this.httpService.doGet<Summary[]>(`${environment.endpoint}/summary`, this.httpService.optsName('consultar sumario'));
  }
}
