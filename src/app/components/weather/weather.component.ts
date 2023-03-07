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

interface futureWeather {
  high: string;
  low: string;
  icon: string;
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

  public dayOneWeather: futureWeather = {
    high: '',
    low: '',
    icon: '',
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

    this.weatherService.get5DayForecast().subscribe((data: any) => {
      // Separate the data into days
      let days = this.organizeDataIntoDays(data.list);

      // Grab the highest temperature for each day

      // Grab the lowest temperature for each day

      // Grab the icon for each day
    });
  }

  private organizeDataIntoDays(listOfData: any): Array<any> {
    let days: any[] = [];
    console.log(listOfData);

    // First, we grab a list of all of the dates
    let listOfDates: string[] = this.grabListOfDates(listOfData);
    console.log(listOfDates);

    for (let i = 0; i < listOfData.length; i++) {}

    let counter = 0;

    while (counter < listOfData.length) {
      counter++;
    }

    return days;
  }

  private grabListOfDates(listOfData: any): Array<string> {
    let listOfDates: string[] = [];

    for (let i = 0; i < listOfData.length; i++) {
      let dateString = listOfData[i].dt_txt.slice(0, 10);

      if (!listOfDates.includes(dateString)) {
        listOfDates.push(dateString);
      }
    }

    return listOfDates;
  }
}
