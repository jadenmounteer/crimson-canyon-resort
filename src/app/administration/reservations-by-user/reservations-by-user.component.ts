import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ConfirmModalComponent } from 'src/app/components/confirm-modal/confirm-modal.component';
import { ReservationsService } from 'src/app/services/reservations.service';
import { Reservation } from 'src/app/types/reservation';

@Component({
  selector: 'app-reservations-by-user',
  templateUrl: './reservations-by-user.component.html',
  styleUrls: ['./reservations-by-user.component.scss'],
})
export class ReservationsByUserComponent implements OnInit {
  protected contentLoaded: boolean = false;
  protected reservations: Array<Reservation> = [];
  constructor(
    protected reservationsService: ReservationsService,
    private modalService: NgbModal
  ) {}

  ngOnInit(): void {
    this.reservationsService.allReservationsChanged.subscribe(
      (reservations) => {
        this.reservations = reservations;
        this.contentLoaded = true;
      }
    );

    this.reservationsService.fetchAllReservations();
  }

  public onDeleteReservation(reservation: Reservation) {
    const modalRef = this.modalService.open(ConfirmModalComponent);
    modalRef.componentInstance.message = `Are you sure you want to cancel the ${reservation.familyName} family reservation?`;
    modalRef.result.then((result) => {
      if (result === 'Yes') {
        this.reservationsService.deleteReservation(reservation);
      }
    });
  }
}
