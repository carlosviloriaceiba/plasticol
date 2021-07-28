import { Injectable } from '@angular/core';
import { CanActivate, Router, UrlTree } from '@angular/router';
import { StorageService } from '@shared/service/storage.service';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class SecurityGuard implements CanActivate {

  constructor(private router: Router, private storageService: StorageService) { }

  canActivate(): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {

    if (this.storageService.estaAutenticado()){

      return true;

    } else {

      this.router.navigate(['/login']);
      return false;
    }
  }

}
