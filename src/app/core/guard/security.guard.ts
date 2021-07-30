import { Injectable } from '@angular/core';
import { CanActivate, Router, UrlTree } from '@angular/router';
import { AuthenticateService } from '@shared/service/authenticate.service';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class SecurityGuard implements CanActivate {

  constructor(private router: Router,
              private authenticationService: AuthenticateService
              ) {
              }

  canActivate(): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    const currentUser = this.authenticationService.currentUserValue;
    if (currentUser){

      return true;

    } else {

      this.router.navigate(['/login']);
      return false;
    }
  }

}
