import React from 'react';

const TravelStoryCard = ({ city, country, imageUrl, description }) => {
  return (
    <div className="min-w-[300px] bg-gray-900 rounded-lg overflow-hidden transition-transform duration-300 hover:scale-[1.02] hover:z-10 relative">
      <img 
        src={imageUrl || `https://nocode.meituan.com/photo/search?keyword=travel,landscape&width=300&height=200`} 
        className="w-full h-48 object-cover" 
        alt={`${city} 旅行故事`} 
      />
      <div className="p-4">
        <h3 className="text-xl font-semibold mb-2">{city}, {country}</h3>
        <p className="text-gray-400">{description || "这是一段旅行故事的简短描述，记录下旅途中的精彩瞬间..."}</p>
      </div>
    </div>
  );
};

export default TravelStoryCard; 