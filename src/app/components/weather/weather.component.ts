import { Component, OnInit } from '@angular/core';
import { WeatherService } from './weather.service';
import { AnimationKeys } from 'src/app/types/animation-keys';
import { WeatherCondition } from 'src/app/types/weather-conditions';

interface CurrentWeather {
  description: WeatherCondition;
  feelsLike: string;
  temperature: string;
  high: string;
  low: string;
  animation: AnimationKeys | undefined;
}

@Component({
  selector: 'app-weather',
  templateUrl: './weather.component.html',
  styleUrls: ['./weather.component.scss'],
})
export class WeatherComponent implements OnInit {
  public currentWeatherData: any;
  public currentWeather: CurrentWeather = {
    description: 'few clouds',
    feelsLike: '',
    temperature: '',
    high: '',
    low: '',
    animation: 'cloudAnimation',
  };
  public currentWeatherLoaded: boolean = false;

  constructor(private weatherService: WeatherService) {}

  ngOnInit(): void {
    this.weatherService.getCurrentWeather().subscribe((data) => {
      this.currentWeatherData = data;
      this.currentWeather.description =
        this.currentWeatherData.weather[0].description;
      this.currentWeather.feelsLike = this.currentWeatherData.main.feels_like;
      this.currentWeather.temperature = this.currentWeatherData.main.temp;
      this.currentWeather.high = this.currentWeatherData.main.temp_max;
      this.currentWeather.low = this.currentWeatherData.main.temp_min;
      this.currentWeather.animation = this.weatherService.getWeatherAnimation(
        this.currentWeather.description
      );

      this.currentWeatherLoaded = true;
    });

    this.weatherService.get5DayForecast().subscribe((data) => {
      console.log(data);
    });
  }
}
