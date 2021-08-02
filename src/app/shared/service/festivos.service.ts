import { Injectable } from '@angular/core';
import colombianHolidays from 'colombian-holidays';

@Injectable({
  providedIn: 'root'
})
export class FestivosService {

  constructor() { }

  consultar(year){
    return colombianHolidays(year);
  }
}
