import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { IconService } from 'src/app/services/icon.service';
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
    private modalService: NgbModal,
    public icon: IconService
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
}
