import { Component, Input, OnInit } from '@angular/core';
import { Review } from '../review/review.type';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { AddReviewModalComponent } from '../add-review-modal/add-review-modal.component';
import { AuthService } from '../auth/auth.service';
import { Observable } from 'rxjs';
import { ReviewService } from 'src/app/services/review.service';

@Component({
  selector: 'app-reviews-section',
  templateUrl: './reviews-section.component.html',
  styleUrls: ['./reviews-section.component.scss'],
})
export class ReviewsSectionComponent implements OnInit {
  protected loading: boolean = true;
  protected reviews$!: Observable<Review[]>;
  @Input() isAuth: boolean = false;

  constructor(
    private modalService: NgbModal,
    protected authService: AuthService,
    private reviewService: ReviewService
  ) {}

  ngOnInit(): void {
    this.loadReviews();
  }

  private loadReviews(): void {
    this.loading = true;
    this.reviews$ = this.reviewService.fetchReviews();
    this.loading = false;
  }

  protected openAddReviewModal() {
    const modalRef = this.modalService.open(AddReviewModalComponent);
    modalRef.result.then((result) => {
      if (result === 'success') {
        this.loadReviews();
      }
    });
  }
}
