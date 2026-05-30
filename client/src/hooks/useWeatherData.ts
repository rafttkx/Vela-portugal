import { useState, useEffect, useCallback } from 'react';

export interface WeatherLocation {
  name: string;
  lat: number;
  lon: number;
  id: string;
}

export interface WeatherData {
  windSpeed: number;
  windDirection: number;
  waveHeight: number;
  temperature: number;
  timestamp: Date;
}

export interface ForecastData {
  time: string;
  windSpeed: number;
  windDirection: number;
  temperature: number;
  waveHeight: number;
}

export interface TideData {
  time: string;
  height: number;
}

export interface LocationWeatherData {
  location: WeatherLocation;
  weather: WeatherData | null;
  forecast: ForecastData[];
  tideData: TideData[];
  currentTideHeight: number;
  isTideRising: boolean;
  loading: boolean;
  error: string | null;
}

// Vila Real de Santo António - Associação Naval do Guadiana
export const PORTUGAL_LOCATIONS: WeatherLocation[] = [
  { name: 'Vila Real de Santo António (Associação Naval do Guadiana)', lat: 37.1833, lon: -7.4167, id: '1' },
];

// Convert wind direction degrees to compass direction
export const degreesToCompass = (degrees: number): string => {
  const directions = ['N', 'NNE', 'NE', 'ENE', 'E', 'ESE', 'SE', 'SSE', 'S', 'SSW', 'SW', 'WSW', 'W', 'WNW', 'NW', 'NNW'];
  const index = Math.round(degrees / 22.5) % 16;
  return directions[index];
};

export const useWeatherData = (location: WeatherLocation) => {
  const [data, setData] = useState<LocationWeatherData>({
    location,
    weather: null,
    forecast: [],
    tideData: [],
    currentTideHeight: 0,
    isTideRising: false,
    loading: true,
    error: null,
  });

  const fetchWeatherData = useCallback(async () => {
    try {
      setData((prev) => ({ ...prev, loading: true, error: null }));

      // Fetch wind and wave data from Open-Meteo Forecast API
      const url = new URL('https://api.open-meteo.com/v1/forecast');
      url.searchParams.append('latitude', location.lat.toString());
      url.searchParams.append('longitude', location.lon.toString());
      url.searchParams.append('hourly', 'wind_speed_10m,wind_direction_10m,wave_height,temperature_2m');
      url.searchParams.append('timezone', 'Europe/Lisbon');

      const weatherResponse = await fetch(url.toString());

      if (!weatherResponse.ok) {
        throw new Error(`API error: ${weatherResponse.status} ${weatherResponse.statusText}`);
      }

      const weatherJson = await weatherResponse.json();

      // Validate response structure
      if (!weatherJson.hourly || !weatherJson.hourly.wind_speed_10m) {
        throw new Error('Invalid API response structure');
      }

      // Get current and forecast data
      const windSpeedArray = weatherJson.hourly.wind_speed_10m;
      const windDirectionArray = weatherJson.hourly.wind_direction_10m || [];
      const waveHeightArray = weatherJson.hourly.wave_height || [];
      const temperatureArray = weatherJson.hourly.temperature_2m || [];
      const timeArray = weatherJson.hourly.time || [];

      // Current data (first hour)
      const windSpeed = windSpeedArray.length > 0 ? windSpeedArray[0] : 0;
      const windDirection = windDirectionArray.length > 0 ? windDirectionArray[0] : 0;
      const waveHeight = waveHeightArray.length > 0 ? waveHeightArray[0] : 0;
      const temperature = temperatureArray.length > 0 ? temperatureArray[0] : 18;

      // Build forecast for the rest of the day (next 24 hours, minimum 8 hours)
      const now = new Date();
      const currentHour = now.getHours();
      const hoursRemaining = 24 - currentHour;
      const minHours = Math.max(8, hoursRemaining);

      const forecast: ForecastData[] = [];
      for (let i = 0; i < Math.min(minHours, windSpeedArray.length); i++) {
        const time = new Date(now.getTime() + i * 60 * 60 * 1000);
        forecast.push({
          time: time.toLocaleTimeString('pt-PT', { hour: '2-digit', minute: '2-digit' }),
          windSpeed: Math.max(0, windSpeedArray[i] || 0),
          windDirection: Math.max(0, Math.min(360, windDirectionArray[i] || 0)),
          temperature: Math.round((temperatureArray[i] || 18) * 10) / 10,
          waveHeight: Math.max(0, waveHeightArray[i] || 0),
        });
      }

      // Generate mock tide data (in production, use a tide API)
      const tideData = generateMockTideData();
      const { currentHeight, isRising } = calculateTideStatus(tideData);

      setData((prev) => ({
        ...prev,
        weather: {
          windSpeed: Math.max(0, windSpeed),
          windDirection: Math.max(0, Math.min(360, windDirection)),
          waveHeight: Math.max(0, waveHeight),
          temperature: Math.round(temperature * 10) / 10,
          timestamp: new Date(),
        },
        forecast,
        tideData,
        currentTideHeight: currentHeight,
        isTideRising: isRising,
        loading: false,
      }));
    } catch (error) {
      console.error('Weather fetch error:', error);
      setData((prev) => ({
        ...prev,
        error: error instanceof Error ? error.message : 'Erro ao buscar dados',
        loading: false,
      }));
    }
  }, [location.lat, location.lon]);

  useEffect(() => {
    fetchWeatherData();
    // Refresh every 15 minutes
    const interval = setInterval(fetchWeatherData, 15 * 60 * 1000);
    return () => clearInterval(interval);
  }, [fetchWeatherData]);

  return { ...data, refetch: fetchWeatherData };
};

// Helper function to generate mock tide data
function generateMockTideData(): TideData[] {
  const now = new Date();
  const data: TideData[] = [];

  for (let i = 0; i < 24; i++) {
    const time = new Date(now.getTime() + i * 60 * 60 * 1000);
    // Simple sine wave for tide simulation
    const height = 2 + 1.5 * Math.sin((i / 12) * Math.PI);
    data.push({
      time: time.toLocaleTimeString('pt-PT', { hour: '2-digit', minute: '2-digit' }),
      height,
    });
  }

  return data;
}

// Helper function to calculate tide status
function calculateTideStatus(tideData: TideData[]): { currentHeight: number; isRising: boolean } {
  if (tideData.length < 2) {
    return { currentHeight: 0, isRising: false };
  }

  const currentHeight = tideData[0].height;
  const previousHeight = tideData[tideData.length - 1].height;
  const isRising = currentHeight > previousHeight;

  return { currentHeight, isRising };
}
