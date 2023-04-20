import { Component, OnDestroy, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Subscription } from 'rxjs';
import { ReservationsService } from 'src/app/services/reservations.service';
import { Reservation } from 'src/app/types/reservation';
import { ConfirmModalComponent } from '../confirm-modal/confirm-modal.component';

@Component({
  selector: 'app-my-reservations-page',
  templateUrl: './my-reservations-page.component.html',
  styleUrls: ['./my-reservations-page.component.scss'],
})
export class MyReservationsPageComponent implements OnInit, OnDestroy {
  private reservationsSubscription!: Subscription;
  protected contentLoaded: boolean = false;
  protected myReservations: Array<Reservation> = [];

  constructor(
    protected reservationsService: ReservationsService,
    private modalService: NgbModal
  ) {}

  ngOnInit(): void {
    this.reservationsSubscription =
      this.reservationsService.reservationsChanged.subscribe((reservations) => {
        this.myReservations = reservations;
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
}
