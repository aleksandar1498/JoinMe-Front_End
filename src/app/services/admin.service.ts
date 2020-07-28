import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { Event } from '../models/event';
import { Observable } from 'rxjs';
import { User } from '../models/user';
import { UserWithRoles } from '../models/user-roles';

@Injectable({
  providedIn: 'root'
})
export class AdminService {
  baseURL = environment.resturl + '/admin';
  constructor(private http: HttpClient) { }

  banEvent(event: Event): Observable<Event> {
    const url = this.baseURL + '/events/ban/' + event.id;
    return this.http.put<Event>(url, {});
  }

  banUser(user: UserWithRoles): Observable<User> {
    const url = this.baseURL + '/users/ban/' + user.username;
    return this.http.put<User>(url, {});
  }

  authorizeUser(user: UserWithRoles): Observable<User> {
    const url = this.baseURL + '/users/authorize/' + user.username;
    return this.http.put<User>(url, {});
  }
}
