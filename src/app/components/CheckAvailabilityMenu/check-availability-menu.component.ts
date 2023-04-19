import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { IconService } from 'src/app/services/icon.service';

@Component({
  selector: 'app-check-availability-menu',
  templateUrl: './check-availability-menu.component.html',
  styleUrls: ['./check-availability-menu.component.scss'],
})
export class CheckAvailabilityMenu implements OnInit {
  constructor(public icon: IconService, private router: Router) {}

  ngOnInit(): void {}

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
