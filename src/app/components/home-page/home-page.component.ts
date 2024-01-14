import { Component, OnDestroy, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { Observable, Subscription } from 'rxjs';
import { AuthService } from '../auth/auth.service';
import { AdministrationService } from 'src/app/services/administration.service';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.scss'],
})
export class HomePageComponent implements OnInit, OnDestroy {
  public isAuth: boolean = false;
  public contentLoaded: boolean = false;
  private authSubscription!: Subscription;
  protected currentUserIsAdmin$!: Observable<boolean>;
  constructor(
    titleService: Title,
    protected authService: AuthService,
    private adminService: AdministrationService
  ) {
    titleService.setTitle('Crimson Canyon Resort | Home');
  }

  ngOnInit(): void {
    this.setAuthSubscription();
    this.grabCurrentUserAdminStatus();

    this.contentLoaded = true;
  }

  private grabCurrentUserAdminStatus() {
    if (this.authService.userId) {
      this.currentUserIsAdmin$ = this.adminService.checkIfUserIsAdmin(
        this.authService.userId
      );
    }
  }

  private setAuthSubscription(): void {
    this.authSubscription = this.authService.authChange.subscribe(
      (authStatus) => {
        this.isAuth = authStatus;
        this.grabCurrentUserAdminStatus();
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
