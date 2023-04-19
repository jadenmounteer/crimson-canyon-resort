import { Component, OnInit } from '@angular/core';
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
  constructor(private reservationsService: ReservationsService) {}

  ngOnInit(): void {
    this.reservationsService.reservationsChanged.subscribe((reservations) => {
      this.reservations = reservations;
      this.contentLoaded = true;
    });
  }
}
