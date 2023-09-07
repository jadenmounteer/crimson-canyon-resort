import {
  Component,
  ElementRef,
  Input,
  OnInit,
  Output,
  ViewChild,
} from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

import { AngularFirestore } from '@angular/fire/compat/firestore';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import {
  Observable,
  catchError,
  concatMap,
  last,
  of,
  tap,
  throwError,
} from 'rxjs';
import { Post } from '../post';
import { NgForm } from '@angular/forms';
import { AuthService } from 'src/app/components/auth/auth.service';
import { AnnouncementsService } from '../announcements.service';

@Component({
  selector: 'app-add-or-edit-post-modal',
  templateUrl: './add-or-edit-post-modal.component.html',
  styleUrls: ['./add-or-edit-post-modal.component.scss'],
})
export class AddOrEditPostModalComponent implements OnInit {
  constructor(
    public activeModal: NgbActiveModal,
    private storage: AngularFireStorage,
    private angularFirestore: AngularFirestore,
    private authService: AuthService,
    private announcementsService: AnnouncementsService
  ) {}

  @Input() postToEdit: Post | undefined;
  @Input() title: string = 'Add New Post';
  protected percentageChanges$!: Observable<number | undefined>;

  protected newPost: Partial<Post> = {
    userId: '',
    fileURLs: [],
    videoURLs: [],
  };

  ngOnInit(): void {
    this.newPost.userId = this.authService.userId;
    if (this.postToEdit) {
      this.newPost = { ...this.postToEdit };
    }
  }

  @ViewChild('fileInput') fileInput!: ElementRef;
  @ViewChild('videoInput') videoInput!: ElementRef;
  protected displayErrorMsg: boolean = false;

  protected uploadFile(event: any) {
    const file: File = event.target.files[0];
    // TODO Put the post ID into this filepath to have a separate folder per post.
    // const filePath = `posts/${this.postID}`;
    const filePath = `posts/${file.name}`;

    // TODO We may want to only upload this when we submit the form
    const task = this.storage.upload(filePath, file, {
      cacheControl: 'max-age=2592000,public',
    });

    this.percentageChanges$ = task.percentageChanges();

    task
      .snapshotChanges()
      .pipe(
        last(),
        concatMap(() => this.storage.ref(filePath).getDownloadURL()),
        tap((url) => {
          if (this.newPost.fileURLs) this.newPost.fileURLs.push(url);
        }),
        catchError((err) => {
          return throwError(err);
        })
      )
      .subscribe(() => {
        this.percentageChanges$ = of();
      });
  }

  protected uploadVideo(event: any) {
    const file: File = event.target.files[0];
    // TODO Put the post ID into this filepath to have a separate folder per post.
    // const filePath = `posts/${this.postID}`;
    const filePath = `posts/${file.name}`;

    // TODO We may want to only upload this when we submit the form
    const task = this.storage.upload(filePath, file, {
      cacheControl: 'max-age=2592000,public',
    });

    this.percentageChanges$ = task.percentageChanges();

    task
      .snapshotChanges()
      .pipe(
        last(),
        concatMap(() => this.storage.ref(filePath).getDownloadURL()),
        tap((url) => {
          if (this.newPost.videoURLs) this.newPost.videoURLs.push(url);
        }),
        catchError((err) => {
          return throwError(err);
        })
      )
      .subscribe(() => {
        this.percentageChanges$ = of();
      });
  }

  protected updatePost() {
    if (this.newPost.id) {
      this.announcementsService
        .updatePost(this.newPost.id, this.newPost)
        .subscribe(() => {
          this.activeModal.close('success');
        });
    }
  }

  protected onCreatePost() {
    const newPostId = this.angularFirestore.createId();

    this.newPost.createdDate = Date.now();

    this.newPost.createdByUserName = this.authService.userDisplayName;

    this.announcementsService
      .createPost(this.newPost, newPostId)
      .pipe(
        tap((post) => {
          this.activeModal.close('success');
        }),
        catchError((err) => {
          this.displayErrorMsg = true;
          return throwError(err);
        })
      )
      .subscribe();
  }

  protected clearFiles() {
    this.newPost.fileURLs = [];
    this.fileInput.nativeElement.value = '';
    this.newPost.videoURLs = [];
    this.videoInput.nativeElement.value = '';
  }
}
