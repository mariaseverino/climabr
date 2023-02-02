import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { GeolocationService } from '@ng-web-apis/geolocation';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { SearchCityService } from './domain/services/search-city.service';
import { LoadWeatherService } from './domain/services/load-weather.service';
import { LocalCityRepository } from './data/local/local-city-repository';
import { RemoteWeatherRepository } from './data/remote/remote-weather-repository';
import { SearchGeolocationService } from './domain/services/search-geolocation.service';

const createSearchCityService = () => {
  return new SearchCityService(new LocalCityRepository());
};

const createLoadWeatherService = (http: HttpClient) => {
  return new LoadWeatherService(new RemoteWeatherRepository(http));
};

const createSearchGeolocation = (geolocation$: GeolocationService) => {
  return new SearchGeolocationService(geolocation$);
};

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    IonicModule.forRoot(),
    HttpClientModule,
    AppRoutingModule,
  ],
  providers: [
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
    { provide: SearchCityService, useFactory: createSearchCityService },
    {
      provide: LoadWeatherService,
      useFactory: createLoadWeatherService,
      deps: [HttpClient],
    },
    {
      provide: SearchGeolocationService,
      useFactory: createSearchGeolocation,
      deps: [GeolocationService],
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
