import React, { useMemo } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { TrendingUp, TrendingDown } from 'lucide-react';

interface TideData {
  time: string;
  height: number;
}

interface TideChartProps {
  data: TideData[];
  currentHeight: number;
  isRising: boolean;
  location: string;
}

export const TideChart: React.FC<TideChartProps> = ({
  data,
  currentHeight,
  isRising,
  location,
}) => {
  const tideStatus = useMemo(() => {
    if (isRising) {
      return {
        label: 'Maré Subindo',
        icon: TrendingUp,
        color: '#0A3A52',
      };
    }
    return {
      label: 'Maré Descendo',
      icon: TrendingDown,
      color: '#FF6B35',
    };
  }, [isRising]);

  const TideIcon = tideStatus.icon;

  return (
    <div className="w-full space-y-4">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h3 className="font-heading text-primary">{location}</h3>
        <div className="flex items-center gap-2">
          <TideIcon size={20} color={tideStatus.color} />
          <span className="font-small text-muted-foreground">
            {tideStatus.label}
          </span>
        </div>
      </div>

      {/* Current height */}
      <div className="bg-card p-4 rounded-lg">
        <div className="font-small text-muted-foreground mb-1">Altura Atual</div>
        <div className="font-data text-2xl text-primary">
          {currentHeight.toFixed(2)} m
        </div>
      </div>

      {/* Tide chart */}
      {data.length > 0 && (
        <div className="bg-card p-4 rounded-lg">
          <ResponsiveContainer width="100%" height={200}>
            <LineChart data={data}>
              <CartesianGrid strokeDasharray="3 3" stroke="#E8E8E8" />
              <XAxis
                dataKey="time"
                tick={{ fontSize: 12, fill: '#666666' }}
                stroke="#E8E8E8"
              />
              <YAxis
                tick={{ fontSize: 12, fill: '#666666' }}
                stroke="#E8E8E8"
              />
              <Tooltip
                contentStyle={{
                  backgroundColor: '#FFFFFF',
                  border: '1px solid #E8E8E8',
                  borderRadius: '0.5rem',
                }}
                labelStyle={{ color: '#1A1A1A' }}
              />
              <Line
                type="monotone"
                dataKey="height"
                stroke="#0A3A52"
                dot={{ fill: '#0A3A52', r: 4 }}
                strokeWidth={2}
                isAnimationActive={true}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      )}
    </div>
  );
};
