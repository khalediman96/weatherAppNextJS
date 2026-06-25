import { DailyForecast, WeatherResponse } from '../model/weatherModel';

export class WeatherService {
  async getWeather(city: string): Promise<WeatherResponse> {
    const response = await fetch(`/api/weather?q=${encodeURIComponent(city)}`);

    if (!response.ok) {
      const error = await response.json().catch(() => ({ message: 'Failed to fetch weather' }));
      throw new Error(error.message ?? 'Failed to fetch weather');
    }

    return response.json();
  }

  async getForecast(city: string): Promise<DailyForecast[]> {
    const response = await fetch(`/api/forecast?q=${encodeURIComponent(city)}`);

    if (!response.ok) {
      const error = await response.json().catch(() => ({ message: 'Failed to fetch forecast' }));
      throw new Error(error.message ?? 'Failed to fetch forecast');
    }

    return response.json();
  }
}
