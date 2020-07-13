import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { UserAuth } from 'src/app/models/user-auth';
import { UserService } from 'src/app/services/user.service';
import { User } from 'src/app/models/user';
import { BehaviorSubject } from 'rxjs';
import { JwtValidationService } from 'src/app/auth/jwt-validation.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  userBehaviour: BehaviorSubject<User>;
  roles: string[];
  constructor(private authService: AuthService, private userService: UserService, private jwtService: JwtValidationService) {
    this.userBehaviour = new BehaviorSubject<User>(new User());
  }
  get user() {
    return this.userBehaviour.value;
  }
  ngOnInit(): void {
    this.userService.findByUsername(this.authService.currentUserValue.username).subscribe(res => {
      this.userBehaviour.next(Object.setPrototypeOf(res, User.prototype));
    });
    this.roles = this.jwtService.getRoles();
  }

}
