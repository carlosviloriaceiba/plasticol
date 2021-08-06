import { HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { HttpService, Options } from '@core/services/http.service';
import { Trm } from '@shared/model/trm';
import { BehaviorSubject, Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import * as moment from 'moment';


@Injectable({
  providedIn: 'root'
})
export class TrmService {

  public url = 'https://www.datos.gov.co/resource/32sa-8pi3.json';
  private currentTrmSubject: BehaviorSubject<Trm[]>;
  public currentTrm: Observable<Trm[]>;

  constructor(private http: HttpService) {
    this.currentTrmSubject = new BehaviorSubject<Trm[]>(JSON.parse(sessionStorage.getItem(`${environment.session_key}_trm`)));
    this.currentTrm = this.currentTrmSubject.asObservable();

   }

  public get currenTrmValue(): Trm[] {
    return this.currentTrmSubject.value;
  }
  mostrarTrm(){
    const opts: Options = {
      params: new HttpParams()
      .set('$$app_token', environment.token_trm)
      .set('$select', 'valor,unidad,vigenciadesde')
      .set('vigenciadesde', moment().format('YYYY-MM-DDT00:00:00.000'))
    };
    return this.http.doGet<Trm[]>(this.url, opts);
  }

  setTrm(trm: Trm[]) {
    sessionStorage.setItem(`${environment.session_key}_trm`, JSON.stringify(trm));
    this.currentTrmSubject.next(trm);
  }
}
