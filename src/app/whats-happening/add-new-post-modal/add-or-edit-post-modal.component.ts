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
import { WhatsHappeningService } from '../whats-happening.service';

@Component({
  selector: 'app-add-or-edit-post-modal',
  templateUrl: './add-or-edit-post-modal.component.html',
  styleUrls: ['./add-or-edit-post-modal.component.scss'],
})
export class AddOrEditPostModalComponent implements OnInit {
  @Input() postToEdit: Post | undefined;
  @Input() title: string = 'Add New Post';
  protected percentageChanges$!: Observable<number | undefined>;

  protected newPost: Partial<Post> = {
    userId: this.authService.userId,
    fileURLs: [],
  };

  constructor(
    public activeModal: NgbActiveModal,
    private storage: AngularFireStorage,
    private angularFirestore: AngularFirestore,
    private authService: AuthService,
    private whatsHappeningService: WhatsHappeningService
  ) {}

  ngOnInit(): void {
    if (this.postToEdit) {
      this.newPost = this.postToEdit;
    }
  }

  @ViewChild('fileInput') fileInput!: ElementRef;
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
          console.log(err);
          return throwError(err);
        })
      )
      .subscribe(() => {
        this.percentageChanges$ = of();
      });
  }

  protected updatePost() {
    if (this.newPost.id) {
      this.whatsHappeningService
        .updatePost(this.newPost.id, this.newPost)
        .subscribe(() => {
          this.activeModal.close('success');
        });
    }
  }

  protected onCreatePost(form: NgForm) {
    const newPostId = this.angularFirestore.createId();

    this.newPost.createdDate = Date.now();

    this.newPost.createdByUserName = this.authService.userDisplayName;

    this.whatsHappeningService
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
  }
}
