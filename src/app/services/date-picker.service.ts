import { Injectable } from '@angular/core';
import { NgbDate, NgbDateStruct } from '@ng-bootstrap/ng-bootstrap';
import { Reservation } from '../types/reservation';

@Injectable({
  providedIn: 'root',
})
export class DatePickerService {
  constructor() {}

  public getTodaysDate(): NgbDate {
    const date = new Date();
    return new NgbDate(date.getFullYear(), date.getMonth() + 1, date.getDate());
  }

  public getDatesOfPrivateVisits(reservations: Reservation[]): NgbDateStruct[] {
    const privateDates: NgbDateStruct[] = [];
    for (const reservation of reservations) {
      if (reservation.privateVisit) {
        privateDates.push(reservation.arrivalDate);
      }
    }
    return privateDates;
  }
}
