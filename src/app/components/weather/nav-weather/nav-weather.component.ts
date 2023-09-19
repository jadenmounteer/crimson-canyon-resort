import { Component, OnInit } from '@angular/core';
import { IconService } from 'src/app/services/icon.service';
import { WeatherService } from '../weather.service';

@Component({
  selector: 'app-nav-weather',
  templateUrl: './nav-weather.component.html',
  styleUrls: ['./nav-weather.component.scss'],
})
export class NavWeatherComponent implements OnInit {
  private currentWeatherData: any;
  protected weatherIcon: string = 'faSun';
  protected currentTemperature: string = '0';

  private iconMap: Map<string, string> = new Map([
    ['01d', 'faSun'],
    ['01n', 'faMoon'],
    ['02d', 'faCloud'],
    ['02n', 'faCloud'],
    ['03d', 'faCloud'],
    ['03n', 'faCloud'],
    ['04d', 'faCloud'],
    ['04n', 'faCloud'],
    ['09d', 'faUmbrella'],
    ['09n', 'faUmbrella'],
    ['10d', 'faUmbrella'],
    ['10n', 'faUmbrella'],
    ['11d', 'faUmbrella'],
    ['11n', 'faUmbrella'],
    ['13d', 'faSnowman'],
    ['13n', 'faSnowman'],
    ['50d', 'faCloud'],
    ['50n', 'faCloud'],
  ]);

  constructor(
    public icon: IconService,
    private weatherService: WeatherService
  ) {}

  ngOnInit(): void {
    this.weatherService.getCurrentWeather().subscribe((data) => {
      this.currentWeatherData = data;
      this.currentTemperature = this.currentWeatherData.main.temp;
      const currentWeatherIcon = this.currentWeatherData.weather[0].icon;

      const dayTime: boolean =
        this.weatherService.checkIfDayIcon(currentWeatherIcon);

      this.weatherIcon = this.iconMap.get(currentWeatherIcon) || 'faSun';
    });
  }
}
