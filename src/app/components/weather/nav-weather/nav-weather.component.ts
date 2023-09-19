import { Component, OnInit } from '@angular/core';
import { IconService } from 'src/app/services/icon.service';
import { WeatherService } from '../weather.service';

@Component({
  selector: 'app-nav-weather',
  templateUrl: './nav-weather.component.html',
  styleUrls: ['./nav-weather.component.scss'],
})
export class NavWeatherComponent implements OnInit {
  public currentWeatherData: any;
  weatherIcon: string = 'faSun';
  currentTemperature: string = '0';

  constructor(
    public icon: IconService,
    private weatherService: WeatherService
  ) {}

  ngOnInit(): void {
    this.weatherService.getCurrentWeather().subscribe((data) => {
      this.currentWeatherData = data;
      this.currentTemperature = this.currentWeatherData.main.temp;
    });
  }
}
