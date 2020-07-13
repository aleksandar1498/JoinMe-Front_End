import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators, FormBuilder } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';
import { UserRegister } from 'src/app/models/user-register';
import { PasswordMatch } from 'src/app/common/validators/passwordMatcher';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  registerForm: FormGroup;
  submitted = false;
  constructor(private authService: AuthService, private router: Router, private formBuilder: FormBuilder) {

  }

  ngOnInit() {
    this.registerForm = this.formBuilder.group({
      username: new FormControl('', [Validators.required, Validators.minLength(6)]),
      name: new FormControl('', [Validators.required]),
      surname: new FormControl('', [Validators.required]),
      password: new FormControl('', Validators.required),
      confirmPassword: new FormControl('', Validators.required),
      email: new FormControl('', [Validators.required, Validators.email]),
      organizer: new FormControl(false)
    }, {
      validator: PasswordMatch('password', 'confirmPassword')
    }
    );
  }
  get f() { return this.registerForm.controls; }

  register() {

    this.submitted = true;
    if (this.registerForm.invalid) {
      return;
    }
    const user: UserRegister = Object.setPrototypeOf(this.registerForm.value, UserRegister.prototype);
    this.authService.register(user);
  }

}
