import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getMarks, getStatistics } from '../services/api';
import type { Mark, Statistics } from '../types';
import { markTypeLabels, markTypeColors } from '../mock/data';

const MarkListPage: React.FC = () => {
  const navigate = useNavigate();
  const [marks, setMarks] = useState<Mark[]>([]);
  const [statistics, setStatistics] = useState<Statistics | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [marksData, statsData] = await Promise.all([
          getMarks(),
          getStatistics(),
        ]);
        setMarks(marksData);
        setStatistics(statsData);
      } catch (error) {
        console.error('Failed to fetch data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('zh-CN', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  const totalPhotos = marks.reduce((sum, mark) => sum + mark.photoUrls.length, 0);

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-indigo-50 to-purple-50 flex items-center justify-center">
        <div className="text-2xl text-gray-600">加载中...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 to-purple-50 p-6">
      <div className="max-w-4xl mx-auto">
        {/* 页面标题 */}
        <div className="mb-8">
          <button
            onClick={() => navigate('/')}
            className="text-indigo-600 hover:text-indigo-800 mb-4 inline-flex items-center gap-2"
          >
            ← 返回地图
          </button>
          <h1 className="text-4xl font-bold text-gray-800 mb-2">
            📝 所有记录
          </h1>
          <p className="text-gray-600">共 {marks.length} 条孤独时刻</p>
        </div>

        {/* 统计卡片 */}
        {statistics && (
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
            <div className="bg-white rounded-xl p-4 shadow-md">
              <div className="text-3xl font-bold text-indigo-600">{statistics.totalMarks}</div>
              <div className="text-sm text-gray-600">总标记数</div>
            </div>
            <div className="bg-white rounded-xl p-4 shadow-md">
              <div className="text-3xl font-bold text-green-600">{statistics.totalCities}</div>
              <div className="text-sm text-gray-600">城市数</div>
            </div>
            <div className="bg-white rounded-xl p-4 shadow-md">
              <div className="text-3xl font-bold text-purple-600">{statistics.totalDistance}</div>
              <div className="text-sm text-gray-600">总里程(km)</div>
            </div>
            <div className="bg-white rounded-xl p-4 shadow-md">
              <div className="text-3xl font-bold text-orange-600">{totalPhotos}</div>
              <div className="text-sm text-gray-600">照片数</div>
            </div>
          </div>
        )}

        {/* 标记类型统计 */}
        {statistics && (
          <div className="bg-white rounded-2xl shadow-lg p-6 mb-8">
            <h2 className="text-xl font-bold text-gray-800 mb-4">📊 标记类型分布</h2>
            <div className="space-y-3">
              {Object.entries(statistics.markTypeCount).map(([type, count]) => (
                <div key={type} className="flex items-center gap-4">
                  <div className="w-24 text-sm text-gray-600">{markTypeLabels[type as keyof typeof markTypeLabels]}</div>
                  <div className="flex-1 bg-gray-200 rounded-full h-6 overflow-hidden">
                    <div
                      className="h-full rounded-full transition-all"
                      style={{
                        width: `${statistics.totalMarks > 0 ? (count / statistics.totalMarks) * 100 : 0}%`,
                        backgroundColor: markTypeColors[type],
                      }}
                    />
                  </div>
                  <div className="w-8 text-sm font-semibold text-gray-700 text-right">{count}</div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* 标记列表 */}
        <div className="space-y-4">
          {marks.map((mark) => (
            <div
              key={mark.id}
              className="bg-white rounded-xl shadow-md p-6 hover:shadow-lg transition-shadow cursor-pointer"
              onClick={() => navigate('/', { state: { selectedMarkId: mark.id } })}
            >
              <div className="flex gap-4">
                {/* 照片缩略图 */}
                {mark.photoUrls.length > 0 && (
                  <div className="w-24 h-24 rounded-lg overflow-hidden flex-shrink-0">
                    <img
                      src={mark.photoUrls[0]}
                      alt={mark.addressName}
                      className="w-full h-full object-cover"
                    />
                  </div>
                )}

                {/* 内容 */}
                <div className="flex-1">
                  <div className="flex items-start justify-between mb-2">
                    <div>
                      <span
                        className="inline-block px-2 py-1 rounded text-white text-xs font-medium mr-2"
                        style={{ backgroundColor: markTypeColors[mark.markType] }}
                      >
                        {markTypeLabels[mark.markType]}
                      </span>
                      <span className="text-sm text-gray-500">{formatDate(mark.createdAt)}</span>
                    </div>
                    {mark.isPublic && (
                      <span className="text-xs text-green-600 bg-green-50 px-2 py-1 rounded">
                        🌍 已公开
                      </span>
                    )}
                  </div>
                  <h3 className="font-semibold text-gray-800 mb-1">
                    📍 {mark.addressName}
                  </h3>
                  <p className="text-sm text-gray-600 line-clamp-2">{mark.description}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* 底部提示 */}
        <div className="mt-8 text-center text-sm text-gray-500">
          <p>💡 点击记录可查看详情</p>
        </div>
      </div>
    </div>
  );
};

export default MarkListPage;
