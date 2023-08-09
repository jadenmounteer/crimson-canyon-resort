import { Component, OnDestroy, OnInit } from '@angular/core';
import { InstagramFeedService } from './instagram-feed.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-instagram-feed',
  templateUrl: './instagram-feed.component.html',
  styleUrls: ['./instagram-feed.component.scss'],
})
export class InstagramFeedComponent implements OnInit, OnDestroy {
  private instaSubscription!: Subscription;
  protected instaData: Array<any> | undefined;
  protected loading: boolean = true;
  constructor(private instagramFeedService: InstagramFeedService) {}

  ngOnInit(): void {
    // TODO destroy this
    this.instaSubscription = this.instagramFeedService
      .getInstaData()
      .subscribe((data) => {
        this.instaData = data.data;
        console.log(this.instaData);
        this.loading = false;
      });
  }

  ngOnDestroy(): void {
    this.instaSubscription.unsubscribe();
  }
}
