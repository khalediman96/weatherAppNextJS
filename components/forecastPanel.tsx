'use client';

import Image from 'next/image';
import { DailyForecast } from '../model/weatherModel';

interface ForecastPanelProps {
  forecast: DailyForecast[];
}

function ForecastPanel({ forecast }: ForecastPanelProps) {
  if (!forecast.length) return null;

  return (
    <aside className="w-full min-w-0 shrink-0 rounded-2xl border border-white/10 bg-white/[0.04] p-4 backdrop-blur-xl sm:p-5 lg:w-64 lg:max-w-xs">
      <h3 className="mb-4 text-xs font-semibold uppercase tracking-wider text-white">
        One Week Forecast
      </h3>
      <ul className="space-y-2">
        {forecast.map((day) => (
          <li
            key={day.date}
            className="flex min-w-0 items-center justify-between gap-2 rounded-xl px-2 py-2 transition hover:bg-white/5"
          >
            <span className="w-9 shrink-0 text-sm font-medium text-white sm:w-10">{day.dayName}</span>
            <Image
              src={`https://openweathermap.org/img/wn/${day.icon}.png`}
              alt={day.description}
              width={36}
              height={36}
              className="shrink-0"
            />
            <div className="min-w-0 text-right text-xs sm:text-sm">
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
