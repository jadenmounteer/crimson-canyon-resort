import { Injectable, OnDestroy } from '@angular/core';
import { NgbDate, NgbDateStruct } from '@ng-bootstrap/ng-bootstrap';
import { DayMonthYear, Reservation } from '../types/reservation';
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
  private datesOfNonPrivateVisits: NgbDateStruct[] = [];

  disabledDates: NgbDateStruct[] = [
    { year: 2023, month: 9, day: 22 },
    { year: 2023, month: 9, day: 23 },
    { year: 2023, month: 9, day: 24 },
  ];

  constructor(protected reservationsService: ReservationsService) {
    this.reservationsSubscription$ =
      this.reservationsService.allReservationsChanged.subscribe(
        (reservations) => {
          this.reservations = reservations;
          this.datesOfPrivateVisits = this.getDatesOfPrivateVisits(
            this.reservations
          );

          this.datesOfNonPrivateVisits = this.getDatesOfNonPrivateVisits(
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

  private getDatesOfPrivateVisits(
    reservations: Reservation[]
  ): NgbDateStruct[] {
    const privateDates: NgbDateStruct[] = [];
    for (const reservation of reservations) {
      if (reservation.privateVisit) {
        privateDates.push(reservation.arrivalDate);

        privateDates.push(reservation.departureDate);
        const datesInBetween = this.getDatesInBetween(
          reservation.arrivalDate,
          reservation.departureDate
        );
        datesInBetween.forEach((date) => {
          privateDates.push(date);
        });
      }
    }
    return privateDates;
  }

  private getDatesOfNonPrivateVisits(
    reservations: Reservation[]
  ): NgbDateStruct[] {
    const nonPrivateDates: NgbDateStruct[] = [];
    for (const reservation of reservations) {
      if (!reservation.privateVisit) {
        nonPrivateDates.push(reservation.arrivalDate);

        nonPrivateDates.push(reservation.departureDate);
        const datesInBetween = this.getDatesInBetween(
          reservation.arrivalDate,
          reservation.departureDate
        );
        datesInBetween.forEach((date) => {
          nonPrivateDates.push(date);
        });
      }
    }
    return nonPrivateDates;
  }

  private getDatesInBetween(
    arrivalDate: NgbDateStruct,
    departureDate: NgbDateStruct
  ): NgbDateStruct[] {
    const datesInBetween: NgbDateStruct[] = [];
    const arrivalDateAsDate = new Date(
      arrivalDate.year,
      arrivalDate.month,
      arrivalDate.day
    );
    const departureDateAsDate = new Date(
      departureDate.year,
      departureDate.month,
      departureDate.day
    );
    const differenceInDays =
      (departureDateAsDate.getTime() - arrivalDateAsDate.getTime()) /
      (1000 * 3600 * 24);
    for (let i = 0; i < differenceInDays; i++) {
      const date = new Date(arrivalDateAsDate.getTime() + i * 1000 * 3600 * 24);
      datesInBetween.push(
        new NgbDate(date.getFullYear(), date.getMonth(), date.getDate())
      );
    }
    return datesInBetween;
  }

  public isNonPrivateVisit(date: NgbDateStruct): boolean {
    for (const dateOfNonPrivateVisit of this.datesOfNonPrivateVisits) {
      if (NgbDate.from(dateOfNonPrivateVisit)?.equals(date)) {
        return true;
      }
    }
    return false;
  }

  public isPrivateVisit(date: NgbDateStruct): boolean {
    for (const dateOfPrivateVisit of this.datesOfPrivateVisits) {
      if (NgbDate.from(dateOfPrivateVisit)?.equals(date)) {
        return true;
      }
    }
    return false;
  }

  // IMPORTANT This needs to be an arrow function to work properly.
  public isDisabled = (
    date: NgbDateStruct,
    current: { month: number; year: number } | undefined
  ) => {
    for (const dateOfPrivateVisit of this.datesOfPrivateVisits) {
      if (NgbDate.from(dateOfPrivateVisit)?.equals(date)) {
        return true;
      }
    }
    return false;
  };

  public dateLandsOnPrivateVisit(date: DayMonthYear): boolean {
    for (const dateOfPrivateVisit of this.datesOfPrivateVisits) {
      if (
        dateOfPrivateVisit.year === date.year &&
        dateOfPrivateVisit.month === date.month &&
        dateOfPrivateVisit.day === date.day
      ) {
        return true;
      }
    }
    return false;
  }

  public dateLandsOnNonPrivateVisit(date: DayMonthYear): boolean {
    for (const dateOfNonPrivateVisit of this.datesOfNonPrivateVisits) {
      if (
        dateOfNonPrivateVisit.year === date.year &&
        dateOfNonPrivateVisit.month === date.month &&
        dateOfNonPrivateVisit.day === date.day
      ) {
        return true;
      }
    }
    return false;
  }

  public getDatesBetweenArrivalAndDepartureDates(
    arrivalDate: DayMonthYear,
    departureDate: DayMonthYear
  ): Array<DayMonthYear> {
    const datesInBetween: DayMonthYear[] = [];

    const arrivalDateAsDate = new Date(
      arrivalDate.year,
      arrivalDate.month,
      arrivalDate.day
    );
    const departureDateAsDate = new Date(
      departureDate.year,
      departureDate.month,
      departureDate.day
    );
    const differenceInDays =
      (departureDateAsDate.getTime() - arrivalDateAsDate.getTime()) /
      (1000 * 3600 * 24);
    for (let i = 0; i < differenceInDays; i++) {
      const date = new Date(arrivalDateAsDate.getTime() + i * 1000 * 3600 * 24);
      datesInBetween.push({
        day: date.getDate(),
        month: date.getMonth(),
        year: date.getFullYear(),
      });
    }
    return datesInBetween;
  }
}
