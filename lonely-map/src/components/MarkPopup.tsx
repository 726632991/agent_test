import React from 'react';
import type { Mark } from '../types';
import { markTypeLabels, markTypeColors } from '../mock/data';

interface MarkPopupProps {
  mark: Mark;
  onClose: () => void;
}

const MarkPopup: React.FC<MarkPopupProps> = ({ mark, onClose }) => {
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('zh-CN', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4" onClick={onClose}>
      <div
        className="bg-white rounded-2xl shadow-2xl max-w-md w-full max-h-[90vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        {/* 照片区域 */}
        {mark.photoUrls.length > 0 && (
          <div className="relative h-48 bg-gray-200 rounded-t-2xl overflow-hidden">
            <img
              src={mark.photoUrls[0]}
              alt={mark.addressName}
              className="w-full h-full object-cover"
            />
            {mark.photoUrls.length > 1 && (
              <div className="absolute bottom-2 right-2 bg-black/70 text-white text-xs px-2 py-1 rounded">
                +{mark.photoUrls.length - 1} 张照片
              </div>
            )}
          </div>
        )}

        {/* 内容区域 */}
        <div className="p-6">
          {/* 关闭按钮 */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 w-8 h-8 bg-white/80 hover:bg-white rounded-full flex items-center justify-center text-gray-600 hover:text-gray-900 transition-colors"
          >
            ✕
          </button>

          {/* 类型标签 */}
          <div
            className="inline-block px-3 py-1 rounded-full text-white text-sm font-medium mb-3"
            style={{ backgroundColor: markTypeColors[mark.markType] }}
          >
            {markTypeLabels[mark.markType]}
          </div>

          {/* 地址 */}
          <h3 className="text-xl font-bold text-gray-800 mb-2">
            📍 {mark.addressName}
          </h3>

          {/* 日期 */}
          <p className="text-sm text-gray-500 mb-4">
            {formatDate(mark.createdAt)}
          </p>

          {/* 描述 */}
          <p className="text-gray-700 leading-relaxed mb-4">
            {mark.description}
          </p>

          {/* 公开状态 */}
          {mark.isPublic && (
            <div className="flex items-center gap-2 text-sm text-green-600">
              <span>🌍</span>
              <span>已匿名公开到公共地图</span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default MarkPopup;
