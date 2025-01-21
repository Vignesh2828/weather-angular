import { Routes } from '@angular/router';
import { WeatherComponent } from './weather/weather.component';

export const routes: Routes = [
    {path : 'weather-app', component:WeatherComponent},
    {path : '', redirectTo : 'weather-app', pathMatch : 'full'}
];
