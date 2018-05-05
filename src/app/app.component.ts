import { map } from 'rxjs/operators';
import { Component, OnInit, Injectable, ChangeDetectorRef, ChangeDetectionStrategy } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { Http, Response, HttpModule } from '@angular/http';
import 'rxjs/add/operator/map';
import { DirecitonSteps, StepWeather } from './DirecitonSteps.interface.ts';

declare var google;
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
@Injectable()
export class AppComponent implements OnInit {
  constructor(private http: HttpClient, private cd: ChangeDetectorRef) { }
  GOOGLE_API_KEY = 'AIzaSyCysHgzuqehJ6gtu8ARdvkBwCaK-ZIb1r0';
  OPEN_WEATHER_API_KEY = '37bf0e7aaa3f6bb00ab34e0a9503da5f';
  GOOGLE_DIRECTIONS_URL = 'https://maps.googleapis.com/maps/api/directions/json?';
  GOOGLE_GEOLOCATION_URL = 'https://maps.googleapis.com/maps/api/geocode/json?address=';
  OPEN_WEATHER_BASE_URL = 'http://api.openweathermap.org/data/2.5/weather?';
  DISTANCE_VARIABLE = 100;
  o = '';
  d = '';
  title = 'app';
  directionsService = new google.maps.DirectionsService;
  directionSteps: DirecitonSteps[];


  ngOnInit() {
    this.directionSteps = [];
  }

  processGoogleAPIResponse(steps) {
    steps.forEach((step) => {
      this.directionSteps.push(new DirecitonSteps(step.distance.value, step.duration.value, step.end_location.lat(), step.end_location.lng()));
    });
    this.getWeatherData();
    console.log(this.directionSteps);
    this.cd.detectChanges();
  }
  getWeatherData() {
    console.log(this.directionSteps);
    let stepTotalDistance = 0;
    this.directionSteps.forEach(step => {
      if (stepTotalDistance < this.DISTANCE_VARIABLE) {
        stepTotalDistance = stepTotalDistance + step.distance;
        this.http.get(this.OPEN_WEATHER_BASE_URL + 'lat=' + step.end_location_lat + '&lon=' + step.end_location_lng + '&appid=' + this.OPEN_WEATHER_API_KEY)
        .subscribe( (res) => {
            const weatherCity: any = res;
            console.log(weatherCity);
            step.stepWeather = new StepWeather(weatherCity.name, weatherCity.main.temp, weatherCity.weather[0].main, weatherCity.wind.speed);
            this.cd.markForCheck();
          });
      } else {
        stepTotalDistance = 0;
      }
    });
    this.cd.detectChanges();
  }

  getDirections () {
    this.directionsService.route({
      origin: this.o,
      destination: this.d,
      travelMode: 'DRIVING'
    }, (response, status) => {
        this.processGoogleAPIResponse(response.routes[0].legs[0].steps);
        this.cd.detectChanges();
    });
}


}

