import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { Observable, BehaviorSubject } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Event } from '../models/event';
import { eventMapper } from '../common/mappers/object-mapper';

@Injectable({
  providedIn: 'root'
})
export class EventsService {

  events: BehaviorSubject<Event[]>;
  currentEvents: Observable<Event[]>;
  constructor(private http: HttpClient) {
    this.events = new BehaviorSubject<Event[]>([]);
  }
  getAllEvents(): Observable<Event[]> {
    return this.events.asObservable();
  }
  reloadEvents() {
    const url = environment.resturl + '/events';
    return this.http.get<Event[]>(url).subscribe(res => {
      res = eventMapper(res);
      this.events.next(res);
    });
  }

  getEventsForUser(): Observable<Event[]> {
    const url = environment.resturl + '/events/user';
    return this.http.get<Event[]>(url);
  }

  create(event: Event): Observable<any> {
    const url = environment.resturl + '/events';
    return this.http.post<any>(url, event);
  }
  edit(event: Event) {
    console.log(event.id);
    const url = environment.resturl + '/events/' + event.id;
    return this.http.put<any>(url, event);
  }
  cancel(event: Event): Observable<any> {
    const url = environment.resturl + '/events/' + event.id;
    return this.http.delete<any>(url, {});
  }

  getEventById(eventId: string): Observable<Event> {
    const url = environment.resturl + '/events/' + eventId;
    return this.http.get<Event>(url);
  }
}
