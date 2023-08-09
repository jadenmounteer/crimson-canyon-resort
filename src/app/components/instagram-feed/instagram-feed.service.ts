import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';

const testUrl =
  'https://graph.instagram.com/me/media?fields=caption,media_url,media_type,permalink,timestamp,username&access_token=IGQVJWd1JQbERBVHRFaXV6eGFXMUJ6ZAnhHalJfZAXFqdTJBdGhRMk8tQnBrNFM1MWIxSGdIVXVkakJ5SGlfZA0ZAOYURpN1E2cmdYeG5CSVprVklYTUhlRXBvbkRGOVEydDh3TzFGOHNOdjRtMU5BZAjhMUgZDZD';
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
