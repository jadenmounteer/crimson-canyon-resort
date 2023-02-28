import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import * as moment from 'moment';
import { environment } from 'src/environments/environment';
const currentWeatherApiKEy: string = environment.currentWeatherApiKEy;

@Injectable({
  providedIn: 'root',
})
export class WeatherService {
  constructor() {}
}
