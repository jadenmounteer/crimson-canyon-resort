import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { AuthService } from './components/auth/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  title = 'crimson-canyon-resort';
  private authSubscription!: Subscription;
  public isAuth: boolean = false;

  constructor(private authService: AuthService) {}

  ngOnInit(): void {
    this.authService.iniAuthListener();
  }
}
