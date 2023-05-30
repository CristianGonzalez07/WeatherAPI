export class Weather {
  constructor(
    public weather: [{ 
      main: string; 
      description: string;
    }],
    public main: {
      temp: number;
      feels_like: number;
      temp_min: number;
      temp_max: number;
      pressure: number;
      humidity: number;
    },
    public visibility:number,
    public wind: { 
      speed: number;
      deg: number;
    },
  ) {}
}
