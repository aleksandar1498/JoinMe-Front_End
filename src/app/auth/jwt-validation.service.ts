import { Injectable } from '@angular/core';
import jwt_decode from 'jwt-decode';
@Injectable({
  providedIn: 'root'
})
export class JwtValidationService {


  constructor() { }

  isTokenExpired() {
    let decode = jwt_decode(this.getToken());
    if (decode) {
      let currentTime = Date.now() / 1000;
      return currentTime > decode['exp'];
    }
    return true;
  }

  getToken() {
    return this.extractToken();
  }
  hasToken(): boolean {
    return this.extractToken() !== '';
  }

  /*isAuthenticated() {
    const token = this.extractToken();
    if (token == null || token === '' || typeof token === 'undefined') {
      return false;
    }
    return !this.isTokenExpired();
  }*/
  getRoles(): string[] {
    const decode = jwt_decode(this.getToken());
    if (decode) {
      return Array.from(decode['roles']);
    }
    return [];
  }

  hasNeededRole(expectedRoles: any[]): boolean {
    const decode = jwt_decode(this.getToken());
    if (decode) {
      const roles = Array.from(decode['roles']);
      for (const role of expectedRoles) {
        if (roles.includes(role)) {
          return true;
        }
      }
    }
    return false;
  }

  private extractToken(): string {
    const authenticated = JSON.parse(localStorage.getItem("auth"));
    if (authenticated) {
      return authenticated['token'].replace("Bearer ", "").trim();
    }
    return '';
  }

}
