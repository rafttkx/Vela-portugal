import React, { useState } from 'react';
import { WindCompass } from '@/components/WindCompass';
import { TideChart } from '@/components/TideChart';
import { LocationCard } from '@/components/LocationCard';
import { useWeatherData, PORTUGAL_LOCATIONS, WeatherLocation } from '@/hooks/useWeatherData';
import { Loader2, Compass } from 'lucide-react';

/**
 * Design Philosophy: Minimalismo Náutico Moderno
 * - Clean white background with deep navy accents
 * - Three-column asymmetric layout
 * - Rosa dos ventos animada como elemento central
 * - Dados em tempo real com transições suaves
 */
export default function Home() {
  const [selectedLocation, setSelectedLocation] = useState<WeatherLocation>(PORTUGAL_LOCATIONS[0]);

  // Fetch data for selected location
  const selectedLocationData = useWeatherData(selectedLocation);

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <div
        className="relative h-96 bg-cover bg-center flex items-center justify-center"
        style={{
          backgroundImage:
            'url(https://d2xsxph8kpxj0f.cloudfront.net/310519663689197293/Q6FRrP3fMswspVKXie69nT/hero-sailing-portugal-LBdvJD8LceyZ57CmsBLevV.webp)',
          backgroundAttachment: 'fixed',
        }}
      >
        {/* Overlay */}
        <div className="absolute inset-0 bg-black/40" />

        {/* Content */}
        <div className="relative z-10 text-center text-white space-y-2">
          <div className="flex items-center justify-center gap-3 mb-4">
            <Compass size={32} />
            <h1 className="font-display text-4xl">Vela Portugal</h1>
          </div>
          <p className="text-lg font-light">Vento e Marés em Tempo Real</p>
        </div>
      </div>

      {/* Main Content */}
      <div className="container max-w-7xl mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Left Sidebar - Location List */}
          <div className="lg:col-span-1">
            <div className="space-y-3 sticky top-8">
              <h2 className="font-heading text-primary mb-4">Locais Costeiros</h2>
              <div className="space-y-2 max-h-96 overflow-y-auto">
                {PORTUGAL_LOCATIONS.map((location) => (
                  <button
                    key={location.id}
                    onClick={() => setSelectedLocation(location)}
                    className={`w-full text-left px-3 py-2 rounded-lg transition-all duration-200 ${
                      selectedLocation.id === location.id
                        ? 'bg-primary text-primary-foreground shadow-md'
                        : 'bg-card text-foreground hover:bg-secondary'
                    }`}
                  >
                    <div className="font-small font-semibold">{location.name}</div>
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Center - Wind Compass */}
          <div className="lg:col-span-2">
            {selectedLocationData.loading ? (
              <div className="flex items-center justify-center h-96">
                <Loader2 className="animate-spin text-primary" size={32} />
              </div>
            ) : selectedLocationData.weather ? (
              <div className="bg-card p-8 rounded-lg shadow-sm">
                <h2 className="font-heading text-primary mb-6 text-center">
                  {selectedLocation.name}
                </h2>
                <WindCompass
                  windDirection={selectedLocationData.weather.windDirection}
                  windSpeed={selectedLocationData.weather.windSpeed}
                />
              </div>
            ) : (
              <div className="bg-card p-8 rounded-lg text-center text-muted-foreground">
                Sem dados disponíveis
              </div>
            )}
          </div>

          {/* Right - Tide Information */}
          <div className="lg:col-span-1">
            {selectedLocationData.loading ? (
              <div className="flex items-center justify-center h-96">
                <Loader2 className="animate-spin text-primary" size={32} />
              </div>
            ) : selectedLocationData.weather ? (
              <div className="bg-card p-4 rounded-lg shadow-sm space-y-4">
                <TideChart
                  data={selectedLocationData.tideData}
                  currentHeight={selectedLocationData.currentTideHeight}
                  isRising={selectedLocationData.isTideRising}
                  location="Maré"
                />

                {/* Additional info */}
                <div className="border-t border-border pt-4 space-y-3">
                  <div>
                    <div className="font-small text-muted-foreground mb-1">Ondas</div>
                    <div className="font-data text-lg text-primary">
                      {selectedLocationData.weather.waveHeight.toFixed(1)} m
                    </div>
                  </div>
                  <div>
                    <div className="font-small text-muted-foreground mb-1">Temperatura</div>
                    <div className="font-data text-lg text-primary">
                      {selectedLocationData.weather.temperature}°C
                    </div>
                  </div>
                  <div>
                    <div className="font-small text-muted-foreground mb-1">Atualizado</div>
                    <div className="font-small text-xs">
                      {selectedLocationData.weather.timestamp.toLocaleTimeString('pt-PT')}
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              <div className="bg-card p-4 rounded-lg text-center text-muted-foreground text-sm">
                Sem dados disponíveis
              </div>
            )}
          </div>
        </div>

        {/* All Locations Grid */}
        <div className="mt-12">
          <h2 className="font-heading text-primary mb-6">Visão Geral de Todos os Locais</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {PORTUGAL_LOCATIONS.map((location) => {
              // Use hook for each location
              // eslint-disable-next-line react-hooks/rules-of-hooks
              const locationData = useWeatherData(location);
              return (
                <LocationCard
                  key={location.id}
                  name={location.name}
                  windSpeed={locationData.weather?.windSpeed || 0}
                  windDirection={locationData.weather?.windDirection || 0}
                  waveHeight={locationData.weather?.waveHeight || 0}
                  tideHeight={locationData.currentTideHeight}
                  isRising={locationData.isTideRising}
                  isSelected={selectedLocation.id === location.id}
                  onClick={() => setSelectedLocation(location)}
                />
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
