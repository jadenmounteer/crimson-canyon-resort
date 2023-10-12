import { Component, Input, OnInit } from '@angular/core';
import { Review } from '../review/review.type';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { AddReviewModalComponent } from '../add-review-modal/add-review-modal.component';
import { AuthService } from '../auth/auth.service';

@Component({
  selector: 'app-reviews-section',
  templateUrl: './reviews-section.component.html',
  styleUrls: ['./reviews-section.component.scss'],
})
export class ReviewsSectionComponent implements OnInit {
  protected loading: boolean = false;
  protected reviews: Review[] = [];
  @Input() isAuth: boolean = false;

  constructor(
    private modalService: NgbModal,
    protected authService: AuthService
  ) {}

  ngOnInit(): void {}

  protected openAddReviewModal() {
    const modalRef = this.modalService.open(AddReviewModalComponent);
  }
}
