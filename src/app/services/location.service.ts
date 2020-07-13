import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Location } from 'src/app/models/location';

@Injectable({
  providedIn: 'root'
})
export class LocationService {
  baseURL = environment.resturl + '/locations';
  constructor(private http: HttpClient) { }

  findAllLocations(): Observable<Location[]> {
    return this.http.get<Location[]>(this.baseURL);
  }

  create(location: Location): Observable<Location> {
    return this.http.post<Location>(this.baseURL, location);
  }

}
