import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { NgbDate, NgbDateStruct } from '@ng-bootstrap/ng-bootstrap';
import { DatePickerService } from 'src/app/services/date-picker.service';
import { IconService } from 'src/app/services/icon.service';

@Component({
  selector: 'app-check-availability-menu',
  templateUrl: './check-availability-menu.component.html',
  styleUrls: ['./check-availability-menu.component.scss'],
})
export class CheckAvailabilityMenuComponent {
  protected todaysDate!: NgbDate;

  constructor(
    public icon: IconService,
    private router: Router,
    private datePickerService: DatePickerService
  ) {
    this.todaysDate = this.datePickerService.getTodaysDate();
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
