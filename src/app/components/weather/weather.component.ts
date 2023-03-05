import { Component, OnInit } from '@angular/core';
import { WeatherService } from './weather.service';

interface CurrentWeather {
  description: string;
  feelsLike: string;
  temperature: string;
  high: string;
  low: string;
  animation: string;
}

@Component({
  selector: 'app-weather',
  templateUrl: './weather.component.html',
  styleUrls: ['./weather.component.scss'],
})
export class WeatherComponent implements OnInit {
  public currentWeatherData: any;
  public currentWeather: CurrentWeather = {
    description: '',
    feelsLike: '',
    temperature: '',
    high: '',
    low: '',
    animation: '',
  };
  public currentWeatherLoaded: boolean = false;

  constructor(private weatherService: WeatherService) {}

  ngOnInit(): void {
    this.weatherService.getCurrentWeather().subscribe((data) => {
      console.log(data);
      this.currentWeatherData = data;
      this.currentWeather.description =
        this.currentWeatherData.weather[0].description;
      console.log(this.currentWeather.description);
      this.currentWeather.feelsLike = this.currentWeatherData.main.feels_like;
      this.currentWeather.temperature = this.currentWeatherData.main.temp;
      this.currentWeather.high = this.currentWeatherData.main.temp_max;
      this.currentWeather.low = this.currentWeatherData.main.temp_min;

      this.currentWeatherLoaded = true;
    });
  }
}
