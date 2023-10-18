import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { Review } from '../review/review.type';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { AddReviewModalComponent } from '../add-review-modal/add-review-modal.component';
import { AuthService } from '../auth/auth.service';
import { Subscription } from 'rxjs';
import { ReviewService } from 'src/app/services/review.service';
import {
  animate,
  state,
  style,
  transition,
  trigger,
} from '@angular/animations';

@Component({
  selector: 'app-reviews-section',
  templateUrl: './reviews-section.component.html',
  styleUrls: ['./reviews-section.component.scss'],
  animations: [
    trigger('slideInRight', [
      transition(':enter', [
        style({ transform: 'translateX(100%)' }),
        animate('1000ms ease-out', style({ transform: 'translateX(0)' })),
      ]),
      transition(':leave', [
        animate('1000ms ease-out', style({ transform: 'translateX(-100%)' })),
      ]),
    ]),
  ],
})
export class ReviewsSectionComponent implements OnInit, OnDestroy {
  protected loading: boolean = true;
  protected reviews: Review[] = [];
  @Input() isAuth: boolean = false;
  protected imageVisible = true;
  private reviewsSubscription$ = new Subscription();

  constructor(
    private modalService: NgbModal,
    protected authService: AuthService,
    private reviewService: ReviewService
  ) {}

  ngOnInit(): void {
    this.loadReviews();
  }

  ngOnDestroy(): void {
    this.reviewsSubscription$.unsubscribe();
  }

  protected toggleImage() {
    this.imageVisible = !this.imageVisible;
  }

  private loadReviews(): void {
    this.loading = true;
    this.reviewsSubscription$ = this.reviewService
      .fetchReviews()
      .subscribe((reviews: Review[]) => {
        this.reviews = reviews;
        this.loading = false;
      });
  }

  protected openAddReviewModal() {
    const modalRef = this.modalService.open(AddReviewModalComponent);
    modalRef.result.then((result) => {
      if (result !== undefined) {
        this.reviews.push(result);
      }
    });
  }
}
