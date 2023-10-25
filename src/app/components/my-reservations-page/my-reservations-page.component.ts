import { Component, OnDestroy, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Subscription } from 'rxjs';
import { ReservationsService } from 'src/app/services/reservations.service';
import { Reservation } from 'src/app/types/reservation';
import { ConfirmModalComponent } from '../confirm-modal/confirm-modal.component';
import { Router } from '@angular/router';
import { AddReviewModalComponent } from '../add-review-modal/add-review-modal.component';

@Component({
  selector: 'app-my-reservations-page',
  templateUrl: './my-reservations-page.component.html',
  styleUrls: ['./my-reservations-page.component.scss'],
})
export class MyReservationsPageComponent implements OnInit, OnDestroy {
  private reservationsSubscription!: Subscription;
  protected contentLoaded: boolean = false;
  protected upcomingReservations: Array<Reservation> = [];
  protected pastReservations: Array<Reservation> = [];

  constructor(
    protected reservationsService: ReservationsService,
    private modalService: NgbModal,
    public router: Router
  ) {}

  ngOnInit(): void {
    this.reservationsSubscription =
      this.reservationsService.reservationsChanged.subscribe((reservations) => {
        this.upcomingReservations =
          this.reservationsService.grabUpcomingReservations(reservations);
        this.pastReservations =
          this.reservationsService.grabPastReservations(reservations);
        this.contentLoaded = true;
      });

    this.reservationsService.fetchReservations();
  }

  ngOnDestroy(): void {
    this.reservationsSubscription.unsubscribe();
  }

  public onDeleteReservation(reservation: Reservation) {
    const modalRef = this.modalService.open(ConfirmModalComponent);
    modalRef.componentInstance.message = `Are you sure you want to delete the ${reservation.familyName} family reservation?`;
    modalRef.result.then((result) => {
      if (result === 'Yes') {
        this.reservationsService.deleteReservation(reservation);
      }
    });
  }

  protected openAddReviewModal() {
    const modalRef = this.modalService.open(AddReviewModalComponent);
  }
}
