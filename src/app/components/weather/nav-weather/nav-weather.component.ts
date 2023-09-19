import { Component, OnInit } from '@angular/core';
import { IconService } from 'src/app/services/icon.service';

@Component({
  selector: 'app-nav-weather',
  templateUrl: './nav-weather.component.html',
  styleUrls: ['./nav-weather.component.scss'],
})
export class NavWeatherComponent implements OnInit {
  weatherIcon: string = 'faSun';

  constructor(public icon: IconService) {}

  ngOnInit(): void {}
}
