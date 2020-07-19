import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Event } from 'src/app/models/event';
import { urlBuilder } from '../common/urlBuilder';
import { Observable, BehaviorSubject } from 'rxjs';
import { environment } from 'src/environments/environment';
import { eventMapper } from '../common/mappers/object-mapper';
import { UserWithRoles } from '../models/user-roles';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  joinedEvents: BehaviorSubject<Event[]>;
  currentJoinedEvents: Observable<Event[]>;
  interestedEvents: BehaviorSubject<Event[]>;
  currentInterestedEvents: Observable<Event[]>;
  constructor(private http: HttpClient) {
    this.joinedEvents = new BehaviorSubject<Event[]>([]);
    this.interestedEvents = new BehaviorSubject<Event[]>([]);
  }

  findByUsername(username: string) {
    return this.http.get<any>(urlBuilder('/users/' + username));
  }
  joinEvent(event: Event): Observable<any> {
    return this.http.post<any>(urlBuilder('/users/join/' + event.id), {});
  }
  disjoinEvent(event: Event): Observable<any> {
    return this.http.delete<any>(urlBuilder('/users/disjoin/' + event.id), {});
  }

  interestEvent(event: Event): Observable<any> {
    return this.http.post<any>(urlBuilder('/users/interest/' + event.id), {});
  }
  removeInterest(event: Event) {
    return this.http.delete<any>(urlBuilder('/users/disinterest/' + event.id), {});
  }
  getJoinedEvents(): Observable<Event[]> {
    return this.joinedEvents.asObservable();
  }
  getInterestedEvents(): Observable<Event[]> {
    return this.interestedEvents.asObservable();
  }

  reloadEvents() {
    this.reloadJoined();
    this.reloadInterested();
  }
  reloadInterested() {
    const url = environment.resturl + '/users/events/interested';
    this.http.get<Event[]>(url).subscribe(res => {
      res = eventMapper(res);
      this.interestedEvents.next(res);
    });
  }
  reloadJoined() {
    const url = environment.resturl + '/users/events/joined';
    this.http.get<Event[]>(url).subscribe(res => {
      res = eventMapper(res);
      this.joinedEvents.next(res);
    });
  }

  loadUsersWithRoles() {
    const url = environment.resturl + '/users';
    return this.http.get<UserWithRoles[]>(url);
  }

  editRoles(user: UserWithRoles): Observable<UserWithRoles> {
    console.log(user);
    const url = environment.resturl + '/users/roles';
    return this.http.put<UserWithRoles>(url, user);
  }


}
