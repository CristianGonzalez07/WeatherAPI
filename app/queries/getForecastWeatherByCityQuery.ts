import { WeatherRepository } from '../../domain/weather/weatherRepository';
import { Weather } from '../../domain/weather/weatherEntity';

export class GetForecastWeatherByCityQuery {
  private weatherRepository: WeatherRepository;

  constructor(private city: string, private countryCode: string) {
    this.city = city;
    this.countryCode = countryCode;
    this.weatherRepository = new WeatherRepository();
  }

  public async execute(): Promise<Array<Weather>> {
    try {
      const location = await this.weatherRepository.getForecastWeatherByCity(this.city, this.countryCode);
      return location;
    } catch (error) {
      throw new Error('Error retrieving location data');
    }
  }
}
