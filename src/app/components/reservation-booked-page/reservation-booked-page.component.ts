import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-reservation-booked-page',
  templateUrl: './reservation-booked-page.component.html',
  styleUrls: ['./reservation-booked-page.component.scss'],
})
export class ReservationBookedPageComponent implements OnInit {
  constructor(public router: Router) {}

  ngOnInit(): void {}
}
