import { Injectable, OnDestroy } from '@angular/core';
import { NgbDate, NgbDateStruct } from '@ng-bootstrap/ng-bootstrap';
import { Reservation } from '../types/reservation';
import { BehaviorSubject, Subscription } from 'rxjs';
import { ReservationsService } from './reservations.service';

@Injectable({
  providedIn: 'root',
})
export class DatePickerService implements OnDestroy {
  private reservationsSubscription$: Subscription;
  private reservations: Reservation[] = [];
  public datePickerLoading$: BehaviorSubject<boolean> =
    new BehaviorSubject<boolean>(true);
  private datesOfPrivateVisits: NgbDateStruct[] = [];

  constructor(protected reservationsService: ReservationsService) {
    this.reservationsSubscription$ =
      this.reservationsService.allReservationsChanged.subscribe(
        (reservations) => {
          this.reservations = reservations;
          this.datesOfPrivateVisits = this.getDatesOfPrivateVisits(
            this.reservations
          );
          this.datePickerLoading$.next(false);
        }
      );

    this.reservationsService.fetchAllReservations();
  }
  ngOnDestroy(): void {
    this.reservationsSubscription$.unsubscribe();
  }

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

  // IMPORTANT This needs to be an arrow function to work properly.
  public isDisabled = (
    date: NgbDateStruct,
    current: { month: number; year: number } | undefined
  ) => {
    return this.datesOfPrivateVisits.find((x) => NgbDate.from(x)?.equals(date))
      ? true
      : false;
  };
}
