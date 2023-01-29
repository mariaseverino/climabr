import { HttpClient } from '@angular/common/http';
import { catchError, firstValueFrom, Observable, throwError, map } from 'rxjs';
import { Coordinate } from 'src/app/domain/entities/city.model';
import { Weather } from 'src/app/domain/entities/weather.model';
import { UnavailableServiceError } from 'src/app/domain/errors/unavailable-service.error';
import { WeatherRepository } from 'src/app/domain/services/protocols/weather-repository';
import { environment } from 'src/environments/environment';

export class RemoteWeatherRepository extends WeatherRepository {
  constructor(private readonly http: HttpClient) {
    super();
  }

  async getByCoords(coords: Coordinate): Promise<Weather> {
    return firstValueFrom(this.getWeather(coords));
  }

  private getWeather(coords: Coordinate): Observable<Weather> {
    return this.http
      .get(
        `${environment.apiConfig.URL}lat=${coords.latitude}&lon=${coords.longitude}&lang=pt_br&units=metric&cnt=3&appid=${environment.apiConfig.key}`
      )
      .pipe(
        map(this.toEntity),
        catchError(() => throwError(() => new UnavailableServiceError()))
      );
  }

  private toEntity(data: any): Weather {
    console.log('entrou');
    console.log(data);
    const numOfDailyWeathers = 3;
    const weather: Weather = {
      currentTemp: data.main.temp,
      details: [],
    };

    console.log('uhu ');
    weather.details.push({
      conditionDesc: data.weather[0].description,
      conditionIconURL: `${environment.apiConfig.iconURL}/${data.weather[0].icon}@2x.png`,
      pop: 0.03 * 100, //pop
      humidity: data.main.humidity,
      minTemp: data.main.temp_min,
      maxTemp: data.main.temp_max,
    });
    console.log(':) ');

    // for (let i = 0; i < numOfDailyWeathers; i++) {
    //   console.log('uhu ');
    //   weather.details.push({
    //     conditionDesc: data.list[i].weather[0].description,
    //     conditionIconURL: `${environment.apiConfig.iconURL}/${data[i].weather[0].icon}@2x.png`,
    //     pop: data[i].main.temp * 100, //pop
    //     humidity: data[i].main.humidity,
    //     minTemp: data[i].main.temp_min,
    //     maxTemp: data[i].main.temp_max,
    //   });
    //   console.log(':) ');
    // }

    return weather;
  }
}
