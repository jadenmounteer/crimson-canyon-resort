import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import * as moment from 'moment';
import { environment } from 'src/environments/environment';
const currentWeatherApiKEy: string = environment.weather.currentWeatherApiKEy;

@Injectable({
  providedIn: 'root',
})
export class WeatherService {
  private stGeorgeLat = 37.0965;
  private stGeorgeLong = 113.5684;

  constructor(private http: HttpClient) {}

  public getCurrentWeather() {
    return this.http.get(
      `${environment.weather.currentWeatherApiUrl}/weather?lat=${this.stGeorgeLat}&lon=${this.stGeorgeLong}&appid=${currentWeatherApiKEy}`
    );
  }
}
