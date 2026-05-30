import React from 'react';

interface WindCompassProps {
  windDirection: number; // 0-360 degrees
  windSpeed: number; // km/h
}

export const WindCompass: React.FC<WindCompassProps> = ({ windDirection, windSpeed }) => {
  // Determine wind intensity color
  const getWindColor = (speed: number) => {
    if (speed < 10) return '#4EBDE5'; // Light blue - calm
    if (speed < 20) return '#0A3A52'; // Navy - moderate
    if (speed < 30) return '#FF6B35'; // Orange - strong
    return '#FF0000'; // Red - very strong
  };

  const windColor = getWindColor(windSpeed);

  return (
    <div className="flex flex-col items-center justify-center gap-4">
      <div className="relative w-48 h-48">
        {/* SVG Compass */}
        <svg
          viewBox="0 0 200 200"
          className="w-full h-full"
          style={{
            filter: 'drop-shadow(0 2px 8px rgba(10, 58, 82, 0.1))',
          }}
        >
          {/* Background circle */}
          <circle cx="100" cy="100" r="95" fill="white" stroke="#E8E8E8" strokeWidth="2" />

          {/* Cardinal directions */}
          <text
            x="100"
            y="25"
            textAnchor="middle"
            className="font-bold text-lg"
            fill="#0A3A52"
            fontSize="14"
            fontWeight="700"
          >
            N
          </text>
          <text
            x="175"
            y="105"
            textAnchor="middle"
            className="font-bold text-lg"
            fill="#0A3A52"
            fontSize="14"
            fontWeight="700"
          >
            E
          </text>
          <text
            x="100"
            y="180"
            textAnchor="middle"
            className="font-bold text-lg"
            fill="#0A3A52"
            fontSize="14"
            fontWeight="700"
          >
            S
          </text>
          <text
            x="25"
            y="105"
            textAnchor="middle"
            className="font-bold text-lg"
            fill="#0A3A52"
            fontSize="14"
            fontWeight="700"
          >
            W
          </text>

          {/* Degree markers */}
          {[...Array(36)].map((_, i) => {
            const angle = (i * 10) * (Math.PI / 180);
            const x1 = 100 + 85 * Math.cos(angle - Math.PI / 2);
            const y1 = 100 + 85 * Math.sin(angle - Math.PI / 2);
            const x2 = 100 + 90 * Math.cos(angle - Math.PI / 2);
            const y2 = 100 + 90 * Math.sin(angle - Math.PI / 2);
            return (
              <line
                key={i}
                x1={x1}
                y1={y1}
                x2={x2}
                y2={y2}
                stroke="#D0D0D0"
                strokeWidth="1"
              />
            );
          })}

          {/* Wind direction arrow - rotates based on wind direction */}
          <g
            transform={`rotate(${windDirection} 100 100)`}
            style={{
              transition: 'transform 0.5s ease-out',
            }}
          >
            {/* Arrow shaft */}
            <line
              x1="100"
              y1="100"
              x2="100"
              y2="40"
              stroke={windColor}
              strokeWidth="3"
              strokeLinecap="round"
            />
            {/* Arrow head */}
            <polygon
              points="100,40 95,50 105,50"
              fill={windColor}
            />
          </g>

          {/* Center circle */}
          <circle cx="100" cy="100" r="8" fill={windColor} />
        </svg>
      </div>

      {/* Wind information */}
      <div className="text-center">
        <div className="font-data text-2xl text-primary">
          {windSpeed.toFixed(1)} km/h
        </div>
        <div className="font-small text-muted-foreground">
          {windDirection.toFixed(0)}°
        </div>
      </div>
    </div>
  );
};
