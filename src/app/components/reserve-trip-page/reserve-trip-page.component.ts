import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-reserve-trip-page',
  templateUrl: './reserve-trip-page.component.html',
  styleUrls: ['./reserve-trip-page.component.scss'],
})
export class ReserveTripPageComponent implements OnInit {
  public contentLoaded: boolean = false;
  constructor(titleService: Title) {
    titleService.setTitle('Crimson Canyon Resort | Reserve Trip');
  }

  ngOnInit(): void {
    this.contentLoaded = true;
  }
}
