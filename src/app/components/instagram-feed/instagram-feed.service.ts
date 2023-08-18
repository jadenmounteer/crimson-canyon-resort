import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class InstagramFeedService {
  constructor(private http: HttpClient) {}

  public getHomePageInstaData(): Observable<any> {
    const url = `${environment.instagramFeed.homePageUrl}${environment.instagramFeed.authorizationKey}`;
    return this.http.get(url);
  }

  public getAllInstaData(): Observable<any> {
    const url = `${environment.instagramFeed.url}${environment.instagramFeed.authorizationKey}`;
    return this.http.get(url);
  }

  // Copilot made this. Can I use this?
  // public formatInstaData(data: any): any {
  //   const formattedData = data.data.map((item: any) => {
  //     return {
  //       id: item.id,
  //       media_type: item.media_type,
  //       media_url: item.media_url,
  //       username: item.username,
  //       timestamp: item.timestamp,
  //       permalink: item.permalink,
  //       caption: item.caption,
  //     };
  //   });
  //   return formattedData;
  // }
}
