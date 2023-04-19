import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { IconService } from 'src/app/services/icon.service';
import { AuthService } from '../auth/auth.service';
import { AdministrationService } from 'src/app/services/administration.service';
@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.scss'],
})
export class NavComponent implements OnInit, OnDestroy {
  public isAuth: boolean = false;
  private authSubscription!: Subscription;
  protected currentUserIsAdmin$!: Observable<boolean>;

  protected isMenuCollapsed: boolean = true;

  constructor(
    public icon: IconService,
    public authService: AuthService,
    private administrationService: AdministrationService
  ) {}

  ngOnInit(): void {
    this.authSubscription = this.authService.authChange.subscribe(
      (authStatus) => {
        this.isAuth = authStatus;
        this.grabCurrentUserAdminStatus();
      }
    );
  }

  private grabCurrentUserAdminStatus() {
    console.log('Grabbing current admin status');
    console.log(`is auth: ${this.isAuth} user id: ${this.authService.userId}`);
    if (this.isAuth && this.authService.userId) {
      console.log('Looks like the user is auth and has a user id');
      this.currentUserIsAdmin$ = this.administrationService.checkIfUserIsAdmin(
        this.authService.userId
      );
    }
  }

  ngOnDestroy(): void {
    this.authSubscription.unsubscribe();
  }
}
