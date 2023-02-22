import { GeolocationService } from '@ng-web-apis/geolocation';
import { firstValueFrom } from 'rxjs';

/**
 * Classe responsável pelo serviço de Geolocalização
 * @class
 */
export class SearchGeolocationService {
  /**
   * Cria um serviço de geolocalização
   * @constructor
   * @param {GeolocationService} geolocation$ - objeto com os utilitários de geolocalização
   */
  constructor(private readonly geolocation$: GeolocationService) { }

  /**
   * Captura as coordenadas do dispositivo de acesso
   * @function
   * @async
   * @returns {GeolocationCoordinates} - Coordenadas capturadas pelo gps do dispositivo
   */
  async getGeolocation() {
    return (await firstValueFrom(this.geolocation$)).coords;
  };
}
