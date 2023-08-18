import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { InstagramFeedService } from '../instagram-feed/instagram-feed.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-whats-happening-home-page-section',
  templateUrl: './whats-happening-home-page-section.component.html',
  styleUrls: ['./whats-happening-home-page-section.component.scss'],
})
export class WhatsHappeningHomePageSectionComponent
  implements OnInit, OnDestroy
{
  protected loading: boolean = true;
  private instaSubscription!: Subscription;
  protected instaData: Array<any> | undefined;

  constructor(
    protected router: Router,
    private instagramFeedService: InstagramFeedService
  ) {}

  ngOnInit(): void {
    this.instaSubscription = this.instagramFeedService
      .getHomePageInstaData()
      .subscribe((data) => {
        this.instaData = data.data;
        this.loading = false;
      });
  }

  ngOnDestroy(): void {
    this.instaSubscription.unsubscribe();
  }
}
