import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Title } from '@angular/platform-browser';
import { Subscription } from 'rxjs';
import { IconService } from 'src/app/services/icon.service';
import { AuthService } from '../auth/auth.service';
import { DayMonthYear, Reservation } from 'src/app/types/reservation';
import { ReservationsService } from 'src/app/services/reservations.service';
import { Router } from '@angular/router';
import { NgbDate } from '@ng-bootstrap/ng-bootstrap';
import { DatePickerService } from 'src/app/services/date-picker.service';

@Component({
  selector: 'app-reserve-trip-page',
  templateUrl: './reserve-trip-page.component.html',
  styleUrls: ['./reserve-trip-page.component.scss'],
})
export class ReserveTripPageComponent implements OnInit, OnDestroy {
  protected todaysDate!: NgbDate;
  public contentLoaded: boolean = false;
  public isAuth: boolean = false;
  private authSubscription!: Subscription;
  public arrivalDate: DayMonthYear | undefined;
  public departureDate: DayMonthYear | undefined;
  public dateAvailable!: boolean | undefined;
  protected arrivalDateInvalid: boolean = false;
  public datePickerLoading$!: Subscription;
  protected validDates: boolean = true;
  protected invalidDatesMessage: string = '';

  constructor(
    titleService: Title,
    private authService: AuthService,
    public icon: IconService,
    private reservationsService: ReservationsService,
    private router: Router,
    protected datePickerService: DatePickerService
  ) {
    titleService.setTitle('Crimson Canyon Resort | Reserve Trip');
    this.todaysDate = this.datePickerService.getTodaysDate();
  }

  ngOnInit(): void {
    this.authSubscription = this.authService.authChange.subscribe(
      (authStatus) => {
        this.isAuth = authStatus;
      }
    );
    if (this.authService.isAuthenticated) {
      this.isAuth = true;
    } else {
      this.isAuth = false;
    }

    this.getArrivalAndDepartureDate();

    if (this.arrivalDate && this.departureDate) {
      // TODO check if the date is available here
      this.validDates = this.validateDates(
        this.arrivalDate,
        this.departureDate
      );

      if (this.validDates) {
        this.dateAvailable = this.checkIfDateIsAvailable();
      }
    }

    this.datePickerLoading$ =
      this.datePickerService.datePickerLoading$.subscribe((loading) => {
        this.contentLoaded = !loading;
      });
  }

  private validateDates(
    arrivalDate: DayMonthYear,
    departureDate: DayMonthYear
  ): boolean {
    let valid = true;

    if (this.arrivalDateIsAfterDepartureDate(arrivalDate, departureDate)) {
      valid = false;
      this.invalidDatesMessage =
        'Slow down there tiger. Your arrival date cannot be after the departure date. 🐯';
    }

    return valid;
  }

  private arrivalDateIsAfterDepartureDate(
    arrivalDate: DayMonthYear,
    departureDate: DayMonthYear
  ): boolean {
    let arrivalDateIsAfterDepartureDate = false;

    if (arrivalDate.year > departureDate.year) {
      arrivalDateIsAfterDepartureDate = true;
    } else if (arrivalDate.year === departureDate.year) {
      if (arrivalDate.month > departureDate.month) {
        arrivalDateIsAfterDepartureDate = true;
      } else if (arrivalDate.month === departureDate.month) {
        if (arrivalDate.day > departureDate.day) {
          arrivalDateIsAfterDepartureDate = true;
        }
      }
    }

    return arrivalDateIsAfterDepartureDate;
  }

  private checkIfDateIsAvailable(): boolean {
    return true;
  }

  private getArrivalAndDepartureDate() {
    let routerData = history.state.data;
    this.arrivalDate = routerData?.arrivalDate;
    this.departureDate = routerData?.departureDate;
  }

  ngOnDestroy(): void {
    this.authSubscription.unsubscribe();
    this.datePickerLoading$.unsubscribe();
  }

  public checkAvailability() {
    this.dateAvailable = true;
  }

  public onBook(form: NgForm) {
    let reservation: Reservation = {
      id: '',
      userId: this.authService.userId,
      arrivalDate: form.value.arrivalDate,
      departureDate: form.value.departureDate,
      numberOfGuests: form.value.numberOfGuests,
      numberOfVehicles: form.value.numberOfVehicles,
      familyName: form.value.familyName,
      privateVisit: form.value.privateVisit,
      plansForFood: form.value.plansForFood,
      additionalInfo: form.value.additionalInfo,
    };

    this.reservationsService.addNewReservation(reservation);
    this.router.navigate(['reservation-booked-page']);
  }
}
