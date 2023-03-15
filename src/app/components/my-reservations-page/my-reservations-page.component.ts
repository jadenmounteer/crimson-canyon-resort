import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { ReservationsService } from 'src/app/services/reservations.service';
import { Reservation } from 'src/app/types/reservation';

@Component({
  selector: 'app-my-reservations-page',
  templateUrl: './my-reservations-page.component.html',
  styleUrls: ['./my-reservations-page.component.scss'],
})
export class MyReservationsPageComponent implements OnInit {
  private reservationsSubscription!: Subscription;
  protected contentLoaded: boolean = false;
  protected myReservations: Array<Reservation> = [];

  constructor(private reservationsService: ReservationsService) {}

  ngOnInit(): void {
    this.reservationsSubscription =
      this.reservationsService.reservationsChanged.subscribe((reservations) => {
        this.myReservations = reservations;
        this.contentLoaded = true;
        console.log(this.myReservations);
      });

    this.reservationsService.fetchReservations();
  }
}
