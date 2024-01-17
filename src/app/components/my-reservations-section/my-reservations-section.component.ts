import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-my-reservations-section',
  templateUrl: './my-reservations-section.component.html',
  styleUrls: ['./my-reservations-section.component.scss'],
})
export class MyReservationsSectionComponent implements OnInit {
  constructor(protected router: Router) {}

  ngOnInit(): void {}
}
