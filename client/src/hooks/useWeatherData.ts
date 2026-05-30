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

export interface TideData {
  time: string;
  height: number;
}

export interface LocationWeatherData {
  location: WeatherLocation;
  weather: WeatherData | null;
  tideData: TideData[];
  currentTideHeight: number;
  isTideRising: boolean;
  loading: boolean;
  error: string | null;
}

// Portuguese coastal locations
export const PORTUGAL_LOCATIONS: WeatherLocation[] = [
  { name: 'Figueira da Foz', lat: 40.1417, lon: -8.8783, id: '1' },
  { name: 'Nazaré', lat: 39.6009, lon: -9.0747, id: '2' },
  { name: 'Peniche', lat: 39.3567, lon: -9.3806, id: '3' },
  { name: 'Cascais', lat: 38.6867, lon: -9.4204, id: '4' },
  { name: 'Costa da Caparica', lat: 38.6633, lon: -9.2167, id: '5' },
  { name: 'Sesimbra', lat: 38.4437, lon: -9.1033, id: '6' },
  { name: 'Sagres', lat: 37.0183, lon: -8.9450, id: '7' },
  { name: 'Tavira', lat: 37.2639, lon: -7.9139, id: '8' },
  { name: 'Vilamoura', lat: 37.0667, lon: -8.1167, id: '9' },
  { name: 'Olhão', lat: 37.0333, lon: -7.8500, id: '10' },
  { name: 'Vila Real de Santo António', lat: 37.1833, lon: -7.4167, id: '11' },
  { name: 'Marina da Associação do Guadiana', lat: 37.2167, lon: -7.4333, id: '12' },
];

export const useWeatherData = (location: WeatherLocation) => {
  const [data, setData] = useState<LocationWeatherData>({
    location,
    weather: null,
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

      // Get first available data point (current hour)
      const windSpeedArray = weatherJson.hourly.wind_speed_10m;
      const windDirectionArray = weatherJson.hourly.wind_direction_10m || [];
      const waveHeightArray = weatherJson.hourly.wave_height || [];
      const temperatureArray = weatherJson.hourly.temperature_2m || [];

      const windSpeed = windSpeedArray.length > 0 ? windSpeedArray[0] : 0;
      const windDirection = windDirectionArray.length > 0 ? windDirectionArray[0] : 0;
      const waveHeight = waveHeightArray.length > 0 ? waveHeightArray[0] : 0;
      const temperature = temperatureArray.length > 0 ? temperatureArray[0] : 18;

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
