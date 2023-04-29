import { Component, OnInit } from '@angular/core';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import { Observable, catchError, concatMap, last, tap, throwError } from 'rxjs';

@Component({
  selector: 'app-add-post',
  templateUrl: './add-post.component.html',
  styleUrls: ['./add-post.component.scss'],
})
export class AddPostComponent implements OnInit {
  protected percentageChanges$!: Observable<number | undefined>;
  protected iconURL: string = '';

  constructor(private storage: AngularFireStorage) {}

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
        tap((url) => (this.iconURL = url)),
        catchError((err) => {
          console.log(err);
          return throwError(err);
        })
      )
      .subscribe();
  }
}
