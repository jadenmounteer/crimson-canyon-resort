import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { Review } from '../review/review.type';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { AddReviewModalComponent } from '../add-review-modal/add-review-modal.component';
import { AuthService } from '../auth/auth.service';
import { Observable, Subscription } from 'rxjs';
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
    trigger('fadeIn', [
      transition(':enter', [
        style({
          opacity: 0,
        }),
        animate(
          '0.2s ease-in',
          style({
            opacity: 1,
          })
        ),
      ]),
      transition(':leave', [
        style({
          opacity: 1,
        }),
        animate(
          '0.2s ease-out',
          style({
            opacity: 0,
          })
        ),
      ]),
    ]),
  ],
})
export class ReviewsSectionComponent implements OnInit, OnDestroy {
  protected loading: boolean = true;
  protected allReviews: Review[] = [];
  @Input() isAuth: boolean = false;
  protected reviewVisible = true;
  private reviewsSubscription$ = new Subscription();
  protected reviewToDisplay: Review | undefined;
  protected changeReviewToDisplayInterval: Observable<number> =
    new Observable();

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

  protected cycleThroughReviews() {
    this.toggleReviewVisibility();

    setTimeout(() => {
      this.toggleReviewVisibility();
    }, 1500);
    const randomIndex = Math.floor(Math.random() * this.allReviews.length);
    this.reviewToDisplay = this.allReviews[randomIndex];
  }

  private toggleReviewVisibility() {
    this.reviewVisible = !this.reviewVisible;
  }

  protected setChangeReviewToDisplayInterval() {
    this.changeReviewToDisplayInterval = new Observable((observer) => {
      this.cycleThroughReviews();
      this.loading = false;

      setInterval(() => {
        this.cycleThroughReviews();
      }, 8000);
    });
    this.changeReviewToDisplayInterval.subscribe();
  }

  private loadReviews(): void {
    this.loading = true;
    this.reviewsSubscription$ = this.reviewService
      .fetchReviews()
      .subscribe((reviews: Review[]) => {
        this.allReviews = reviews;
        this.setChangeReviewToDisplayInterval();
      });
  }

  protected openAddReviewModal() {
    const modalRef = this.modalService.open(AddReviewModalComponent);
    modalRef.result.then((result) => {
      if (result !== undefined) {
        this.allReviews.push(result);
      }
    });
  }
}
