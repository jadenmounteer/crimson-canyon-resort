import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { AnnouncementsService } from './announcements.service';
import { Observable } from 'rxjs';
import { Post } from './post';

@Component({
  selector: 'app-announcements',
  templateUrl: './announcements.component.html',
  styleUrls: ['./announcements.component.scss'],
})
export class AnnouncementsComponent implements OnInit {
  protected contentLoaded: boolean = false;
  protected posts$!: Observable<Post[]>;
  protected displayNewPostMessage: boolean = false;
  protected displayDeletedPostMessage: boolean = false;
  protected displayErrorMsg: boolean = false;
  protected displaySavedChangesMessage: boolean = false;

  constructor(
    private afs: AngularFirestore,
    private announcementsService: AnnouncementsService
  ) {
    this.loadPosts();
  }

  ngOnInit(): void {}

  protected loadPosts(): void {
    this.posts$ = this.announcementsService.fetchPosts();
    this.contentLoaded = true;
  }

  protected onAddedNewPost(): void {
    this.loadPosts();
    this.displayNewPostMessage = true;
  }

  protected onDeletedPost(): void {
    this.loadPosts();
    this.displayDeletedPostMessage = true;
  }

  protected removeAllMessages(): void {
    this.displayNewPostMessage = false;
    this.displayDeletedPostMessage = false;
    this.displayErrorMsg = false;
    this.displaySavedChangesMessage = false;
  }
}
