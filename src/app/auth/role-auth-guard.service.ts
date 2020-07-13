import { Injectable } from '@angular/core';
import { CanActivate, Router, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { JwtValidationService } from './jwt-validation.service';
import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class RoleAuthGuardService implements CanActivate {

  constructor(private jwtValidation: JwtValidationService, private router: Router, private authService: AuthService) {
  }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    if (this.jwtValidation.hasToken()) {
      if (this.jwtValidation.hasNeededRole(route.data.expectedRoles)) {
        if (this.jwtValidation.isTokenExpired()) {
          this.authService.logout();
          this.router.navigate(['/login'], { queryParams: { returnUrl: state.url } });
          return false;
        } else {
          return true;
        }
      } else {
        this.router.navigate(['unauthorized']);
        return false;
      }
    } else {
      this.authService.logout();
      return false;
    }
  }
}
