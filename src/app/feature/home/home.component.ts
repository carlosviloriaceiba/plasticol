import { Component, OnInit } from '@angular/core';
import { Session } from '@shared/model/session';
import { AuthenticateService } from '@shared/service/authenticate.service';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  public session: Session;
  constructor(private authenticate: AuthenticateService) { }

  ngOnInit() {
    this.session = this.authenticate.currentUserValue;
  }

}
