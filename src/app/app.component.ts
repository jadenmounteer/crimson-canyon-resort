import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { AuthService } from './components/auth/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit, OnDestroy {
  title = 'crimson-canyon-resort';
  private authSubscription!: Subscription;
  public isAuth: boolean = false;

  constructor(private authService: AuthService) {}

  ngOnInit(): void {
    this.authService.iniAuthListener();

    this.authSubscription = this.authService.authChange.subscribe(
      (authStatus) => {
        console.log(`auth status: ${authStatus}`);

        this.isAuth = authStatus;
      }
    );
  }

  ngOnDestroy(): void {
    this.authSubscription.unsubscribe();
  }

  public onOutletLoaded(component: { isAuth: boolean }) {
    component.isAuth = this.isAuth;
  }
}
