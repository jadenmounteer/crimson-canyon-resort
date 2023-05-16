import { Component, Input, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { NgForm } from '@angular/forms';
import { IconService } from 'src/app/services/icon.service';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthorizedEmailsService } from 'src/app/services/authorized-emails.service';
import { AccessRequest } from 'src/app/types/access-request';

@Component({
  selector: 'app-login-or-sign-up',
  templateUrl: './login-or-sign-up.component.html',
  styleUrls: ['./login-or-sign-up.component.scss'],
})
export class LoginOrSignUpComponent implements OnInit {
  @Input() newUser: boolean = false;
  protected displayBadEmailMsg: boolean = false;
  protected emailExistsMessage: string = '';
  protected requests: Array<AccessRequest> = [];
  protected contentLoaded: boolean = false;

  constructor(
    private authService: AuthService,
    public icon: IconService,
    private route: ActivatedRoute,
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
    this.authService.login({
      email: form.value.email,
      password: form.value.password,
    });
  }

  private validateEmailForSignUp(email: string): boolean {
    const validEmail = this.authorizedEmailService.checkIfValidEmail(email);

    if (!validEmail) {
      this.displayBadEmailMsg = true;
      return false;
    }

    this.emailExistsMessage = this.authorizedEmailService.checkIfRequestExists(
      email,
      this.requests
    );

    if (this.emailExistsMessage === '') {
      return true;
    }

    return false;
  }

  public onSignUp(form: NgForm) {
    if (this.validateEmailForSignUp(form.value.email)) {
      this.authService.registerUser({
        email: form.value.email,
        password: form.value.password,
      });
    }
  }

  public onOathSignIn() {
    this.authService.googleSignin();
  }

  public switchToLoginOrSignUp() {
    this.newUser = !this.newUser;
  }

  protected navigateToRequestAccessPage() {
    this.router.navigate(['request-to-create-account-page']);
  }
}
