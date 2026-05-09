import React, { useState, useEffect } from 'react';
import { getMarks } from '../services/api';
import type { Mark } from '../types';
import StaticMap from '../components/StaticMap';
import MarkPopup from '../components/MarkPopup';
import { mockMarks } from '../mock/data';

const MapPage: React.FC = () => {
  const [selectedMark, setSelectedMark] = useState<Mark | null>(null);
  const [marks, setMarks] = useState<Mark[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getMarks();
        setMarks(data);
      } catch (error) {
        console.error('Failed to fetch marks, using mock data:', error);
        setMarks(mockMarks);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleSelectMark = (mark: Mark) => {
    setSelectedMark(mark);
  };

  const handleClosePopup = () => {
    setSelectedMark(null);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-indigo-50 to-purple-50 flex items-center justify-center">
        <div className="text-2xl text-gray-600">加载中...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 to-purple-50 p-6">
      {/* 页面标题 */}
      <div className="max-w-7xl mx-auto mb-6">
        <h1 className="text-4xl font-bold text-gray-800 mb-2">
          地图上的孤独
        </h1>
        <p className="text-gray-600">
          记录你独自去过的地方，纪念每一次"一个人完成"的时刻
        </p>
      </div>

      {/* 地图容器 */}
      <div className="max-w-7xl mx-auto">
        <StaticMap
          marks={marks}
          onSelectMark={handleSelectMark}
          selectedMark={selectedMark}
        />
      </div>

      {/* 标记详情弹窗 */}
      {selectedMark && (
        <MarkPopup mark={selectedMark} onClose={handleClosePopup} />
      )}

      {/* 底部信息 */}
      <div className="max-w-7xl mx-auto mt-6 text-center text-sm text-gray-500">
        <p>💡 数据来源：{marks === mockMarks ? '模拟数据' : '后端 API'}</p>
      </div>
    </div>
  );
};

export default MapPage;
