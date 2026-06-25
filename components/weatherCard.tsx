'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import SearchInput from './searchInput';
import ErrorToast from './errorToast';
import ForecastPanel from './forecastPanel';
import { searchError } from '../types/weathertypes';
import { DailyForecast, WeatherResponse } from '../model/weatherModel';

function kelvinToCelsius(kelvin: number) {
  return Math.round(kelvin - 273.15);
}

function formatTime(unix: number, timezone: number) {
  return new Date((unix + timezone) * 1000).toLocaleTimeString([], {
    hour: '2-digit',
    minute: '2-digit',
  });
}

const statIcons: Record<string, React.ReactNode> = {
  minMax: (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="h-5 w-5">
      <path d="M12 3v18M8 7l4-4 4 4M8 17l4 4 4-4" />
    </svg>
  ),
  humidity: (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="h-5 w-5">
      <path d="M12 2.69l5.66 5.66a8 8 0 1 1-11.31 0z" />
    </svg>
  ),
  wind: (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="h-5 w-5">
      <path d="M17.7 7.7a2.5 2.5 0 1 1 1.8 4.3H2M9.6 4.6A2 2 0 1 1 11 8H2M12.6 18.4a2 2 0 1 0-.8 3.8 2.6 2.6 0 0 0 .8 0H21" />
    </svg>
  ),
  pressure: (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="h-5 w-5">
      <circle cx="12" cy="12" r="10" />
      <path d="M12 6v6l4 2" />
    </svg>
  ),
  visibility: (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="h-5 w-5">
      <path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7z" />
      <circle cx="12" cy="12" r="3" />
    </svg>
  ),
  sun: (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="h-5 w-5">
      <circle cx="12" cy="12" r="4" />
      <path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M4.93 19.07l1.41-1.41M17.66 6.34l1.41-1.41" />
    </svg>
  ),
};

function StatCard({ icon, label, value }: { icon: React.ReactNode; label: string; value: string }) {
  return (
    <div className="group min-w-0 rounded-2xl border border-white/5 bg-white/[0.03] p-3 backdrop-blur-sm transition hover:border-sky-400/20 hover:bg-white/[0.06] sm:p-4">
      <div className="mb-2 flex h-8 w-8 items-center justify-center rounded-xl bg-white/10 text-white transition group-hover:bg-white/15 sm:mb-3 sm:h-9 sm:w-9">
        {icon}
      </div>
      <p className="text-[10px] font-medium uppercase tracking-wider text-white sm:text-xs">{label}</p>
      <p className="mt-1 break-words text-xs font-semibold leading-snug text-white sm:text-sm">{value}</p>
    </div>
  );
}

function WeatherCard() {
  const [weather, setWeather] = useState<WeatherResponse | null>(null);
  const [forecast, setForecast] = useState<DailyForecast[]>([]);
  const [error, setError] = useState<searchError>({ message: '' });
  const [loading, setLoading] = useState<boolean>(false);

  const icon = weather?.weather[0]?.icon;
  const description = weather?.weather[0]?.description ?? '';

  return (
    <div className="relative z-10 w-full min-w-0">
      <div className="rounded-3xl border border-white/10 bg-white/[0.04] p-5 shadow-2xl shadow-black/40 backdrop-blur-xl sm:p-8">
        <div className="text-center">
          <div className="mx-auto mb-4 inline-flex items-center gap-2 rounded-full border border-sky-400 bg-sky-500/5 px-4 py-1.5 text-xs font-medium uppercase tracking-widest text-sky-300">
            <span className="h-1.5 w-1.5 rounded-full bg-sky-300 animate-pulse-glow" />
            Live Weather
          </div>
          <h1 className="text-2xl font-bold tracking-tight text-sky-500 sm:text-4xl">
            Weather App
          </h1>
          <p className="mt-2 text-sm text-gray-100">
            Real-time forecasts for any city · by Khaled Iman
          </p>
        </div>

        <div className="mt-6 flex justify-center sm:mt-8">
          <SearchInput
            setWeather={setWeather}
            setForecast={setForecast}
            setError={(message) => setError({ message })}
            setLoading={setLoading}
            loading={loading}
          />
        </div>

        <div className="mt-4 flex justify-center">
          <ErrorToast message={error.message} />
        </div>

        {weather && !loading && (
          <div className="animate-fade-up mt-5 flex min-w-0 flex-col gap-4 lg:flex-row lg:items-start">
            <div className="min-w-0 flex-1">
            <div className="relative overflow-hidden rounded-2xl border border-white/10 bg-gradient-to-br from-sky-500/10 via-transparent to-indigo-500/10 p-5 sm:p-8">
              <div className="pointer-events-none absolute -right-8 -top-8 h-40 w-40 rounded-full bg-sky-400/10 blur-3xl" />

              <div className="relative flex flex-col items-center gap-4 text-center md:flex-row md:items-start md:justify-between md:text-left">
                <div className="min-w-0">
                  <h2 className="text-xl font-bold text-white sm:text-3xl">
                    {weather.name}
                    <span className="ml-2 text-base font-normal text-white sm:text-lg">{weather.sys.country}</span>
                  </h2>
                  <p className="mt-1 capitalize text-white">{description}</p>
                  <p className="mt-3 text-sm text-white">
                    Feels like <span className="font-medium text-white">{kelvinToCelsius(weather.main.feels_like)}°C</span>
                  </p>
                </div>

                <div className="flex shrink-0 items-center gap-1 sm:gap-2">
                  {icon && (
                    <div className="relative">
                      <div className="absolute inset-0 rounded-full bg-sky-400/20 blur-xl" />
                      <Image
                        src={`https://openweathermap.org/img/wn/${icon}@4x.png`}
                        alt={description}
                        width={100}
                        height={100}
                        className="relative h-16 w-16 drop-shadow-lg sm:h-[100px] sm:w-[100px]"
                      />
                    </div>
                  )}
                  <p className="text-5xl font-light tracking-tighter text-white sm:text-7xl">
                    {kelvinToCelsius(weather.main.temp)}
                    <span className="text-2xl text-sky-400 sm:text-3xl">°</span>
                  </p>
                </div>
              </div>
            </div>

            <div className="mt-4 grid grid-cols-2 gap-2 sm:grid-cols-3 sm:gap-3">
              <StatCard
                icon={statIcons.minMax}
                label="Min / Max"
                value={`${kelvinToCelsius(weather.main.temp_min)}° / ${kelvinToCelsius(weather.main.temp_max)}°`}
              />
              <StatCard
                icon={statIcons.humidity}
                label="Humidity"
                value={`${weather.main.humidity}%`}
              />
              <StatCard
                icon={statIcons.wind}
                label="Wind Speed"
                value={`${weather.wind.speed} m/s`}
              />
              <StatCard
                icon={statIcons.pressure}
                label="Pressure"
                value={`${weather.main.pressure} hPa`}
              />
              <StatCard
                icon={statIcons.visibility}
                label="Visibility"
                value={`${(weather.visibility / 1000).toFixed(1)} km`}
              />
              <StatCard
                icon={statIcons.sun}
                label="Sunrise / Sunset"
                value={`${formatTime(weather.sys.sunrise, weather.timezone)} · ${formatTime(weather.sys.sunset, weather.timezone)}`}
              />
            </div>
            </div>

            <ForecastPanel forecast={forecast} />
          </div>
        )}

        {!weather && !loading && !error.message && (
          <div className="mt-6 text-center">
            <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-2xl border border-white/5 bg-white/[0.03] text-white">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="h-8 w-8">
                <path d="M17.5 19H9a7 7 0 1 1 6.71-9h1.79a4.5 4.5 0 1 1 0 9z" />
              </svg>
            </div>
            <p className="text-sm text-white">Search a city to see current conditions</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default WeatherCard;
