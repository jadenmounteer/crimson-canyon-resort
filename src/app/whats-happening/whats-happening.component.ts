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
  protected contentLoaded: boolean = true;
  protected posts$!: Observable<Post[]>;

  constructor(
    private afs: AngularFirestore,
    private whatsHappeningService: WhatsHappeningService
  ) {
    this.loadPosts();
  }

  ngOnInit(): void {}

  protected loadPosts(): void {
    this.posts$ = this.whatsHappeningService.fetchPosts();
  }
}
