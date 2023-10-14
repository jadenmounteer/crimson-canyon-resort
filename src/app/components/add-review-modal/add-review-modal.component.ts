import { Component, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Review } from '../review/review.type';

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
    reviewDate: {
      day: new Date().getDate(),
      month: 0,
      year: 0,
    },
  };

  constructor(public activeModal: NgbActiveModal) {}

  ngOnInit(): void {}

  protected onCreateReview() {}
}
