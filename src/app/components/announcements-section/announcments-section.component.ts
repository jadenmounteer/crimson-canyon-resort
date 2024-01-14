import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, Subscription } from 'rxjs';
import { Post } from 'src/app/announcements/post';
import { AnnouncementsService } from 'src/app/announcements/announcements.service';

@Component({
  selector: 'app-announcements-section',
  templateUrl: './announcements-section.component.html',
  styleUrls: ['./announcements-section.component.scss'],
})
export class AnnouncementsSectionComponent implements OnInit, OnDestroy {
  protected contentLoaded: boolean = false;
  protected posts$!: Observable<Post[]>;
  protected announcementsChanged$!: Subscription;
  @Input() userDisplayName: string | undefined | null;

  constructor(
    protected announcementsService: AnnouncementsService,
    protected router: Router
  ) {
    this.loadPosts();
  }
  ngOnDestroy(): void {
    this.announcementsChanged$.unsubscribe();
  }

  ngOnInit(): void {
    this.announcementsChanged$ =
      this.announcementsService.newAnnouncementAddedToHomePage.subscribe(() => {
        this.loadPosts();
      });
  }

  protected loadPosts(): void {
    this.posts$ = this.announcementsService.fetchRecentPosts();
    this.contentLoaded = true;
  }
}
