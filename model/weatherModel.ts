export interface WeatherResponse {
    name: string;
    main: {
        temp: number;
        feels_like: number;
        temp_min: number;
        temp_max: number;
        pressure: number;
        humidity: number;
    };
    weather: {
        id: number;
        main: string;
        description: string;
        icon: string;
    }[];
    sys: {
        country: string;
        sunrise: number;
        sunset: number;
    };
    timezone: number;
    visibility: number;
    wind: {
        speed: number;
        deg: number;
    };
}

export interface ForecastItem {
    dt: number;
    main: {
        temp_min: number;
        temp_max: number;
    };
    weather: {
        description: string;
        icon: string;
    }[];
    dt_txt: string;
}

export interface DailyForecast {
    date: string;
    dayName: string;
    tempMin: number;
    tempMax: number;
    icon: string;
    description: string;
}

