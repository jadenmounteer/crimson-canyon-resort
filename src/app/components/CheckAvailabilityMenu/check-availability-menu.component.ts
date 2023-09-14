import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { NgbDate, NgbDateStruct } from '@ng-bootstrap/ng-bootstrap';
import { DatePickerService } from 'src/app/services/date-picker.service';
import { IconService } from 'src/app/services/icon.service';
import { ReservationsService } from 'src/app/services/reservations.service';
import { Reservation } from 'src/app/types/reservation';

@Component({
  selector: 'app-check-availability-menu',
  templateUrl: './check-availability-menu.component.html',
  styleUrls: ['./check-availability-menu.component.scss'],
})
export class CheckAvailabilityMenuComponent implements OnInit {
  protected todaysDate!: NgbDate;
  private reservations: Array<Reservation> = [];
  protected loading: boolean = true;

  constructor(
    public icon: IconService,
    private router: Router,
    private datePickerService: DatePickerService,
    protected reservationsService: ReservationsService
  ) {
    this.todaysDate = this.datePickerService.getTodaysDate();
  }

  public ngOnInit(): void {
    this.reservationsService.allReservationsChanged.subscribe(
      (reservations) => {
        this.reservations = reservations;
        this.loading = false;
      }
    );

    this.reservationsService.fetchAllReservations();
  }

  public onSubmit(form: NgForm) {
    this.router.navigate(['reserve-trip-page'], {
      state: {
        data: {
          departureDate: form.value.departureDate,
          arrivalDate: form.value.arrivalDate,
        },
      },
    });
  }

  isDisabled(date: NgbDateStruct): boolean {
    return date.day === 20;
  }
}
