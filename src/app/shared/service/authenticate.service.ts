import { Injectable } from '@angular/core';
import { HttpService } from '@core/services/http.service';
import { Session } from '@shared/model/session';
import { User } from '@shared/model/user';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthenticateService {
  private currentUserSubject: BehaviorSubject<Session>;
  public currentUser: Observable<Session>;

  constructor(private http: HttpService) {
                this.currentUserSubject = new BehaviorSubject<Session>(JSON.parse(sessionStorage.getItem(environment.session_key)));
                this.currentUser = this.currentUserSubject.asObservable();
              }
  public get currentUserValue(): Session {
      return this.currentUserSubject.value;
  }
  public login(dataUser: User) {
    return this.http.doPost<User, Session>(`${environment.endpoint}/login`, dataUser, this.http.optsName('autenticar usuario'))
    .pipe(map((user: Session) => {
      sessionStorage.setItem(environment.session_key, JSON.stringify(user));
      this.currentUserSubject.next(user);
      return user;
    }));
  }

  public logout() {
    sessionStorage.removeItem(environment.session_key);
    this.currentUserSubject.next(null);
  }
}
