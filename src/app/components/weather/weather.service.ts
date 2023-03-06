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

  public weatherConditionsMap: Map<WeatherCondition, AnimationKeys> = new Map([
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

  constructor(private http: HttpClient) {}

  public getCurrentWeather() {
    return this.http.get(
      `${environment.weather.currentWeatherApiUrl}/weather?lat=${this.stGeorgeLat}&lon=${this.stGeorgeLong}&units=imperial&appid=${currentWeatherApiKEy}`
    );
  }

  public getWeatherAnimation(
    description: WeatherCondition
  ): AnimationKeys | undefined {
    let animationKey = this.weatherConditionsMap.get(description);
    if (!animationKey) {
      return 'cloudAnimation';
    }
    return animationKey;
  }
}
