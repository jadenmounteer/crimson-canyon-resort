import { Component, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Review } from '../review/review.type';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { AuthService } from '../auth/auth.service';
import { ReviewService } from 'src/app/services/review.service';
import { catchError, tap, throwError } from 'rxjs';

@Component({
  selector: 'app-add-review-modal',
  templateUrl: './add-review-modal.component.html',
  styleUrls: ['./add-review-modal.component.scss'],
})
export class AddReviewModalComponent implements OnInit {
  protected newReview: Partial<Review> = {
    userId: '',
    rating: 5,
    reviewText: '',
    reviewDate: Date.now(),
  };

  protected displayErrorMsg: boolean = false;
  protected errorMessage: string =
    'Unable to add review. Please reach out to Jaden for help! 😭';

  constructor(
    public activeModal: NgbActiveModal,
    private angularFirestore: AngularFirestore,
    private authService: AuthService,
    private reviewService: ReviewService
  ) {}

  ngOnInit(): void {}

  protected onCreateReview() {
    const newReviewId = this.angularFirestore.createId();

    this.newReview.userId = this.authService.userId;

    if (this.authService.userDisplayName) {
      this.newReview.username = this.authService.userDisplayName;
    }

    this.reviewService
      .createReview(this.newReview, newReviewId)
      .pipe(
        tap((review) => {
          this.activeModal.close('success');
        }),
        catchError((err) => {
          this.displayErrorMsg = true;
          this.errorMessage = err;
          return throwError(err);
        })
      )
      .subscribe();
  }
}
