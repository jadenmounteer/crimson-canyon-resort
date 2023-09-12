import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { NgbDate } from '@ng-bootstrap/ng-bootstrap';
import { IconService } from 'src/app/services/icon.service';

@Component({
  selector: 'app-check-availability-menu',
  templateUrl: './check-availability-menu.component.html',
  styleUrls: ['./check-availability-menu.component.scss'],
})
export class CheckAvailabilityMenu implements OnInit {
  protected todaysDate: NgbDate = this.getTodaysDate();
  constructor(public icon: IconService, private router: Router) {}

  ngOnInit(): void {
    console.log(this.getTodaysDate());
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

  private getTodaysDate(): NgbDate {
    const date = new Date();
    return new NgbDate(date.getFullYear(), date.getMonth() + 1, date.getDate());
  }
}
