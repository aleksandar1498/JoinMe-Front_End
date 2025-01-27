import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';
import { UserLogin } from '../models/user';
import { environment } from 'src/environments/environment';
import { Router } from '@angular/router';
import { UserAuth } from '../models/user-auth';
import { UserRegister } from '../models/user-register';
import { NotificationService } from './notification.service';



@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private currentUserSubject: BehaviorSubject<UserAuth>;
  public currentUser: Observable<UserAuth>;

  constructor(
    private http: HttpClient,
    private router: Router,
    private notificationService: NotificationService,
  ) {
    this.currentUserSubject = new BehaviorSubject<UserAuth>(JSON.parse(localStorage.getItem('auth')));
    this.currentUser = this.currentUserSubject.asObservable();
  }

  public get currentUserValue(): UserAuth {
    return this.currentUserSubject.value;
  }

  setCurrentUserSubject(user: UserAuth) {
    this.currentUserSubject.next(user);
  }

  login(user: UserLogin) {
    const url = environment.resturl + '/user/login';
    return this.http.post<any>(url, user);
  }

  register(user: UserRegister) {
    const url = environment.resturl + '/user/register';
    return this.http.post<any>(url, user);
  }

  logout() {
    localStorage.removeItem('auth');
    this.notificationService.showSuccess('Logged out');
    this.currentUserSubject.next(null);
    this.router.navigateByUrl('/login');
  }

}
