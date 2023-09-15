import { Component, OnDestroy } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { NgbDate } from '@ng-bootstrap/ng-bootstrap';
import { Subscription } from 'rxjs';
import { DatePickerService } from 'src/app/services/date-picker.service';
import { IconService } from 'src/app/services/icon.service';

@Component({
  selector: 'app-check-availability-menu',
  templateUrl: './check-availability-menu.component.html',
  styleUrls: ['./check-availability-menu.component.scss'],
})
export class CheckAvailabilityMenuComponent implements OnDestroy {
  protected todaysDate!: NgbDate;
  protected loading: boolean = true;
  public datePickerLoading$: Subscription;

  constructor(
    public icon: IconService,
    private router: Router,
    protected datePickerService: DatePickerService
  ) {
    this.todaysDate = this.datePickerService.getTodaysDate();
    this.datePickerLoading$ =
      this.datePickerService.datePickerLoading$.subscribe((loading) => {
        this.loading = loading;
      });
  }
  ngOnDestroy(): void {
    this.datePickerLoading$.unsubscribe();
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
}
