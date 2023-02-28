import { Component, OnInit } from '@angular/core';
import { WeatherService } from './weather.service';

@Component({
  selector: 'app-weather',
  templateUrl: './weather.component.html',
  styleUrls: ['./weather.component.scss'],
})
export class WeatherComponent implements OnInit {
  public currentWeatherData: any;
  public currentWeatherDescription!: string;
  public currentWeatherFeelsLike!: string;
  public currentWeatherTemperature!: string;
  public currentWeatherHigh!: string;
  public currentWeatherLow!: string;

  constructor(private weatherService: WeatherService) {}

  ngOnInit(): void {
    this.weatherService.getCurrentWeather().subscribe((data) => {
      console.log(data);
      this.currentWeatherData = data;
      this.currentWeatherDescription =
        this.currentWeatherData.weather[0].description;
      this.currentWeatherFeelsLike = this.currentWeatherData.main.feels_like;
      this.currentWeatherTemperature = this.currentWeatherData.main.temp;
      this.currentWeatherHigh = this.currentWeatherData.main.temp_max;
      this.currentWeatherLow = this.currentWeatherData.main.temp_min;
    });
  }
}
