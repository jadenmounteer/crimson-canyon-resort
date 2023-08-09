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
    const url = `${environment.instagramFeed.url}${environment.instagramFeed.authorizationKey}`;
    console.log(url);
    return this.http.get(url);
  }
}
