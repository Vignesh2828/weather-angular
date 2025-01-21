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

  public apiLimitReached!: string
  public isPayPalSelected: boolean = false;

  constructor ( 
    private formBuilder: FormBuilder,
    private apiService : ApiWeatherService
  ) {}

  ngOnInit(): void {
    this.weatherSearchForm = this.formBuilder.group({
      location : ['']
    })
  }

  sendToApiService(formValues:any) {
    this.apiService.getWeather(formValues.location).subscribe(data => {
     if(!data.success){
      if(data.error.code === 104){
        this.apiLimitReached = data.error.info
      }
     }
      this.weatherData = data;
    })
  }
  togglePaymentMethod(): void {
    this.isPayPalSelected = !this.isPayPalSelected;
  }
}
