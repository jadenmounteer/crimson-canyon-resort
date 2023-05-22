import { Component, OnDestroy, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { Subscription } from 'rxjs';
import { AuthService } from '../auth/auth.service';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.scss'],
})
export class HomePageComponent implements OnInit, OnDestroy {
  public isAuth: boolean = false;
  public contentLoaded: boolean = false;
  private authSubscription!: Subscription;
  constructor(titleService: Title, protected authService: AuthService) {
    titleService.setTitle('Crimson Canyon Resort | Home');
  }

  ngOnInit(): void {
    this.setAuthSubscription();
    this.contentLoaded = true;
  }

  private setAuthSubscription(): void {
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
  }

  ngOnDestroy(): void {
    this.authSubscription.unsubscribe();
  }
}
