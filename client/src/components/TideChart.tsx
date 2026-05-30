import React, { useMemo } from 'react';
import { TrendingUp, TrendingDown } from 'lucide-react';

interface TideChartProps {
  isRising: boolean;
  location: string;
}

export const TideChart: React.FC<TideChartProps> = ({
  isRising,
  location,
}) => {
  const tideStatus = useMemo(() => {
    if (isRising) {
      return {
        label: 'A Encher',
        description: 'A maré está a subir',
        icon: TrendingUp,
        color: '#0A3A52',
        bgColor: '#E0F2FE',
      };
    }
    return {
      label: 'A Vasar',
      description: 'A maré está a descer',
      icon: TrendingDown,
      color: '#FF6B35',
      bgColor: '#FEE2E2',
    };
  }, [isRising]);

  const TideIcon = tideStatus.icon;

  return (
    <div className="w-full space-y-4">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h3 className="font-heading text-primary">{location}</h3>
      </div>

      {/* Tide Status Card */}
      <div
        className="p-6 rounded-lg border-2 flex items-center gap-4"
        style={{
          backgroundColor: tideStatus.bgColor,
          borderColor: tideStatus.color,
        }}
      >
        <div>
          <TideIcon size={40} color={tideStatus.color} strokeWidth={1.5} />
        </div>
        <div>
          <div className="font-heading text-lg" style={{ color: tideStatus.color }}>
            {tideStatus.label}
          </div>
          <div className="font-small text-muted-foreground mt-1">
            {tideStatus.description}
          </div>
        </div>
      </div>
    </div>
  );
};
