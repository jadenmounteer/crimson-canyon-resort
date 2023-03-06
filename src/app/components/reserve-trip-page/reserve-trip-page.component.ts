import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Title } from '@angular/platform-browser';
import { Subscription } from 'rxjs';
import { IconService } from 'src/app/services/icon.service';
import { AuthService } from '../auth/auth.service';

@Component({
  selector: 'app-reserve-trip-page',
  templateUrl: './reserve-trip-page.component.html',
  styleUrls: ['./reserve-trip-page.component.scss'],
})
export class ReserveTripPageComponent implements OnInit, OnDestroy {
  public contentLoaded: boolean = false;
  public isAuth: boolean = false;
  private authSubscription!: Subscription;
  public arrivalDate: Date | undefined;
  public departureDate: Date | undefined;

  constructor(
    titleService: Title,
    private authService: AuthService,
    public icon: IconService
  ) {
    titleService.setTitle('Crimson Canyon Resort | Reserve Trip');
  }

  ngOnInit(): void {
    this.authSubscription = this.authService.authChange.subscribe(
      (authStatus) => {
        this.isAuth = authStatus;
      }
    );

    this.getArrivalAndDepartureDate();
    setTimeout(() => {
      this.contentLoaded = true;
    }, 1000);
  }

  private getArrivalAndDepartureDate() {
    let routerData = history.state.data;
    this.arrivalDate = routerData?.arrivalDate;
    this.departureDate = routerData?.departureDate;
  }

  ngOnDestroy(): void {
    this.authSubscription.unsubscribe();
  }

  public onBook(form: NgForm) {}
}
