import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { AuthService } from '../components/auth/auth.service';
import { Router } from '@angular/router';
import { Post } from './post';
import { Observable, from, map } from 'rxjs';
import { convertSnaps } from '../services/db-utils';

@Injectable({
  providedIn: 'root',
})
export class WhatsHappeningService {
  constructor(
    private firestore: AngularFirestore,
    private authService: AuthService,
    private router: Router
  ) {}

  public createPost(newPost: Partial<Post>, postId: string) {
    const createPostObs$ = from(
      this.firestore.doc(`posts/${postId}`).set(newPost)
    );

    return createPostObs$.pipe(
      map((res) => {
        return {
          id: postId,
          ...newPost,
        };
      })
    );
  }

  public fetchPosts(): Observable<Post[]> {
    return this.firestore
      .collection('posts')
      .get()
      .pipe(map((result) => convertSnaps<Post>(result)));
  }
}
