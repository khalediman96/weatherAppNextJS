'use client';

import React, { useRef } from 'react';
import { WeatherService } from '../service/weatherService';
import { DailyForecast, WeatherResponse } from '../model/weatherModel';

interface SearchInputProps {
  setWeather: (weather: WeatherResponse) => void;
  setForecast: (forecast: DailyForecast[]) => void;
  setError: (message: string) => void;
  setLoading: (loading: boolean) => void;
  loading: boolean;
}

function SearchInput({ setWeather, setForecast, setError, setLoading, loading }: SearchInputProps) {
  const cityRef = useRef<HTMLInputElement>(null);

  const handleSearch = async () => {
    const city = cityRef.current?.value.trim();
    if (!city) {
      setError('Please enter a city name');
      return;
    }

    setLoading(true);
    setError('');
    setForecast([]);

    try {
      const weatherService = new WeatherService();
      const [weather, forecast] = await Promise.all([
        weatherService.getWeather(city),
        weatherService.getForecast(city),
      ]);
      setWeather(weather);
      setForecast(forecast);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch weather');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="relative w-full max-w-lg">
      <div className="flex items-center gap-2 rounded-2xl border border-white/10 bg-white/5 p-1.5 backdrop-blur-md transition focus-within:border-sky-400/40 focus-within:shadow-sky-500/10">
        <div className="pl-3 text-slate-400">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="h-5 w-5">
            <circle cx="11" cy="11" r="8" />
            <path d="m21 21-4.3-4.3" />
          </svg>
        </div>
        <input
          ref={cityRef}
          type="text"
          placeholder="Search for a city..."
          disabled={loading}
          className="flex-1 bg-transparent py-2.5 text-sm text-white placeholder:text-slate-500 outline-none disabled:opacity-50"
          onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
        />
        <button
          disabled={loading}
          onClick={handleSearch}
          className="rounded-xl bg-gradient-to-r from-sky-500 to-sky-600 px-5 py-2.5 text-sm font-medium text-white shadow-md shadow-sky-500/20 transition hover:from-sky-400 hover:to-sky-400 hover:shadow-sky-500/30 active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-60"
        >
          {loading ? (
            <span className="flex items-center gap-2">
              <svg className="h-4 w-4 animate-spin" viewBox="0 0 24 24" fill="none">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
              </svg>
              Searching
            </span>
          ) : (
            'Search'
          )}
        </button>
      </div>
    </div>
  );
}

export default SearchInput;
