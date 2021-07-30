import { Component, OnInit } from '@angular/core';
import { MenuItem } from '@core/modelo/menu-item';
import { TrmService } from '@shared/service/trm.service';



@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'app-base';
  estaAutenticado = false;
  public companies: MenuItem[] = [
    { url: '/home', nombre: 'Home' },
    { url: '/solicitud', nombre: 'Solicitudes' }
  ];
  constructor(private trmService: TrmService){
    const currentTrm = this.trmService.currenTrmValue;
    if (!currentTrm){
      this.trmService.mostrarTrm().subscribe((trm) => {
         console.log(trm);
      });
    }
  }

  ngOnInit(){

  }

}
