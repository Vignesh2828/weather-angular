import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class ApiWeatherService {

  // API_KEY = "814b1cc6f53ac582f374a2e1e342c786"
  API_KEY = "ee6aa9ab43cb54a528505cca2d241355"
  API_BASE_URL = "https://api.weatherstack.com/current"

  constructor(private http: HttpClient) { }

  getWeather(location: string): Observable<any> {
    return this.http.get<any>(`${this.API_BASE_URL}?access_key=${this.API_KEY}&query=${location}`)
  }
}
