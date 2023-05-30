import { GetWeatherByCityQuery } from '../queries/getWeatherByCityQuery';
import { GetForecastWeatherByCityQuery } from '../queries/getForecastWeatherByCityQuery';

export class WeatherController {
  public async getWeatherByCity(city:string, countryCode:string) {
    const query = new GetWeatherByCityQuery(city, countryCode);
    return await query.execute();
  }
  public async getForecastWeatherByCity(city:string, countryCode:string) {
    const query = new GetForecastWeatherByCityQuery(city, countryCode);
    return await query.execute();
  }
}