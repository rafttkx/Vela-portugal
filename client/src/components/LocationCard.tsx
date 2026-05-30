import React from 'react';
import { Card } from '@/components/ui/card';
import { Wind, Waves } from 'lucide-react';

interface LocationCardProps {
  name: string;
  windSpeed: number;
  windDirection: number;
  waveHeight: number;
  tideHeight: number;
  isRising: boolean;
  isSelected?: boolean;
  onClick?: () => void;
}

export const LocationCard: React.FC<LocationCardProps> = ({
  name,
  windSpeed,
  windDirection,
  waveHeight,
  tideHeight,
  isRising,
  isSelected = false,
  onClick,
}) => {
  // Determine wind intensity
  const getWindIntensity = (speed: number) => {
    if (speed < 10) return 'Calmo';
    if (speed < 20) return 'Moderado';
    if (speed < 30) return 'Forte';
    return 'Muito Forte';
  };

  // Determine wind color
  const getWindColor = (speed: number) => {
    if (speed < 10) return 'text-blue-400';
    if (speed < 20) return 'text-primary';
    if (speed < 30) return 'text-accent';
    return 'text-red-600';
  };

  const windColor = getWindColor(windSpeed);
  const windIntensity = getWindIntensity(windSpeed);

  return (
    <Card
      onClick={onClick}
      className={`p-4 cursor-pointer transition-all duration-200 ${
        isSelected
          ? 'ring-2 ring-primary shadow-lg'
          : 'hover:shadow-md hover:ring-1 hover:ring-border'
      }`}
    >
      <div className="space-y-3">
        {/* Location name */}
        <h3 className="font-heading text-primary">{name}</h3>

        {/* Wind data */}
        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <Wind size={16} className={windColor} />
            <span className="font-small text-muted-foreground">Vento</span>
          </div>
          <div className="flex justify-between items-baseline">
            <div className="font-data text-lg text-primary">
              {windSpeed.toFixed(1)} km/h
            </div>
            <span className="font-small text-muted-foreground">
              {windDirection.toFixed(0)}° - {windIntensity}
            </span>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-border" />

        {/* Tide and wave data */}
        <div className="grid grid-cols-2 gap-3">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <Waves size={16} className="text-primary" />
              <span className="font-small text-muted-foreground">Ondas</span>
            </div>
            <div className="font-data text-sm text-primary">
              {waveHeight.toFixed(1)} m
            </div>
          </div>
          <div>
            <div className="font-small text-muted-foreground mb-1">Maré</div>
            <div className="flex items-center gap-1">
              <div className="font-data text-sm text-primary">
                {tideHeight.toFixed(2)} m
              </div>
              <span className={`text-xs font-semibold ${isRising ? 'text-primary' : 'text-accent'}`}>
                {isRising ? '↑' : '↓'}
              </span>
            </div>
          </div>
        </div>
      </div>
    </Card>
  );
};
