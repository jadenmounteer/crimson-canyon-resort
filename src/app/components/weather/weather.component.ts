import { Component, OnInit } from '@angular/core';
import { WeatherService } from './weather.service';
import { AnimationKeys } from 'src/app/types/animation-keys';
import { WeatherCondition } from 'src/app/types/weather-conditions';
import * as moment from 'moment';

interface CurrentWeather {
  description: WeatherCondition;
  feelsLike: string;
  temperature: string;
  high: string;
  low: string;
  animation: AnimationKeys | undefined;
}

interface futureWeather {
  date: string;
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
    date: '',
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
      let days = this.organizeForecastData(data.list);
    });
  }

  private organizeForecastData(listOfData: any): Array<any> {
    let days: futureWeather[] = [];

    // First, we grab a list of all of the dates
    let listOfDates: string[] = this.grabListOfDates(listOfData);

    // Foreach date
    for (let i = 0; i < listOfDates.length; i++) {
      let day: futureWeather = (days[i] = {
        date: listOfDates[i],
        high: '',
        low: '',
        icon: '',
      });

      let date = listOfDates[i];

      // Get the increments per day
      let incrementsPerDay: any = this.getIncrementsPerDay(date, listOfData);

      // Grab the highest temperature for each day
      day = this.getDataPerDay(date, incrementsPerDay);
      console.log(day);
    }

    return days;
  }

  private grabListOfDates(listOfData: any): Array<string> {
    let listOfDates: string[] = [];

    // Get today's date because we don't want to show today's information
    let todaysDate = Date.now();
    let todaysFormattedDate = moment(todaysDate).format('YYYY-MM-DD');

    for (let i = 0; i < listOfData.length; i++) {
      let dateString = listOfData[i].dt_txt.slice(0, 10);

      if (
        !listOfDates.includes(dateString) &&
        dateString != todaysFormattedDate
      ) {
        listOfDates.push(dateString);
      }
    }

    return listOfDates;
  }

  private getDataPerDay(date: string, incrementsPerDay: any): futureWeather {
    let futureWeather: futureWeather = {
      date: date,
      high: '',
      low: '',
      icon: '',
    };

    // Loop through the increments for that day and find the data we want for the future weather
    let listOfHighs: number[] = [];
    let listOfLows: number[] = [];
    incrementsPerDay.forEach((increment: any) => {
      // If the time is noon, grab the icon
      if (increment.dt_txt.includes('12:00:00')) {
        futureWeather.icon = increment.weather[0].icon;
      }

      let incrementHigh = Number(increment.main.temp_max);
      if (!listOfHighs.includes(incrementHigh)) {
        listOfHighs.push(incrementHigh);
      }

      let incrementLow = Number(increment.main.temp_min);
      if (!listOfLows.includes(incrementLow)) {
        listOfLows.push(incrementLow);
      }
    });

    // Now that we have the list of highs and lows, find the highest high
    futureWeather.high = String(Math.max(...listOfHighs));

    // Find the lowest low
    futureWeather.low = String(Math.max(...listOfLows));

    return futureWeather;
  }

  private getIncrementsPerDay(date: string, listOfData: any) {
    let listOfIncremenets: any = [];

    listOfData.forEach((increment: any) => {
      if (increment.dt_txt.includes(date)) {
        listOfIncremenets.push(increment);
      }
    });
    return listOfIncremenets;
  }
}
