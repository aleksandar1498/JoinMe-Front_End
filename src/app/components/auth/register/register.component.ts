import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators, FormBuilder } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';
import { UserRegister } from 'src/app/models/user-register';
import { PasswordMatch } from 'src/app/common/validators/passwordMatcher';
import { HttpErrorResponse } from '@angular/common/http';
import { ErrorService } from 'src/app/services/error.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  registerForm: FormGroup;
  submitted = false;
  constructor(
    private authService: AuthService,
    private errorService: ErrorService,
    private router: Router,
    private formBuilder: FormBuilder) {

  }

  ngOnInit() {
    this.registerForm = this.formBuilder.group({
      username: new FormControl(''),
      name: new FormControl(''),
      surname: new FormControl(''),
      password: new FormControl(''),
      confirmPassword: new FormControl(''),
      email: new FormControl(''),
      organizer: new FormControl(false)
    });
  }
  get f() { return this.registerForm.controls; }

  register() {
    const user: UserRegister = Object.setPrototypeOf(this.registerForm.value, UserRegister.prototype);
    this.authService.register(user).subscribe(
      res => {
        this.router.navigateByUrl('/login');
      },
      (err: HttpErrorResponse) => {
        this.errorService.renderServerErrors(this.registerForm, err);
      });
  }

}
