import {
  Component,
  ElementRef,
  Input,
  OnDestroy,
  OnInit,
  ViewChild,
} from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

import { AngularFirestore } from '@angular/fire/compat/firestore';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import {
  Observable,
  Subscription,
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
import { UsersService } from 'src/app/services/users.service';
import { User } from 'src/app/types/user';
import { AccessRequest } from 'src/app/types/access-request';
import { AuthorizedEmailsService } from 'src/app/services/authorized-emails.service';

@Component({
  selector: 'app-add-or-edit-post-modal',
  templateUrl: './add-or-edit-post-modal.component.html',
  styleUrls: ['./add-or-edit-post-modal.component.scss'],
})
export class AddOrEditPostModalComponent implements OnInit, OnDestroy {
  protected users: User[] = [];
  private usersSub$!: Subscription;
  protected approvedRequests: AccessRequest[] = [];
  protected showRequests = false;
  private requestsToNotify: string[] = [];

  constructor(
    public activeModal: NgbActiveModal,
    private storage: AngularFireStorage,
    private angularFirestore: AngularFirestore,
    private authService: AuthService,
    private announcementsService: AnnouncementsService,
    private usersService: UsersService,
    private authorizedEmailsService: AuthorizedEmailsService
  ) {}

  ngOnDestroy(): void {
    this.usersSub$.unsubscribe();
  }

  @Input() postToEdit: Post | undefined;
  @Input() title: string = 'New Announcement 📢';
  protected percentageChanges$!: Observable<number | undefined>;

  protected newPost: Partial<Post> = {
    userId: '',
    fileURLs: [],
    videoURLs: [],
    emailsToNotify: [],
  };

  ngOnInit(): void {
    this.loadUsers();
    this.loadRequests();
    this.newPost.userId = this.authService.userId;
    this.newPost.createdByUserEmail = this.authService.userEmail;

    if (this.postToEdit) {
      this.newPost = { ...this.postToEdit };
    }
  }

  private loadUsers() {
    this.usersSub$ = this.usersService.fetchUsers().subscribe((users) => {
      this.users = users;
    });
  }

  private loadRequests() {
    this.authorizedEmailsService
      .fetchApprovedRequests()
      .subscribe((requests) => {
        this.approvedRequests = requests;
      });
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

  protected toggleShowRequests() {
    this.showRequests = !this.showRequests;
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

  protected addOrRemoveEmailFromList(email: string | null) {
    if (!email) return;
    if (this.newPost.emailsToNotify?.includes(email)) {
      this.newPost.emailsToNotify = this.newPost.emailsToNotify?.filter(
        (e) => e !== email
      );
      return;
    }

    this.newPost.emailsToNotify?.push(email);
  }

  protected addOrRemoveEmailFromRequestList(email: string | null) {
    if (!email) return;
    if (this.requestsToNotify.includes(email)) {
      this.newPost.emailsToNotify = this.requestsToNotify.filter(
        (e) => e !== email
      );
      return;
    }

    this.requestsToNotify.push(email);
  }

  protected createFinalEmailList(): Array<string> {
    // merge the two lists into one list without merging duplicates
    const mergedList: string[] = [];
    if (this.newPost.emailsToNotify) {
      mergedList.push(...this.newPost.emailsToNotify);
    }

    this.requestsToNotify.forEach((requestEmail) => {
      if (!mergedList.includes(requestEmail)) {
        mergedList.push(requestEmail);
      }
    });

    return mergedList;
  }

  protected onCreatePost() {
    const newPostId = this.angularFirestore.createId();

    this.newPost.emailsToNotify = this.createFinalEmailList();

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
