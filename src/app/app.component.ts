import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { AuthService } from './components/auth/auth.service';
import { PromptUpdateService } from './services/prompt-update.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  title = 'crimson-canyon-resort';
  private authSubscription!: Subscription;
  public isAuth: boolean = false;

  constructor(
    private authService: AuthService,
    updateService: PromptUpdateService // This is necessary so the code in its constructor runs.
  ) {}

  ngOnInit(): void {
    this.authService.iniAuthListener();
  }
}
