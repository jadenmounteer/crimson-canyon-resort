import { Component, Input, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { IconService } from 'src/app/services/icon.service';
import { Reservation } from 'src/app/types/reservation';

@Component({
  selector: 'app-reservation-details',
  templateUrl: './reservation-details.component.html',
  styleUrls: ['./reservation-details.component.scss'],
})
export class ReservationDetailsComponent implements OnInit {
  @Input() reservation!: Reservation;

  constructor(public icon: IconService, public activeModal: NgbActiveModal) {}

  ngOnInit(): void {}

  public onChangeReservation(form: NgForm) {}
}
