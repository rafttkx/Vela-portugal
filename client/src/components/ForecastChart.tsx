import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, ComposedChart, Bar } from 'recharts';
import { ForecastData, degreesToCompass } from '@/hooks/useWeatherData';
import { TrendingUp, TrendingDown } from 'lucide-react';

interface ForecastChartProps {
  data: ForecastData[];
}

export const ForecastChart: React.FC<ForecastChartProps> = ({ data }) => {
  if (data.length === 0) {
    return (
      <div className="text-center text-muted-foreground py-8">
        Sem dados de previsão disponíveis
      </div>
    );
  }

  // Generate tide forecast (simplified: alternates between rising and falling)
  // Show next 6-8 hours of tide forecast
  const tideForecast = data.slice(0, Math.min(8, data.length)).map((item, idx) => ({
    time: item.time,
    isRising: idx % 2 === 0,
  }));

  return (
    <div className="w-full space-y-6">
      {/* Wind Speed Chart */}
      <div className="bg-card p-4 rounded-lg">
        <h3 className="font-heading text-primary mb-4">Previsão de Vento</h3>
        <ResponsiveContainer width="100%" height={250}>
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
              label={{ value: 'km/h', angle: -90, position: 'insideLeft' }}
            />
            <Tooltip
              contentStyle={{
                backgroundColor: '#FFFFFF',
                border: '1px solid #E8E8E8',
                borderRadius: '0.5rem',
              }}
              labelStyle={{ color: '#1A1A1A' }}
            />
            <Legend />
            <Line
              type="monotone"
              dataKey="windSpeed"
              stroke="#0A3A52"
              dot={{ fill: '#0A3A52', r: 4 }}
              strokeWidth={2}
              name="Velocidade do Vento"
              isAnimationActive={true}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>

      {/* Wind Direction Compass Display */}
      <div className="bg-card p-4 rounded-lg">
        <h3 className="font-heading text-primary mb-4">Direção do Vento (Bússola)</h3>
        <div className="grid grid-cols-4 gap-2">
          {data.map((item, idx) => (
            <div
              key={idx}
              className="p-3 rounded-lg bg-secondary text-center border border-border"
            >
              <div className="text-xs text-muted-foreground">{item.time}</div>
              <div className="text-lg font-semibold text-primary">{degreesToCompass(item.windDirection)}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Temperature & Wave Height */}
      <div className="bg-card p-4 rounded-lg">
        <h3 className="font-heading text-primary mb-4">Temperatura e Ondas</h3>
        <ResponsiveContainer width="100%" height={250}>
          <ComposedChart data={data}>
            <CartesianGrid strokeDasharray="3 3" stroke="#E8E8E8" />
            <XAxis
              dataKey="time"
              tick={{ fontSize: 12, fill: '#666666' }}
              stroke="#E8E8E8"
            />
            <YAxis
              tick={{ fontSize: 12, fill: '#666666' }}
              stroke="#E8E8E8"
              label={{ value: '°C / m', angle: -90, position: 'insideLeft' }}
            />
            <Tooltip
              contentStyle={{
                backgroundColor: '#FFFFFF',
                border: '1px solid #E8E8E8',
                borderRadius: '0.5rem',
              }}
              labelStyle={{ color: '#1A1A1A' }}
            />
            <Legend />
            <Bar
              dataKey="temperature"
              fill="#3B82F6"
              name="Temperatura (°C)"
              radius={[4, 4, 0, 0]}
            />
            <Line
              type="monotone"
              dataKey="waveHeight"
              stroke="#0EA5E9"
              dot={{ fill: '#0EA5E9', r: 4 }}
              strokeWidth={2}
              name="Altura das Ondas (m)"
              yAxisId="right"
            />
            <YAxis
              yAxisId="right"
              tick={{ fontSize: 12, fill: '#666666' }}
              stroke="#E8E8E8"
              label={{ value: 'Ondas (m)', angle: 90, position: 'insideRight' }}
            />
          </ComposedChart>
        </ResponsiveContainer>
      </div>

      {/* Tide Forecast */}
      <div className="bg-card p-4 rounded-lg">
        <h3 className="font-heading text-primary mb-4">Previsão de Maré</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-3">
          {tideForecast.map((item, idx) => (
            <div
              key={idx}
              className={`p-3 rounded-lg border-2 flex items-center gap-2 ${
                item.isRising
                  ? 'bg-blue-50 border-blue-300'
                  : 'bg-orange-50 border-orange-300'
              }`}
            >
              {item.isRising ? (
                <>
                  <TrendingUp size={20} className="text-blue-600" />
                  <div className="text-sm flex-1">
                    <div className="font-semibold text-blue-900 text-xs">{item.time}</div>
                    <div className="text-xs text-blue-700">Encher</div>
                  </div>
                </>
              ) : (
                <>
                  <TrendingDown size={20} className="text-orange-600" />
                  <div className="text-sm flex-1">
                    <div className="font-semibold text-orange-900 text-xs">{item.time}</div>
                    <div className="text-xs text-orange-700">Vasar</div>
                  </div>
                </>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Hourly Table */}
      <div className="bg-card p-4 rounded-lg overflow-x-auto">
        <h3 className="font-heading text-primary mb-4">Detalhes Horários</h3>
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-border">
              <th className="text-left py-2 px-3 font-semibold text-primary">Hora</th>
              <th className="text-left py-2 px-3 font-semibold text-primary">Vento (km/h) - Direção</th>
              <th className="text-left py-2 px-3 font-semibold text-primary">Temperatura (°C)</th>
              <th className="text-left py-2 px-3 font-semibold text-primary">Ondas (m)</th>
            </tr>
          </thead>
          <tbody>
            {data.map((row, idx) => (
              <tr key={idx} className="border-b border-border hover:bg-secondary transition-colors">
                <td className="py-2 px-3 font-mono text-foreground">{row.time}</td>
                <td className="py-2 px-3 text-foreground">{row.windSpeed.toFixed(1)} km/h - {degreesToCompass(row.windDirection)}</td>
                <td className="py-2 px-3 text-foreground">{row.temperature.toFixed(1)}</td>
                <td className="py-2 px-3 text-foreground">{row.waveHeight.toFixed(2)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
