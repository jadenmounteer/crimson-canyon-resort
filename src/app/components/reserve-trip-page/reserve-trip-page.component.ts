import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { Subscription } from 'rxjs';
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

  constructor(titleService: Title, private authService: AuthService) {
    titleService.setTitle('Crimson Canyon Resort | Reserve Trip');
  }

  ngOnInit(): void {
    this.contentLoaded = true;

    this.authSubscription = this.authService.authChange.subscribe(
      (authStatus) => {
        this.isAuth = authStatus;
      }
    );
  }

  ngOnDestroy(): void {
    this.authSubscription.unsubscribe();
  }
}
