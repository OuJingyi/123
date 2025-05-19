import React from 'react';
import { cityData } from '../data/cityData';

const CityMarkers = ({ onCityClick }) => {
  // 将经纬度转换为SVG坐标的函数
  const convertToSVGCoordinates = (lat, lng) => {
    // 将经纬度转换为SVG坐标
    const x = ((lng + 180) / 360) * 1000; // SVG宽度为1000
    const y = ((90 - lat) / 180) * 500;   // SVG高度为500
    return { x, y };
  };

  return (
    <g className="city-markers">
      {/* 中国城市标记 */}
      {cityData.chineseCities.map((city, index) => {
        const { x, y } = convertToSVGCoordinates(city.lat, city.lng);
        return (
          <g
            key={`china-${index}`}
            className="city-marker"
            onMouseEnter={() => onCityClick && onCityClick(city)}
            onMouseLeave={() => onCityClick && onCityClick(null)}
            style={{ cursor: 'pointer' }}
          >
            <circle
              cx={x}
              cy={y}
              r="3"
              fill="rgba(100, 204, 161, 0.8)"
              onMouseEnter={() => onCityClick && onCityClick(city)}
              onMouseLeave={() => onCityClick && onCityClick(null)}
              onClick={() => onCityClick(city)}
            />
          </g>
        );
      })}

      {/* 欧洲城市标记 */}
      {cityData.europeanCities.map((city, index) => {
        const { x, y } = convertToSVGCoordinates(city.lat, city.lng);
        return (
          <g
            key={`europe-${index}`}
            className="city-marker"
            onMouseEnter={() => onCityClick && onCityClick(city)}
            onMouseLeave={() => onCityClick && onCityClick(null)}
            style={{ cursor: 'pointer' }}
          >
            <circle
              cx={x}
              cy={y}
              r="3"
              fill="rgba(100, 204, 161, 0.8)"
              onMouseEnter={() => onCityClick && onCityClick(city)}
              onMouseLeave={() => onCityClick && onCityClick(null)}
              onClick={() => onCityClick(city)}
            />
          </g>
        );
      })}
    </g>
  );
};

export default CityMarkers; 