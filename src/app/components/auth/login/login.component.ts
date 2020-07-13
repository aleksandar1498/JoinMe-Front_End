import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../../services/auth.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { User, UserLogin } from '../../../models/user';
import { Router } from '@angular/router';
import { JwtValidationService } from 'src/app/auth/jwt-validation.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  submitted = false;
  loginForm = new FormGroup({
    username: new FormControl('', Validators.required),
    password: new FormControl('', Validators.required),
  });
  constructor(private authService: AuthService, private router: Router) {

  }

  ngOnInit() {
  }

  login() {
    if (this.loginForm.invalid) {
      this.submitted = true;
      return;
    }
    const user: UserLogin = Object.setPrototypeOf(this.loginForm.value, UserLogin.prototype);
    this.authService.login(user);
  }

  get f() { return this.loginForm.controls; }


}
