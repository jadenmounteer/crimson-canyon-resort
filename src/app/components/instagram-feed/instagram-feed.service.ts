import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class InstagramFeedService {
  constructor(private http: HttpClient) {}

  public getInstaData(): Observable<any> {
    return this.http.get(
      `${environment.instagramFeed.url}${environment.instagramFeed.authorizationKey}`
    );
  }
}
