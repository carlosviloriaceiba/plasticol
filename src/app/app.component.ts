import { Component, OnInit } from '@angular/core';
import { MenuItem } from '@core/modelo/menu-item';




@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'app-base';

  public companies: MenuItem[] = [
    { url: '/home', nombre: 'Home' },
    { url: '/solicitud', nombre: 'Solicitudes' }
  ];
  constructor(){
  }

  ngOnInit(){

  }

}
