import { Component, Input, OnInit } from '@angular/core';
import { Post, PostComment } from '../../announcements/post';
import { IconService } from 'src/app/services/icon.service';
import { AnnouncementsService } from 'src/app/announcements/announcements.service';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { AuthService } from 'src/app/components/auth/auth.service';

@Component({
  selector: 'app-comments-area',
  templateUrl: './comments-area.component.html',
  styleUrls: ['./comments-area.component.scss'],
})
export class CommentsAreaComponent implements OnInit {
  @Input() post!: Post;

  protected newComment: Partial<PostComment> = {
    message: '',
  };

  constructor(
    public icon: IconService,
    private announcementsService: AnnouncementsService,
    private angularFirestore: AngularFirestore,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    if (!this.post) {
      throw new Error('Post is required');
    }
  }

  addComment() {
    this.newComment.id = this.angularFirestore.createId();
    this.newComment.createdDate = Date.now();
    this.newComment.createdByUserName = this.authService.userDisplayName;

    if (!this.post.comments) {
      this.post.comments = [];
    }

    this.post.comments.push(this.newComment as PostComment);

    this.announcementsService
      .updatePost(this.post.id, this.post)
      .subscribe((res) => {
        this.newComment = {
          message: '',
        };
      });
  }
}
