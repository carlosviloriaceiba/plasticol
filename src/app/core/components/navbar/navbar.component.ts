import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { MenuItem } from '@core/modelo/menu-item';
import { Session } from '@shared/model/session';
import { AuthenticateService } from '@shared/service/authenticate.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-navbar',
  templateUrl: 'navbar.component.html',
  styles: [`
  .dropdown , .dropdown > .nav-link {
      cursor:pointer;
    }
  `],
})
export class NavbarComponent implements OnInit, OnDestroy {

  @Input()
  items: MenuItem[];
  user: string;
  public isMenuCollapsed = true;
  currentUser: Session;
  currentUserSubscription: Subscription;

  constructor(private router: Router,
              private authenticationService: AuthenticateService
              ){
    this.currentUserSubscription = this.authenticationService.currentUser.subscribe(user => {
      this.currentUser = user;
    });
  }


  ngOnInit() {
  }


  logout(){
    this.authenticationService.logout();
    this.router.navigate(['/login']);
  }

  ngOnDestroy() {
    this.currentUserSubscription.unsubscribe();
  }
}
