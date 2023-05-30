import { Weather } from './weatherEntity';
import dotenv from 'dotenv';
import axios from 'axios';

dotenv.config();

interface WeatherData {
  weather: [{ 
    id: number;
    main: string; 
    description: string;
    icon: string;
  }];
  main: {
    temp: number;
    feels_like: number;
    temp_min: number;
    temp_max: number;
    pressure: number;
    humidity: number;
  };
  visibility:number;
  wind: { 
    speed: number;
    deg: number;
  };
}

export class WeatherRepository {
  async getWeatherByCity(city:string, countryCode:string): Promise<Weather> {
    try {
      const response = await axios.get<WeatherData>(`https://api.openweathermap.org/data/2.5/weather?q=${city},${countryCode}&appid=${process.env.OPEN_WEATHER_API_KEY}&units=metric`);
      if (response.status === 200) {
        const data = response.data;
        const weather = new Weather(data.weather, data.main, data.visibility, data.wind);
        return weather;
      } else {
        throw new Error('Failed to retrieve weather data');
      }
    } catch (error) {
      throw new Error('Error retrieving weather data');
    }
  }
}
