import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { ApiWeatherService } from '../api-weather.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-weather',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './weather.component.html',
  styleUrl: './weather.component.css'
})

export class WeatherComponent implements OnInit {

  public weatherSearchForm!: FormGroup;
  public weatherData: any;
  public apiLimitReached!: string;
  public isPayPalSelected: boolean = false;
  public isLoading: boolean = false;
  public isFundPartVisible: boolean = false; // Control visibility of the fund part

  constructor(
    private formBuilder: FormBuilder,
    private apiService: ApiWeatherService
  ) {}

  ngOnInit(): void {
    this.weatherSearchForm = this.formBuilder.group({
      location: ['']
    });
  }

  sendToApiService(formValues: any) {
    this.isLoading = true; // Start loading
    this.apiService.getWeather(formValues.location).subscribe(data => {
      this.isLoading = false; // Stop loading
      if (data && data.error && data.error.code === 104) {
        this.apiLimitReached = data.error.info;
      } else if (data && data.current) {
        this.weatherData = data;
      } else {
        this.weatherData = null;
        this.apiLimitReached = 'An error occurred. Please try again later.';
      }
    }, (error) => {
      this.isLoading = false; // Stop loading
      this.weatherData = null;
      this.apiLimitReached = 'Unable to fetch weather data. Please check your network connection.';
    });
  }

  togglePaymentMethod(): void {
    this.isPayPalSelected = !this.isPayPalSelected;
  }

  toggleFundPart(): void {
    this.isFundPartVisible = !this.isFundPartVisible; 
  }
}
