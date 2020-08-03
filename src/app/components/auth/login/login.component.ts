import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../../services/auth.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { User, UserLogin } from '../../../models/user';
import { Router } from '@angular/router';
import { JwtValidationService } from 'src/app/auth/jwt-validation.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { UserAuth } from 'src/app/models/user-auth';
import { HttpErrorResponse } from '@angular/common/http';
import { ErrorService } from 'src/app/services/error.service';
import { NotificationService } from 'src/app/services/notification.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  submitted = false;
  loginForm = new FormGroup({
    username: new FormControl(''),
    password: new FormControl(''),
  });
  constructor(private authService: AuthService, private router: Router, private jwt: JwtValidationService, private errorService: ErrorService, private notificationService: NotificationService) {

  }

  ngOnInit() {
  }

  login() {
    const user: UserLogin = Object.setPrototypeOf(this.loginForm.value, UserLogin.prototype);
    this.authService.login(user).subscribe(
      res => {
        const userAuth: UserAuth = Object.setPrototypeOf(res, UserAuth.prototype);
        localStorage.setItem('auth', JSON.stringify(userAuth));
        this.notificationService.showSuccess("Logged in successfully");
        this.authService.setCurrentUserSubject(userAuth);
        if (this.jwt.getRoles().includes('ADMIN')) {
          this.router.navigate(['/admin']);
        } else if (this.jwt.getRoles().includes('ORGANIZER')) {
          this.router.navigate(['/profile']);
        } else {
          this.router.navigate(['/home']);
        }
      },
      (err: HttpErrorResponse) => {
        this.errorService.renderServerErrors(this.loginForm, err);
      });
  }



}
