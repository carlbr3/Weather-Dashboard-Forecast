import dotenv from 'dotenv';
dotenv.config();

// TODO: Define an interface for the Coordinates object
interface Coordinates {
  lat: number;
  lon: number;
}
interface Weather {
  temperature: number;
  description: string;
  cityName: string;
}
// TODO: Define a class for the Weather object

// TODO: Complete the WeatherService class
import axios from 'axios';
class WeatherService {
  private baseURL: string;
  private apiKey: string;

  constructor() {
    this.baseURL = 'https://api.openweathermap.org/data/2.5/';
    this.apiKey = process.env.OPENWEATHER_API_KEY || '';}
  // TODO: Define the baseURL, API key, and city name properties
  private async fetchLocationData(query: string): Promise<Coordinates> {
    const response = await axios.get(`${this.baseURL}weather?q=${query}&appid=${this.apiKey}`);
    return this.destructureLocationData(response.data.coord);
  }
  // TODO: Create destructureLocationData method
  private destructureLocationData(locationData: Coordinates): Coordinates {
    return {
      lat: locationData.lat,
      lon: locationData.lon,
    };
  }
  // TODO: Create buildGeocodeQuery method
  private buildGeocodeQuery(): string {
    return `${this.baseURL}geocode/json?address=${city}&key=${this.apiKey}`;
  }
  // TODO: Create buildWeatherQuery method
  private buildWeatherQuery(coordinates: Coordinates): string {
    return `${this.baseURL}weather?lat=${coordinates.lat}&lon=${coordinates.lon}&appid=${this.apiKey}`;
  }
  // TODO: Create fetchAndDestructureLocationData method
  private async fetchAndDestructureLocationData() {
    const response = await axios.get(this.buildGeocodeQuery());
    return this.destructureLocationData(response.data.results[0].geometry.location);
  }
  // TODO: Create fetchWeatherData method
  private async fetchWeatherData(coordinates: Coordinates): Promise<Weather> {
    const url = this.buildWeatherQuery(coordinates);
    const response = await axios.get(url);
    return this.parseCurrentWeather(response.data);
  }
  // TODO: Build parseCurrentWeather method
  private parseCurrentWeather(data:any): Weather {
    return {
      temperature: data.main.temp,
      description: data.weather[0].description,
      cityName: data.name,
    };
  }
  // TODO: Complete buildForecastArray method
private buildForecastArray(currentWeather: Weather, weatherData: any[]) {
  return {
    temperature: currentWeather.temperature,
    description: currentWeather.description,
    cityName: currentWeather.cityName,
    forecast: weatherData.map((data) => ({
      date: data.dt_txt,
      temperature: data.main.temp,
      description: data.weather[0].description,
    })),
  }
}
  // TODO: Complete getWeatherForCity method
  async getWeatherForCity(city: string): Promise<Weather> {
    try {
      const coordinates = await this.fetchLocationData(city);
      const weather= await this.fetchWeatherData(coordinates);
      return weather;
    } catch (error) {
      console.error(error);
      throw error;
    }  
  }
 }
export default new WeatherService();