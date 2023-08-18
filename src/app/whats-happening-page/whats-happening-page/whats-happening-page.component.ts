import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { InstagramFeedService } from 'src/app/components/instagram-feed/instagram-feed.service';

@Component({
  selector: 'app-whats-happening-page',
  templateUrl: './whats-happening-page.component.html',
  styleUrls: ['./whats-happening-page.component.scss'],
})
export class WhatsHappeningPageComponent implements OnInit, OnDestroy {
  protected loading: boolean = true;
  private instaSubscription!: Subscription;
  protected instaData: Array<any> | undefined;

  constructor(private instagramFeedService: InstagramFeedService) {}

  ngOnInit(): void {
    this.instaSubscription = this.instagramFeedService
      .getHomePageInstaData()
      .subscribe((data) => {
        console.log(data);
        this.instaData = data.data;
        console.log(this.instaData);
        this.loading = false;
      });
  }

  ngOnDestroy(): void {
    this.instaSubscription.unsubscribe();
  }
}
