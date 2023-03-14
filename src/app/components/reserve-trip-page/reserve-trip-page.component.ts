import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Title } from '@angular/platform-browser';
import { Subscription } from 'rxjs';
import { IconService } from 'src/app/services/icon.service';
import { AuthService } from '../auth/auth.service';
import { NgbAlertModule } from '@ng-bootstrap/ng-bootstrap';

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
  public dateAvailable!: boolean | undefined;

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
    if (this.authService.isAuthenticated) {
      this.isAuth = true;
    } else {
      this.isAuth = false;
    }

    this.getArrivalAndDepartureDate();
    setTimeout(() => {
      this.contentLoaded = true;
    }, 1000);

    if (this.arrivalDate && this.departureDate) {
      // TODO check if the date is available here
      this.dateAvailable = true;
    }
  }

  private getArrivalAndDepartureDate() {
    let routerData = history.state.data;
    this.arrivalDate = routerData?.arrivalDate;
    this.departureDate = routerData?.departureDate;
  }

  ngOnDestroy(): void {
    this.authSubscription.unsubscribe();
  }

  public onBook(form: NgForm) {
    this.dateAvailable = true;
    console.log(form);
  }
}
