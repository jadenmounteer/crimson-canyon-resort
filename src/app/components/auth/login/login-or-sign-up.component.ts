import { Component, Input, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { NgForm } from '@angular/forms';
import { IconService } from 'src/app/services/icon.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-login-or-sign-up',
  templateUrl: './login-or-sign-up.component.html',
  styleUrls: ['./login-or-sign-up.component.scss'],
})
export class LoginOrSignUpComponent implements OnInit {
  @Input() newUser: boolean = false;

  constructor(
    private authService: AuthService,
    public icon: IconService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {}

  public onLogin(form: NgForm) {
    this.authService.login({
      email: form.value.email,
      password: form.value.password,
    });
  }

  public onSignUp(form: NgForm) {
    // TODO check if the email is authorized

    this.authService.registerUser({
      email: form.value.email,
      password: form.value.password,
    });
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
