import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import * as moment from 'moment';
import { environment } from 'src/environments/environment';
import { AnimationKeys } from 'src/app/types/animation-keys';
import { WeatherCondition } from 'src/app/types/weather-conditions';
const currentWeatherApiKEy: string = environment.weather.currentWeatherApiKEy;

@Injectable({
  providedIn: 'root',
})
export class WeatherService {
  private stGeorgeLat = 37.0965;
  private stGeorgeLong = -113.5684;

  public dayWeatherConditionsMap: Map<WeatherCondition, AnimationKeys> =
    new Map([
      ['clear sky', 'clearSkyAnimation'],
      ['overcast clouds', 'cloudAnimation'],
      ['few clouds', 'fewCloudsAnimation'],
      ['scattered clouds', 'fewCloudsAnimation'],
      ['broken clouds', 'fewCloudsAnimation'],
      ['shower rain', 'rainAnimation'],
      ['rain', 'rainAnimation'],
      ['thunderstorms', 'stormAnimation'],
      ['snow', 'snowAnimation'],
      ['mist', 'mistAnimation'],
    ]);

  public nightWeatherConditionsMap: Map<WeatherCondition, AnimationKeys> =
    new Map([
      ['clear sky', 'nightClearSkyAnimation'],
      ['overcast clouds', 'cloudAnimation'],
      ['few clouds', 'nightFewCloudsAnimation'],
      ['scattered clouds', 'nightFewCloudsAnimation'],
      ['broken clouds', 'nightFewCloudsAnimation'],
      ['shower rain', 'rainAnimation'],
      ['rain', 'rainAnimation'],
      ['thunderstorms', 'stormAnimation'],
      ['snow', 'snowAnimation'],
      ['mist', 'mistAnimation'],
    ]);

  constructor(private http: HttpClient) {}

  public getCurrentWeather() {
    return this.http.get(
      `${environment.weather.currentWeatherApiUrl}/weather?lat=${this.stGeorgeLat}&lon=${this.stGeorgeLong}&units=imperial&appid=${currentWeatherApiKEy}`
    );
  }

  public getWeatherAnimation(
    description: WeatherCondition,
    dayIcon: boolean
  ): AnimationKeys | undefined {
    let animationKey: AnimationKeys | undefined;
    if (dayIcon) {
      animationKey = this.dayWeatherConditionsMap.get(description);
    } else {
      animationKey = this.nightWeatherConditionsMap.get(description);
    }
    if (!animationKey) {
      return 'cloudAnimation';
    }
    return animationKey;
  }

  public get5DayForecast() {
    return this.http.get(
      `${environment.weather.currentWeatherApiUrl}/forecast?lat=${this.stGeorgeLat}&lon=${this.stGeorgeLong}&units=imperial&appid=${currentWeatherApiKEy}`
    );
  }

  public checkIfDayIcon(iconName: string): boolean {
    if (iconName.includes('d')) {
      return true;
    }
    return false;
  }
}
