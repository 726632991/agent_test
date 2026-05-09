import React from 'react';
import type { Mark } from '../types';
import { markTypeLabels, markTypeColors } from '../mock/data';

interface StaticMapProps {
  marks: Mark[];
  onSelectMark: (mark: Mark) => void;
  selectedMark: Mark | null;
}

// 将经纬度转换为模拟的像素坐标（简化版）
const convertToPixel = (lat: number, lng: number) => {
  // 中国大致范围：纬度 18-53，经度 73-135
  const minLat = 18;
  const maxLat = 53;
  const minLng = 73;
  const maxLng = 135;
  
  const x = ((lng - minLng) / (maxLng - minLng)) * 100;
  const y = (1 - (lat - minLat) / (maxLat - minLat)) * 100;
  
  return { x: `${Math.max(5, Math.min(95, x))}%`, y: `${Math.max(5, Math.min(95, y))}%` };
};

const StaticMap: React.FC<StaticMapProps> = ({ marks, onSelectMark, selectedMark }) => {
  return (
    <div className="relative w-full h-[600px] bg-gradient-to-br from-blue-100 to-green-100 rounded-lg overflow-hidden shadow-lg">
      {/* 模拟地图背景 */}
      <div className="absolute inset-0 opacity-20">
        <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
          {/* 简单的网格线模拟地图 */}
          {Array.from({ length: 20 }).map((_, i) => (
            <line
              key={`h-${i}`}
              x1="0"
              y1={`${i * 5}%`}
              x2="100%"
              y2={`${i * 5}%`}
              stroke="#000"
              strokeWidth="0.5"
            />
          ))}
          {Array.from({ length: 20 }).map((_, i) => (
            <line
              key={`v-${i}`}
              x1={`${i * 5}%`}
              y1="0"
              x2={`${i * 5}%`}
              y2="100%"
              stroke="#000"
              strokeWidth="0.5"
            />
          ))}
        </svg>
      </div>

      {/* 地图标题 */}
      <div className="absolute top-4 left-4 bg-white/90 px-4 py-2 rounded-lg shadow-md z-10">
        <h3 className="text-lg font-semibold text-gray-800">🗺️ 我的孤独地图</h3>
        <p className="text-sm text-gray-600">点击标记查看详情</p>
      </div>

      {/* 标记点 */}
      {marks.map((mark) => {
        const position = convertToPixel(mark.latitude, mark.longitude);
        const isSelected = selectedMark?.id === mark.id;
        
        return (
          <button
            key={mark.id}
            onClick={() => onSelectMark(mark)}
            className={`absolute transform -translate-x-1/2 -translate-y-1/2 transition-all duration-200 hover:scale-125 hover:z-20 ${
              isSelected ? 'scale-125 z-20' : 'z-10'
            }`}
            style={{ left: position.x, top: position.y }}
          >
            <div
              className="w-8 h-8 rounded-full border-3 border-white shadow-lg flex items-center justify-center text-white text-sm font-bold"
              style={{ backgroundColor: markTypeColors[mark.markType] }}
            >
              {mark.id}
            </div>
          </button>
        );
      })}

      {/* 图例 */}
      <div className="absolute bottom-4 right-4 bg-white/90 px-4 py-3 rounded-lg shadow-md">
        <h4 className="text-sm font-semibold text-gray-700 mb-2">图例</h4>
        {Object.entries(markTypeLabels).map(([type, label]) => (
          <div key={type} className="flex items-center gap-2 mb-1">
            <div
              className="w-4 h-4 rounded-full"
              style={{ backgroundColor: markTypeColors[type] }}
            />
            <span className="text-xs text-gray-600">{label}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default StaticMap;
