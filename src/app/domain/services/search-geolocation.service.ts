import { GeolocationService } from '@ng-web-apis/geolocation';
import { firstValueFrom } from 'rxjs';
import { Coordinate } from '../entities/city.model';

export class SearchGeolocationService {
  public coordinates: Coordinate;

  constructor(private readonly geolocation$: GeolocationService) { }

  async getGeolocation() {
    const location = await firstValueFrom(this.geolocation$);    
    return location.coords;
  };
}
