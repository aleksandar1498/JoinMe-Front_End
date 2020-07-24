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

  create(location: any): Observable<Location> {
    return this.http.post<Location>(this.baseURL, location);
  }
  remove(locationId: string) {
    const url = this.baseURL.concat('/' + locationId);
    return this.http.delete<Location>(url);
  }

  update(updatedLocation: any): Observable<Location> {
    const url = this.baseURL.concat('/' + updatedLocation.id);
    return this.http.put<Location>(url, updatedLocation);
  }
  findById(id: string): Observable<Location> {
    const url = this.baseURL.concat('/' + id);
    return this.http.get<Location>(url);
  }

}
