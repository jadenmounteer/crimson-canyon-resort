import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { AuthService } from '../components/auth/auth.service';
import { Router } from '@angular/router';
import { Post } from './post';
import { Observable, from, map } from 'rxjs';
import { convertSnaps } from '../services/db-utils';
import { User } from '../types/user';

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
      .collection('posts', (ref) => ref.orderBy('createdDate', 'desc'))
      .get()
      .pipe(map((result) => convertSnaps<Post>(result)));
  }

  public fetchRecentPosts(): Observable<Post[]> {
    return this.firestore
      .collection('posts', (ref) => ref.orderBy('createdDate', 'desc').limit(3))
      .get()
      .pipe(map((result) => convertSnaps<Post>(result)));
  }

  public getUsersBasedOnId(userId: string): Observable<User[]> {
    return this.firestore
      .collection('users', (ref) => ref.where('userId', '==', userId))
      .get()
      .pipe(map((result) => convertSnaps<User>(result)));
  }

  public deletePost(postId: string): Observable<void> {
    return from(this.firestore.doc(`posts/${postId}`).delete());
  }

  public updatePost(postId: string, changes: Partial<Post>): Observable<any> {
    return from(this.firestore.doc(`posts/${postId}`).update(changes));
  }
}
