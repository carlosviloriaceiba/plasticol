import { Injectable } from '@angular/core';
import { NgbDate } from '@ng-bootstrap/ng-bootstrap';
import colombianHolidays from 'colombian-holidays';
import * as moment from 'moment';
@Injectable({
  providedIn: 'root'
})
export class FestivosService {

  constructor() { }

  consultar(date: NgbDate){
    let encontrado;

    if (date) {

      const festivos = colombianHolidays(date.year);
      const dateTemporal = Object.assign({}, date);
      dateTemporal.month = dateTemporal.month - 1;
      const dateSeleccionado =  moment(dateTemporal).format('YYYY-MM-DD');

      encontrado = festivos.find((dia) => dia.celebrationDate === dateSeleccionado );

    }

    return encontrado !== undefined ? true : false;
  }
}
