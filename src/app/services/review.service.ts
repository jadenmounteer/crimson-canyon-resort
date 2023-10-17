import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';

import { Observable, from, map } from 'rxjs';
import { convertSnaps } from '../services/db-utils';
import { Review } from '../components/review/review.type';

@Injectable({
  providedIn: 'root',
})
export class ReviewService {
  constructor(private firestore: AngularFirestore) {}

  public createReview(newReview: Partial<Review>, reviewId: string) {
    const createReviewObs$ = from(
      this.firestore.doc(`reviews/${reviewId}`).set(newReview)
    );

    return createReviewObs$.pipe(
      map((res) => {
        return {
          id: reviewId,
          ...newReview,
        };
      })
    );
  }

  public fetchReviews(): Observable<Review[]> {
    return this.firestore
      .collection('reviews', (ref) => ref.orderBy('reviewDate', 'desc'))
      .get()
      .pipe(map((result) => convertSnaps<Review>(result)));
  }

  public updateReview(
    reviewId: string,
    changes: Partial<Review>
  ): Observable<any> {
    return from(this.firestore.doc(`reviews/${reviewId}`).update(changes));
  }

  public deleteReview(reviewId: string): Observable<void> {
    return from(this.firestore.doc(`reviews/${reviewId}`).delete());
  }
}
