import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import { FormBuilder, Validators } from '@angular/forms';
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

@Component({
  selector: 'app-add-post',
  templateUrl: './add-post.component.html',
  styleUrls: ['./add-post.component.scss'],
})
export class AddPostComponent implements OnInit {
  protected percentageChanges$!: Observable<number | undefined>;
  protected iconURLs: string[] = [];
  private newPostId: string;

  constructor(
    private storage: AngularFireStorage,
    private fb: FormBuilder,
    private angularFirestore: AngularFirestore,
    private authService: AuthService
  ) {
    this.newPostId = this.angularFirestore.createId();
  }

  ngOnInit(): void {}

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
    const newPost: Partial<Post> = {
      userId: this.authService.userId,
      fileURLs: this.iconURLs,
      title: form.value.title,
      message: form.value.message,
      createdDate: Date.now(),
    };
  }
}
