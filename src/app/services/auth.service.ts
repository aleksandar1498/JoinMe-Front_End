import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError, BehaviorSubject } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { UserLogin } from '../models/user';
import { environment } from 'src/environments/environment';
import { Router } from '@angular/router';
import { UserAuth } from '../models/user-auth';
import { UserRegister } from '../models/user-register';
import { JwtValidationService } from '../auth/jwt-validation.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ErrorNotifierComponent } from '../components/common/notification/error/error-notifier/error-notifier.component';



@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private currentUserSubject: BehaviorSubject<UserAuth>;
  public currentUser: Observable<UserAuth>;

  constructor(private http: HttpClient, private router: Router, private jwt: JwtValidationService, private _snackBar: MatSnackBar) {
    console.log(localStorage.getItem('auth'));
    this.currentUserSubject = new BehaviorSubject<UserAuth>(JSON.parse(localStorage.getItem('auth')));
    this.currentUser = this.currentUserSubject.asObservable();
  }

  public get currentUserValue(): UserAuth {
    return this.currentUserSubject.value;
  }

  login(user: UserLogin) {
    const url = environment.resturl + '/user/login';

    this.http.post<any>(url, user)
      .subscribe(
        res => {
          console.log(res);
          if (res.responseMessage === 'OK') {
            // TODO can retrieve user role
            const jwtToken = res.responseObject.KEY;
            const userAuth: UserAuth = Object.setPrototypeOf(res.responseObject, UserAuth.prototype);
            localStorage.setItem('auth', JSON.stringify(userAuth));
            this.currentUserSubject.next(userAuth);
            if (this.jwt.getRoles().includes('ADMIN')) {
              this.router.navigate(['/admin']);
            } else if(this.jwt.getRoles().includes('USER')){
              this.router.navigate(['/home']);
            }else{
              this.router.navigate(['/profile']);
            }
          } else {
            this._snackBar.openFromComponent(ErrorNotifierComponent, {
              data: { error: res.responseMessage }
            });
            this.router.navigateByUrl('/login');
          }
        });
  }

  register(user: UserRegister) {
    const url = environment.resturl + '/user/register';
    this.http.post<any>(url, user)
      .subscribe(
        res => {
          console.log(res);
          if (res.responseMessage === 'OK') {
            this.router.navigateByUrl('/login');
          } else {
            this.router.navigateByUrl('/register');
          }
        });
  }

  logout() {
    localStorage.removeItem('auth');
    this.currentUserSubject.next(null);
    this.router.navigateByUrl('/login');
  }

}
