import { Component, Input, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { NgForm } from '@angular/forms';
import { IconService } from 'src/app/services/icon.service';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthorizedEmailsService } from 'src/app/services/authorized-emails.service';
import { AccessRequest } from 'src/app/types/access-request';
import { catchError, tap, throwError } from 'rxjs';

@Component({
  selector: 'app-login-or-sign-up',
  templateUrl: './login-or-sign-up.component.html',
  styleUrls: ['./login-or-sign-up.component.scss'],
})
export class LoginOrSignUpComponent implements OnInit {
  @Input() newUser: boolean = false;
  @Input() navigateUserAwayOnLogin: boolean = true;
  protected displayBadEmailMsg: boolean = false;
  protected displayEmailPendingApprovalMessage: boolean = false;
  protected displaySubmitRequestMessage: boolean = false;
  protected displayLoggedInMessage: boolean = false;
  protected emailExistsMessage: string = '';
  protected requests: Array<AccessRequest> = [];
  protected contentLoaded: boolean = false;
  protected signInErrorMessage: string = '';
  protected showPassword: boolean = false;

  constructor(
    private authService: AuthService,
    public icon: IconService,
    private router: Router,
    private authorizedEmailService: AuthorizedEmailsService
  ) {
    this.contentLoaded = false;
    this.loadAccessRequests();
  }

  ngOnInit(): void {}

  protected loadAccessRequests(): void {
    this.authorizedEmailService
      .fetchRequests()
      .subscribe((requests) => (this.requests = requests));

    this.contentLoaded = true;
  }

  public onLogin(form: NgForm) {
    this.signInErrorMessage = '';
    if (this.validateEmailForSignInOrUp(form.value.email)) {
      this.authService
        .login({
          email: form.value.email,
          password: form.value.password,
        })
        .pipe(
          catchError((err) => {
            this.signInErrorMessage = err;
            return throwError(err);
          })
        )
        .subscribe(() => {
          this.checkIfNavigateUserAway();
          this.displayLoggedInMessage = true;
        });
    }
  }

  private checkIfNavigateUserAway() {
    if (this.navigateUserAwayOnLogin) {
      this.router.navigate(['']);
      return;
    }
  }

  private validateEmailForSignInOrUp(email: string): boolean {
    const validEmail = this.authorizedEmailService.checkIfValidEmail(email);

    if (!validEmail) {
      this.displayBadEmailMsg = true;
      return false;
    }
    let requestApproved: boolean = false;
    this.requests.forEach((request) => {
      if (request.email === email && request.approved) {
        requestApproved = true;
      }

      if (request.email === email && !request.approved) {
        this.displayEmailPendingApprovalMessage = true;
      }
    });

    if (!requestApproved && !this.displayEmailPendingApprovalMessage) {
      this.displaySubmitRequestMessage = true;
    }

    if (requestApproved) {
      return true;
    }

    return false;
  }

  public async onSignUp(form: NgForm) {
    this.signInErrorMessage = '';
    if (this.validateEmailForSignInOrUp(form.value.email)) {
      this.authService
        .registerUser({
          email: form.value.email,
          password: form.value.password,
        })
        .pipe(
          catchError((err) => {
            this.displaySubmitRequestMessage = false;
            this.signInErrorMessage = err;
            return throwError(err);
          })
        )
        .subscribe((result) => {
          this.authService.createUserData(result.user, form.value.displayName);
          result.user.updateProfile({
            displayName: form.value.displayName,
          });
          this.authService.onSuccessfulAuthentication();
          this.checkIfNavigateUserAway();
          this.displayLoggedInMessage = true;
        });
    }
  }

  public switchToLoginOrSignUp() {
    this.newUser = !this.newUser;
  }

  protected navigateToRequestAccessPage() {
    this.router.navigate(['request-to-create-account-page']);
  }

  protected navigateToForgotPassword() {
    this.router.navigate(['forgot-password']);
  }

  protected toggleShowPassword(): void {
    this.showPassword = !this.showPassword;
  }
}
