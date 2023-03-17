import { Component, Input, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';

import { IconService } from 'src/app/services/icon.service';
import { ReservationsService } from 'src/app/services/reservations.service';
import { Reservation } from 'src/app/types/reservation';

@Component({
  selector: 'app-reservation-details',
  templateUrl: './reservation-details.component.html',
  styleUrls: ['./reservation-details.component.scss'],
})
export class ReservationDetailsComponent implements OnInit {
  public contentLoaded: boolean = false;
  protected reservation!: Reservation;

  constructor(
    public icon: IconService,
    private route: ActivatedRoute,
    private reservationsService: ReservationsService
  ) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe((params) => {
      let id: string | null = params.get('id');
      this.reservation = this.reservationsService.getReservation(id);
      this.contentLoaded = true;
    });
  }

  public onChangeReservation(form: NgForm) {}
}
