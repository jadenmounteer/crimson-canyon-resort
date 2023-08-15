import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { Post } from 'src/app/whats-happening/post';
import { AnnouncementsService } from 'src/app/whats-happening/announcements.service';

@Component({
  selector: 'app-whats-happening-section',
  templateUrl: './whats-happening-section.component.html',
  styleUrls: ['./whats-happening-section.component.scss'],
})
export class WhatsHappeningSectionComponent implements OnInit {
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
