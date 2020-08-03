import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { JwtValidationService } from '../auth/jwt-validation.service';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class FeedsService {


  constructor(private http: HttpClient, private auth: AuthService) { }

  getAllFeeds(): Observable<any[]> {
    return this.http.get<any[]>(environment.resturl + '/notifications/user/' + this.auth.currentUserValue.username);
  }

  view(feedId: string): Observable<any> {
    return this.http.put<any>(environment.resturl + '/notifications/view/' + feedId, {});
  }
}
