import React from 'react';
import { WindCompass } from '@/components/WindCompass';
import { TideChart } from '@/components/TideChart';
import { ForecastChart } from '@/components/ForecastChart';
import { useWeatherData, PORTUGAL_LOCATIONS, degreesToCompass } from '@/hooks/useWeatherData';
import { Loader2, Compass } from 'lucide-react';

/**
 * Design Philosophy: Minimalismo Náutico Moderno
 * - Clean white background with deep navy accents
 * - Focus on single location with detailed forecasts
 * - Rosa dos ventos animada como elemento central
 * - Previsões horárias do resto do dia
 */
export default function Home() {
  const location = PORTUGAL_LOCATIONS[0]; // Vila Real de Santo António
  const locationData = useWeatherData(location);

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <div
        className="relative h-80 bg-cover bg-center flex items-center justify-center"
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
          <p className="text-sm font-light opacity-90">Vila Real de Santo António - Associação Naval do Guadiana</p>
        </div>
      </div>

      {/* Main Content */}
      <div className="container max-w-6xl mx-auto px-4 py-8">
        {/* Current Conditions */}
        <div className="mb-12">
          <h2 className="font-heading text-primary mb-6 text-2xl">Condições Atuais</h2>

          {locationData.loading ? (
            <div className="flex items-center justify-center h-96">
              <Loader2 className="animate-spin text-primary" size={32} />
            </div>
          ) : locationData.error ? (
            <div className="bg-red-50 border border-red-200 rounded-lg p-6 text-red-800">
              <p className="font-semibold">Erro ao carregar dados</p>
              <p className="text-sm mt-1">{locationData.error}</p>
            </div>
          ) : locationData.weather ? (
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Wind Compass */}
              <div className="lg:col-span-2 bg-card p-8 rounded-lg shadow-sm">
                <h3 className="font-heading text-primary mb-6 text-center">Rosa dos Ventos</h3>
                <WindCompass
                  windDirection={locationData.weather.windDirection}
                  windSpeed={locationData.weather.windSpeed}
                />
              </div>

              {/* Current Info */}
              <div className="bg-card p-6 rounded-lg shadow-sm space-y-4">
                <div>
                  <div className="font-small text-muted-foreground mb-1">Velocidade do Vento</div>
                  <div className="font-data text-2xl text-primary">
                    {locationData.weather.windSpeed.toFixed(1)} km/h
                  </div>
                </div>

                <div className="border-t border-border pt-4">
                  <div className="font-small text-muted-foreground mb-1">Direção</div>
                  <div className="font-data text-2xl text-primary">
                    {degreesToCompass(locationData.weather.windDirection)}
                  </div>
                </div>

                <div className="border-t border-border pt-4">
                  <div className="font-small text-muted-foreground mb-1">Temperatura</div>
                  <div className="font-data text-2xl text-primary">
                    {locationData.weather.temperature}°C
                  </div>
                </div>

                <div className="border-t border-border pt-4">
                  <div className="font-small text-muted-foreground mb-1">Atualizado</div>
                  <div className="font-small text-xs">
                    {locationData.weather.timestamp.toLocaleTimeString('pt-PT')}
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <div className="bg-card p-8 rounded-lg text-center text-muted-foreground">
              Sem dados disponíveis
            </div>
          )}
        </div>

        {/* Tide Information */}
        <div className="mb-12">
          <h2 className="font-heading text-primary mb-6 text-2xl">Estado da Maré</h2>
          {locationData.weather ? (
            <div className="bg-card p-6 rounded-lg shadow-sm">
              <TideChart
                isRising={locationData.isTideRising}
                location="Maré Atual"
              />
            </div>
          ) : (
            <div className="bg-card p-8 rounded-lg text-center text-muted-foreground">
              Sem dados disponíveis
            </div>
          )}
        </div>

        {/* Forecast for Rest of Day */}
        <div>
          <h2 className="font-heading text-primary mb-6 text-2xl">Previsão para o Resto do Dia</h2>
          {locationData.loading ? (
            <div className="flex items-center justify-center h-96">
              <Loader2 className="animate-spin text-primary" size={32} />
            </div>
          ) : locationData.forecast.length > 0 ? (
            <ForecastChart data={locationData.forecast} />
          ) : (
            <div className="bg-card p-8 rounded-lg text-center text-muted-foreground">
              Sem dados de previsão disponíveis
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
