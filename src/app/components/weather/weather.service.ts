import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import * as moment from 'moment';
import { environment } from 'src/environments/environment';
const currentWeatherApiKEy: string = environment.weather.currentWeatherApiKEy;

@Injectable({
  providedIn: 'root',
})
export class WeatherService {
  constructor(private http: HttpClient) {}

  public getCurrentWeather(loc: string) {
    return this.http.get(
      `${environment.weather.currentWeatherApiUrl}/weather?q=${loc}&appid=${currentWeatherApiKEy}`
    );
  }
}
