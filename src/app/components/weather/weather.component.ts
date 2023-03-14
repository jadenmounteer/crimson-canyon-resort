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
  high: string;
  low: string;
  icon: string;
  iconUrl: string;
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
    high: '',
    low: '',
    icon: '',
    iconUrl: '',
  };

  public futureDays: Array<futureWeather> = [];

  public currentWeatherLoaded: boolean = false;

  constructor(private weatherService: WeatherService) {}

  ngOnInit(): void {
    this.weatherService.getCurrentWeather().subscribe((data) => {
      console.log(data);
      this.currentWeatherData = data;
      this.currentWeather.description =
        this.currentWeatherData.weather[0].description;
      this.currentWeather.temperature = this.currentWeatherData.main.temp;

      this.currentWeather.high = this.currentWeatherData.main.temp_max;
      this.currentWeather.low = this.currentWeatherData.main.temp_min;

      const currentWeatherIcon = this.currentWeatherData.weather[0].icon;

      this.currentWeather.iconUrl = this.buildIconUrl(currentWeatherIcon);

      // Convert the unix timestamp to a javascript date
      this.currentWeather.date = new Date(this.currentWeatherData.dt * 1000);

      // Check if day or night
      const dayIcon: boolean = this.checkIfDayIcon(currentWeatherIcon);

      this.currentWeather.animation = this.weatherService.getWeatherAnimation(
        this.currentWeather.description,
        dayIcon
      );

      this.currentWeatherLoaded = true;
    });

    this.weatherService.get5DayForecast().subscribe((data: any) => {
      // Separate the data into days
      this.organizeForecastData(data.list);
    });
  }

  private checkIfDayIcon(iconName: string): boolean {
    if (iconName.includes('d')) {
      return true;
    }
    return false;
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

      day.iconUrl = this.buildIconUrl(day.icon);

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

  private buildIconUrl(icon: string): string {
    // Icon url grabbed from here: https://openweathermap.org/weather-conditions
    return `https://openweathermap.org/img/wn/${icon}@2x.png`;
  }
}
