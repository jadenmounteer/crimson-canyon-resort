import { Component } from '@angular/core';

@Component({
  selector: 'app-countdown-to-instagram-token-refresh',
  templateUrl: './countdown-to-instagram-token-refresh.component.html',
  styleUrls: ['./countdown-to-instagram-token-refresh.component.scss'],
})
export class CountdownToInstagramTokenRefreshComponent {
  protected dateOfLastRefresh = new Date('2023-09-23T00:00:00');
  private todaysDate = new Date();
  protected daysUntilTokenExpires: number =
    this.getDaysUntilTokenExpiresFromDateOfLastRefresh(5184000);

  constructor() {}

  private getDaysUntilTokenExpiresFromDateOfLastRefresh(
    secondsUntilTokenExpires: number
  ): number {
    const secondsInADay = 86400;
    const daysUntilTokenExpires =
      (secondsUntilTokenExpires -
        (this.todaysDate.getTime() - this.dateOfLastRefresh.getTime()) / 1000) /
      secondsInADay;
    return Math.round(daysUntilTokenExpires);
  }
}
