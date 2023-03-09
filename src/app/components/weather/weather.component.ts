import { Component, OnInit } from '@angular/core';
import { WeatherService } from './weather.service';
import { AnimationKeys } from 'src/app/types/animation-keys';
import { WeatherCondition } from 'src/app/types/weather-conditions';
import * as moment from 'moment';

interface CurrentWeather {
  description: WeatherCondition;
  temperature: string;
  animation: AnimationKeys | undefined;
  date: Date | undefined;
}

interface futureWeather {
  dateString: string;
  high: string;
  low: string;
  icon: string;
  iconUrl: string;
  date: Date | undefined;
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

    temperature: '',
    animation: 'cloudAnimation',
    date: undefined,
  };

  public futureDays: Array<futureWeather> = [];

  public currentWeatherLoaded: boolean = false;

  constructor(private weatherService: WeatherService) {}

  ngOnInit(): void {
    this.weatherService.getCurrentWeather().subscribe((data) => {
      this.currentWeatherData = data;
      this.currentWeather.description =
        this.currentWeatherData.weather[0].description;
      this.currentWeather.temperature = this.currentWeatherData.main.temp;
      this.currentWeather.animation = this.weatherService.getWeatherAnimation(
        this.currentWeather.description
      );
      // We add a day's worth of milliseconds to the date, because for whatever reason Angular's
      // datepipe displays this date as yesterday.
      this.currentWeather.date = this.currentWeatherData.dt + 86400000;

      this.currentWeatherLoaded = true;
    });

    this.weatherService.get5DayForecast().subscribe((data: any) => {
      console.log(data);
      // Separate the data into days
      this.organizeForecastData(data.list);
    });
  }

  private organizeForecastData(listOfData: any) {
    let days: futureWeather[] = [];

    // First, we grab a list of all of the dates
    let listOfDates: string[] = this.grabListOfDates(listOfData);

    // Foreach date
    for (let i = 0; i < listOfDates.length; i++) {
      let day: futureWeather = (days[i] = {
        dateString: listOfDates[i],
        high: '',
        low: '',
        icon: '',
        iconUrl: '',
        date: undefined,
      });

      let date = listOfDates[i];

      // Get the increments per day
      let incrementsPerDay: any = this.getIncrementsPerDay(date, listOfData);

      // Grab the highest temperature for each day
      day = this.getDataPerDay(date, incrementsPerDay);

      day.iconUrl = this.buildDaysIconUrl(day);

      // Convert the date to a day of week
      day.date = this.getDate(day);

      this.futureDays.push(day);
    }
  }

  private getDate(day: futureWeather): Date {
    let dateObject = new Date(day.dateString);

    return dateObject;
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

  private getDataPerDay(date: string, incrementsPerDay: any): futureWeather {
    let futureWeather: futureWeather = {
      dateString: date,
      high: '',
      low: '',
      icon: '',
      iconUrl: '',
      date: undefined,
    };

    // Loop through the increments for that day and find the data we want for the future weather
    let listOfHighs: number[] = [];
    let listOfLows: number[] = [];
    incrementsPerDay.forEach((increment: any) => {
      let incrementHigh = Number(increment.main.temp_max);
      if (!listOfHighs.includes(incrementHigh)) {
        // We grab the icon of the high
        futureWeather.icon = increment.weather[0].icon;

        listOfHighs.push(incrementHigh);
      }

      let incrementLow = Number(increment.main.temp_min);
      if (!listOfLows.includes(incrementLow)) {
        listOfLows.push(incrementLow);
      }
    });
    console.log(listOfLows);

    // Now that we have the list of highs and lows, find the highest high
    futureWeather.high = String(Math.max(...listOfHighs));

    // Find the lowest low
    futureWeather.low = String(Math.min(...listOfLows));

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

  private buildDaysIconUrl(day: futureWeather): string {
    // Icon url grabbed from here: https://openweathermap.org/weather-conditions
    return `https://openweathermap.org/img/wn/${day.icon}@2x.png`;
  }
}
