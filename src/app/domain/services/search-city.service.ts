import { City, Coordinate } from '../entities/city.model';
import { CityNotFoundError } from '../errors/city-not-found.error';
import { CityRepository } from './protocols/city-repository';
import haversine from 'haversine-distance';

/**
 * Classe responsável pelo serviço de busca de cidade
 * @class
 */
export class SearchCityService {
  /**
   * @constructor
   * @param {CityRepository} repo - objeto de acesso ao repositório de cidades
   */
  constructor(private readonly repo: CityRepository) { }

  /**
   * Busca as cidades que contém no seu nome a combinação digitada
   * @function
   * @async
   * @param {string} name - nome da cidade buscada
   * @returns {Promise<City[]>} - Lista com as cidades encontradas pela busca
   */
  async searchByName(name: string): Promise<City[]> {
    if (!name || name.trim().length < 3) {
      return [];
    }

    const allCities = await this.repo.getAll();

    const filteredCities = allCities.filter(
      (city: City) => city.name.toLowerCase().indexOf(name.toLowerCase()) > -1
    );

    if (filteredCities.length == 0) {
      throw new CityNotFoundError();
    }

    return filteredCities;
  }

  /**
   * Busca as cidades por id
   * @function
   * @async
   * @param {number} id - id da cidade a ser buscada no repositório
   * @returns {Promise<City>} - cidade com o id buscado
   */
  async searchById(id: number): Promise<City> {
    const city = this.repo.getById(id);

    if (!city) {
      throw new CityNotFoundError();
    }

    return city;
  }

  /**
   * Busca a cidade mais próxima das coordenadas do gps do dispositivo
   * @function
   * @async
   * @param {Coordinate} coordinate - coordenadas a serem utilizadas como pesquisa na lista de cidades
   * @returns {Promise<City>} - cidade mais próxima das coordenadas de comparação
   */
  async searchCityByGeolocation(coordinate: Coordinate): Promise<City> {
    const allCities = await this.repo.getAll();

    let menor = {
      city: null,
      distance: Number.MAX_VALUE,
    };

    allCities.forEach((city) => {
      const position = haversine(coordinate, city.coords);
      if (menor.distance > position) {
        menor.distance = position;
        menor.city = city;
      }
    });

    return menor.city;
  }
}
