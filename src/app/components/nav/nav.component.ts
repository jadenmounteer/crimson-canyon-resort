import { Component, OnInit, OnDestroy } from '@angular/core';
import { IconService } from 'src/app/services/icon.service';
import { AuthService } from '../auth/auth.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.scss'],
})
export class NavComponent implements OnInit, OnDestroy {
  public isAuth: boolean = false;
  private authSubscription!: Subscription;

  protected isMenuCollapsed: boolean = true;

  constructor(public icon: IconService, public authService: AuthService) {}

  ngOnInit(): void {
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
}
