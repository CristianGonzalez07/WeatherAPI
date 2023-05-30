import { GetWeatherByCityQuery } from '../queries/getWeatherByCityQuery';

export class WeatherController {
  public async getWeatherByCity(city:string, countryCode:string) {
    const query = new GetWeatherByCityQuery(city, countryCode);
    return await query.execute();
  }


}


