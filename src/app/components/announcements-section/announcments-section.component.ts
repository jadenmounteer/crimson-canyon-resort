import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { Post } from 'src/app/announcements/post';
import { AnnouncementsService } from 'src/app/announcements/announcements.service';

@Component({
  selector: 'app-announcements-section',
  templateUrl: './announcements-section.component.html',
  styleUrls: ['./announcements-section.component.scss'],
})
export class AnnouncementsSectionComponent implements OnInit {
  protected contentLoaded: boolean = false;
  protected posts$!: Observable<Post[]>;
  @Input() userDisplayName: string | undefined | null;

  constructor(
    protected announcementsService: AnnouncementsService,
    protected router: Router
  ) {
    this.loadPosts();
  }

  ngOnInit(): void {}

  protected loadPosts(): void {
    this.posts$ = this.announcementsService.fetchRecentPosts();
    this.contentLoaded = true;
  }
}
