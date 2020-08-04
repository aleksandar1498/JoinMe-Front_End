import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { BehaviorSubject } from 'rxjs';
import { UserAuth } from 'src/app/models/user-auth';
import { JwtValidationService } from 'src/app/auth/jwt-validation.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  authenticated: UserAuth;
  redirectHome: string;
  roles: string[];
  constructor(private authService: AuthService, private jwt: JwtValidationService) { }

  ngOnInit() {
    this.authService.currentUser.subscribe(next => {
      this.configureEnviorment(next);
      this.authenticated = next;
    });

  }

  logout() {
    this.authService.logout();
  }
  configureEnviorment(user: UserAuth) {
    if (user != null) {
      this.roles = this.jwt.getRoles();
      if (this.roles.findIndex(x => x === 'ADMIN') >= 0) {
        this.redirectHome = 'admin';
      } else if(this.roles.findIndex(x => x === 'ORGANIZER') >= 0){
        this.redirectHome = 'organizer';
      }else{
        this.redirectHome = 'home';
      }
    } else {
      this.redirectHome = '';
    }
  }
}
