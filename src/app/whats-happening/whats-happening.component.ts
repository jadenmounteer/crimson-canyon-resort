import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { WhatsHappeningService } from './whats-happening.service';
import { Observable } from 'rxjs';
import { Post } from './post';

@Component({
  selector: 'app-whats-happening',
  templateUrl: './whats-happening.component.html',
  styleUrls: ['./whats-happening.component.scss'],
})
export class WhatsHappeningComponent implements OnInit {
  protected contentLoaded: boolean = false;
  protected posts$!: Observable<Post[]>;
  protected displayNewPostMessage: boolean = false;
  protected displayDeletedPostMessage: boolean = false;
  protected displayErrorMsg: boolean = false;

  constructor(
    private afs: AngularFirestore,
    private whatsHappeningService: WhatsHappeningService
  ) {
    this.loadPosts();
  }

  ngOnInit(): void {}

  protected loadPosts(): void {
    this.posts$ = this.whatsHappeningService.fetchPosts();
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
}
