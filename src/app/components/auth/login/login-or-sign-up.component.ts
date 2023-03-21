import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { NgForm } from '@angular/forms';
import { IconService } from 'src/app/services/icon.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-login-or-sign-up',
  templateUrl: './login-or-sign-up.component.html',
  styleUrls: ['./login-or-sign-up.component.scss'],
})
export class LoginOrSignUpComponent implements OnInit {
  public newUser: boolean = true;

  constructor(
    private authService: AuthService,
    public icon: IconService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe((params) => {
      let newUser: string | null = params.get('newUser');
      if (newUser === 'false') {
        this.newUser = false;
      }
    });
  }

  public onLogin(form: NgForm) {
    this.authService.login({
      email: form.value.email,
      password: form.value.password,
    });
  }

  public onSignUp(form: NgForm) {
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
}
