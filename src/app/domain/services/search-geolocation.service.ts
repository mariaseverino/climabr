import { Position } from '@capacitor/geolocation';
import { GeolocationService } from '@ng-web-apis/geolocation';
import { take } from 'rxjs';
import { Coordinate } from '../entities/city.model';

export class SearchGeolocationService {
  public coordinate: Coordinate;

  constructor(private readonly geolocation$: GeolocationService) {}

  async getGeolocation() {
    this.geolocation$.pipe(take(1)).subscribe((position) => {
      this.coordinate = position.coords;
    });

    console.log(this.geolocation$);
  }

  async setCoordinate(position: GeolocationPosition) {
    console.log(position);
    console.log(position.coords.latitude);
    this.coordinate = {
      latitude: position.coords.latitude,
      longitude: position.coords.longitude,
    };
    console.log(this.coordinate);
  }

  async getCoordinate() {
    return this.coordinate;
  }
}
