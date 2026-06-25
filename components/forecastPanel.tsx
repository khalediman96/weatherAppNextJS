'use client';

import Image from 'next/image';
import { DailyForecast } from '../model/weatherModel';

interface ForecastPanelProps {
  forecast: DailyForecast[];
}

function ForecastPanel({ forecast }: ForecastPanelProps) {
  if (!forecast.length) return null;

  return (
    <aside className="w-full shrink-0 rounded-2xl border border-white/10 bg-white/[0.04] p-5 backdrop-blur-xl lg:w-64">
      <h3 className="mb-4 text-xs font-semibold uppercase tracking-wider text-white">
        One Week Forecast
      </h3>
      <ul className="space-y-2">
        {forecast.map((day) => (
          <li
            key={day.date}
            className="flex items-center justify-between rounded-xl px-2 py-2 transition hover:bg-white/5"
          >
            <span className="w-10 text-sm font-medium text-white">{day.dayName}</span>
            <Image
              src={`https://openweathermap.org/img/wn/${day.icon}.png`}
              alt={day.description}
              width={36}
              height={36}
            />
            <div className="text-right text-sm">
              <span className="font-semibold text-white">{day.tempMax}°</span>
              <span className="text-white"> / {day.tempMin}°</span>
            </div>
          </li>
        ))}
      </ul>
    </aside>
  );
}

export default ForecastPanel;
