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

  constructor(protected reservationsService: ReservationsService) {
    this.reservationsSubscription$ =
      this.reservationsService.allReservationsChanged.subscribe(
        (reservations) => {
          this.reservations = reservations;
          this.datePickerLoading$.next(false);
        }
      );

    this.reservationsService.fetchAllReservations();
  }
  ngOnDestroy(): void {
    this.reservationsSubscription$.unsubscribe();
  }

  isDisabled(date: NgbDateStruct): boolean {
    return date.day === 20;
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
}
