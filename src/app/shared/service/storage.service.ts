import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Session } from '@shared/model/session';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class StorageService {
  private sessionStorageService;
  private actualSession: Session = null;

  constructor(private router: Router) {
    this.sessionStorageService = sessionStorage;
    this.actualSession = this.cargarSession();
  }

  setsessionActual(session: Session): void {
    this.actualSession = session;
    this.sessionStorageService.setItem(environment.session_key, JSON.stringify(session));
  }

  cargarSession(): Session{
    const userSession = this.sessionStorageService.getItem(environment.session_key);
    return (userSession) ? JSON.parse(userSession) as Session : null;
  }

  getSessionActual(): Session {
    return this.actualSession;
  }

  borrarActualSession(): void {
    this.sessionStorageService.removeItem(environment.session_key);
    this.actualSession = null;
  }

  estaAutenticado(): boolean {
    return (this.getToken() != null) ? true : false;
  }

  getToken(): string {
    const session = this.sessionStorageService.getItem(environment.session_key);
    return (session && JSON.parse(session)[`sessionToken`]) ? JSON.parse(session)[`sessionToken`] : null;
  }

  logout(): void{
    this.borrarActualSession();
    this.router.navigate(['/login']);
  }

}
