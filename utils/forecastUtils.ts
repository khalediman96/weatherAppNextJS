import { DailyForecast, ForecastItem } from '../model/weatherModel';

function kelvinToCelsius(kelvin: number) {
  return Math.round(kelvin - 273.15);
}

export function groupForecastByDay(list: ForecastItem[]): DailyForecast[] {
  const days = new Map<string, { temps: number[]; icon: string; description: string }>();

  for (const item of list) {
    const date = item.dt_txt.split(' ')[0];
    const entry = days.get(date);

    if (!entry) {
      days.set(date, {
        temps: [item.main.temp_min, item.main.temp_max],
        icon: item.weather[0].icon,
        description: item.weather[0].description,
      });
      continue;
    }

    entry.temps.push(item.main.temp_min, item.main.temp_max);

    const hour = Number(item.dt_txt.split(' ')[1].split(':')[0]);
    if (hour === 12) {
      entry.icon = item.weather[0].icon;
      entry.description = item.weather[0].description;
    }
  }

  return Array.from(days.entries())
    .slice(0, 8)
    .map(([date, data]) => ({
      date,
      dayName: new Date(`${date}T12:00:00`).toLocaleDateString([], { weekday: 'short' }),
      tempMin: kelvinToCelsius(Math.min(...data.temps)),
      tempMax: kelvinToCelsius(Math.max(...data.temps)),
      icon: data.icon,
      description: data.description,
    }));
}
