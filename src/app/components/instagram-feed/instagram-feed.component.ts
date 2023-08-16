import { Component, OnDestroy, OnInit } from '@angular/core';
import { InstagramFeedService } from './instagram-feed.service';
import { Subscription } from 'rxjs';
import { IconService } from 'src/app/services/icon.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-instagram-feed',
  templateUrl: './instagram-feed.component.html',
  styleUrls: ['./instagram-feed.component.scss'],
})
export class InstagramFeedComponent implements OnInit, OnDestroy {
  private instaSubscription!: Subscription;
  protected instaData: Array<any> | undefined;
  protected loading: boolean = true;
  constructor(
    private instagramFeedService: InstagramFeedService,
    public icon: IconService,
    protected router: Router
  ) {}

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
