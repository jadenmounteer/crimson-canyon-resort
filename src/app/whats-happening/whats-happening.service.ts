import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { AuthService } from '../components/auth/auth.service';
import { Router } from '@angular/router';
import { Post } from './post';
import { Observable, from, map } from 'rxjs';

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
      this.firestore.collection(`posts/${postId}`).add(newPost)
    );

    return createPostObs$.pipe(
      map((res) => {
        return {
          id: postId ?? res.id,
          ...newPost,
        };
      })
    );
  }
}
