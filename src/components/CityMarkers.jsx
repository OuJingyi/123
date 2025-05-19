import React, { useState } from 'react';
import { cityData } from '../data/cityData';

const CityMarkers = ({ onCityClick }) => {
  const [hoveredCity, setHoveredCity] = useState(null);
  const [selectedCity, setSelectedCity] = useState(null);

  // 将经纬度转换为SVG坐标的函数
  const convertToSVGCoordinates = (lat, lng) => {
    // 将经纬度转换为SVG坐标
    const x = ((lng + 180) / 360) * 1000; // SVG宽度为1000
    const y = ((90 - lat) / 180) * 500;   // SVG高度为500
    return { x, y };
  };

  const handleCityHover = (city) => {
    setHoveredCity(city);
    onCityClick && onCityClick(city);
  };

  const handleCityLeave = () => {
    setHoveredCity(null);
    onCityClick && onCityClick(null);
  };

  const handleCityClick = (city) => {
    if (selectedCity === city) {
      setSelectedCity(null);
    } else {
      setSelectedCity(city);
    }
  };

  return (
    <g className="city-markers">
      {/* 中国城市标记 */}
      {cityData.chineseCities.map((city, index) => {
        const { x, y } = convertToSVGCoordinates(city.lat, city.lng);
        const isHovered = hoveredCity === city;
        const isSelected = selectedCity === city;
        return (
          <g
            key={`china-${index}`}
            className="city-marker"
            onMouseEnter={() => handleCityHover(city)}
            onMouseLeave={handleCityLeave}
            onClick={() => handleCityClick(city)}
            style={{ cursor: 'pointer' }}
          >
            <circle
              cx={x}
              cy={y}
              r={isHovered || isSelected ? "6" : "3"}
              fill="rgba(100, 204, 161, 0.8)"
              stroke={isHovered || isSelected ? "white" : "none"}
              strokeWidth={isHovered || isSelected ? "1.5" : "0"}
              style={{
                transition: 'all 0.2s ease-in-out'
              }}
            />
          </g>
        );
      })}

      {/* 欧洲城市标记 */}
      {cityData.europeanCities.map((city, index) => {
        const { x, y } = convertToSVGCoordinates(city.lat, city.lng);
        const isHovered = hoveredCity === city;
        const isSelected = selectedCity === city;
        return (
          <g
            key={`europe-${index}`}
            className="city-marker"
            onMouseEnter={() => handleCityHover(city)}
            onMouseLeave={handleCityLeave}
            onClick={() => handleCityClick(city)}
            style={{ cursor: 'pointer' }}
          >
            <circle
              cx={x}
              cy={y}
              r={isHovered || isSelected ? "6" : "3"}
              fill="rgba(100, 204, 161, 0.8)"
              stroke={isHovered || isSelected ? "white" : "none"}
              strokeWidth={isHovered || isSelected ? "1.5" : "0"}
              style={{
                transition: 'all 0.2s ease-in-out'
              }}
            />
          </g>
        );
      })}

      {/* 中国城市卡片 */}
      {cityData.chineseCities.map((city, index) => {
        const { x, y } = convertToSVGCoordinates(city.lat, city.lng);
        const isSelected = selectedCity === city;
        return isSelected && (
          <g key={`china-card-${index}`}>
            <path
              d={`M ${x} ${y} L ${x} ${y - 12}`}
              stroke="rgba(255, 255, 255, 0.8)"
              strokeWidth="1"
              fill="none"
            />
            <foreignObject
              x={x - 52.5}
              y={y - 45}
              width="105"
              height="32"
              style={{
                overflow: 'visible'
              }}
            >
              <div
                style={{
                  position: 'relative',
                  display: 'inline-block',
                  borderRadius: '20px',
                  padding: '0.5px',
                  background: 'transparent',
                  transform: 'translateX(-50%)',
                  left: '50%'
                }}
              >
                <div
                  style={{
                    padding: '0 12px',
                    borderRadius: '20px',
                    background: 'rgba(76, 164, 124, 0.3)',
                    backdropFilter: 'blur(15px)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: 'white',
                    fontSize: '14px',
                    fontFamily: 'system-ui, -apple-system, sans-serif',
                    height: '32px',
                    whiteSpace: 'nowrap',
                    border: '0.5px solid rgba(255, 255, 255, 0.6)',
                    boxSizing: 'border-box'
                  }}
                >
                  {city.name}
                </div>
              </div>
            </foreignObject>
          </g>
        );
      })}

      {/* 欧洲城市卡片 */}
      {cityData.europeanCities.map((city, index) => {
        const { x, y } = convertToSVGCoordinates(city.lat, city.lng);
        const isSelected = selectedCity === city;
        const hasImage = ['London', 'Edinburgh', 'Tromso', 'Reykjavik', 'Rovaniemi', 'Barcelona', 'Seville', 'Lisbon', 'Porto'].includes(city.name);
        return isSelected && (
          <g key={`europe-card-${index}`}>
            <path
              d={`M ${x} ${y} L ${x} ${y - 12}`}
              stroke="rgba(255, 255, 255, 0.8)"
              strokeWidth="1"
              fill="none"
            />
            <foreignObject
              x={x - (hasImage ? 70 : 52.5)}
              y={y - 45}
              width={hasImage ? 140 : 105}
              height="32"
              style={{
                overflow: 'visible'
              }}
            >
              <div
                style={{
                  position: 'relative',
                  display: 'inline-block',
                  borderRadius: '20px',
                  padding: '0.5px',
                  background: 'transparent',
                  transform: 'translateX(-50%)',
                  left: '50%'
                }}
              >
                <div
                  style={{
                    padding: '0 12px',
                    borderRadius: '20px',
                    background: 'rgba(76, 164, 124, 0.3)',
                    backdropFilter: 'blur(15px)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: 'white',
                    fontSize: '14px',
                    fontFamily: 'system-ui, -apple-system, sans-serif',
                    height: '32px',
                    whiteSpace: 'nowrap',
                    border: '0.5px solid rgba(255, 255, 255, 0.6)',
                    boxSizing: 'border-box',
                    gap: '4px'
                  }}
                >
                  {hasImage && (
                    <div
                      style={{
                        width: '12px',
                        height: '12px',
                        background: 'rgba(255, 255, 255, 0.2)',
                        borderRadius: '2px'
                      }}
                    />
                  )}
                  {city.name}
                </div>
              </div>
            </foreignObject>
          </g>
        );
      })}
    </g>
  );
};

export default CityMarkers; 