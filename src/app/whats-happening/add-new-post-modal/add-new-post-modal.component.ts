import {
  Component,
  ElementRef,
  EventEmitter,
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
  selector: 'app-add-new-post-modal',
  templateUrl: './add-new-post-modal.component.html',
  styleUrls: ['./add-new-post-modal.component.scss'],
})
export class AddNewPostModalComponent implements OnInit {
  constructor(
    public activeModal: NgbActiveModal,
    private storage: AngularFireStorage,
    private angularFirestore: AngularFirestore,
    private authService: AuthService,
    private whatsHappeningService: WhatsHappeningService
  ) {}

  ngOnInit(): void {}

  protected percentageChanges$!: Observable<number | undefined>;
  protected iconURLs: string[] = [];

  @ViewChild('fileInput') fileInput!: ElementRef;
  protected displaySuccessMsg: boolean = false;
  protected displayErrorMsg: boolean = false;
  @Output() createPostEvent: EventEmitter<any> = new EventEmitter();

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
        tap((url) => this.iconURLs.push(url)),
        catchError((err) => {
          console.log(err);
          return throwError(err);
        })
      )
      .subscribe(() => {
        this.percentageChanges$ = of();
      });
  }

  protected onCreatePost(form: NgForm) {
    const newPostId = this.angularFirestore.createId();

    const newPost: Partial<Post> = {
      userId: this.authService.userId,
      fileURLs: this.iconURLs,
      message: form.value.message,
      createdDate: Date.now(),
      createdByUserName: this.authService.userDisplayName,
    };

    this.whatsHappeningService
      .createPost(newPost, newPostId)
      .pipe(
        tap((post) => {
          this.displaySuccessMessage();
          this.clearForm(form);
          this.createPostEvent.emit();
        }),
        catchError((err) => {
          this.displayErrorMsg = true;
          return throwError(err);
        })
      )
      .subscribe();
  }

  private displaySuccessMessage() {
    this.displaySuccessMsg = true;
  }

  private clearForm(form: NgForm) {
    form.reset();
    this.clearFiles();
  }

  protected clearFiles() {
    this.iconURLs = [];
    this.fileInput.nativeElement.value = '';
  }
}
