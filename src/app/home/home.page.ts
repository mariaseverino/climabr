import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { City } from '../domain/entities/city.model';
import { SearchCityService } from '../domain/services/search-city.service';
import { SearchGeolocationService } from '../domain/services/search-geolocation.service';
import { GeolocationService } from '@ng-web-apis/geolocation';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  errorMessage = null;
  cities: City[] = [];

  constructor(
    private readonly cityService: SearchCityService,
    private readonly router: Router,
    private readonly searchGeolocationService: SearchGeolocationService
  ) { }

  async onSearch(query: string) {
    try {
      this.errorMessage = null;
      this.cities = await this.cityService.searchByName(query);
    } catch (error) {
      this.errorMessage = error.message;
    }
  }

  async onGeolocation() {
    try {
      const coords = await this.searchGeolocationService.getGeolocation();
      this.cities.push(await this.cityService.searchCityByGeolocation(coords));
    } catch (error) {
      this.errorMessage = error.message;
    }
  }


  async onSelect(city: City) {
    await this.router.navigateByUrl(`/weather/${city.id}`, {
      replaceUrl: true,
    });
  }
}
