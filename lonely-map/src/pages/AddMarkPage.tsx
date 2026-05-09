import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { createMark } from '../services/api';
import type { MarkType } from '../types';
import { markTypeLabels, markTypeColors } from '../mock/data';

const AddMarkPage: React.FC = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    markType: '' as MarkType | '',
    addressName: '',
    description: '',
    latitude: '',
    longitude: '',
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.markType || !formData.addressName) {
      alert('请填写必要信息');
      return;
    }

    setLoading(true);
    try {
      await createMark({
        markType: formData.markType as MarkType,
        addressName: formData.addressName,
        description: formData.description,
        latitude: parseFloat(formData.latitude) || 39.9042,
        longitude: parseFloat(formData.longitude) || 116.4074,
        photoUrls: [],
        isPublic: false,
      });
      
      alert('🎉 标记创建成功！');
      navigate('/');
    } catch (error: any) {
      alert(`创建失败：${error.message || '未知错误'}`);
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 to-purple-50 p-6">
      <div className="max-w-2xl mx-auto">
        {/* 页面标题 */}
        <div className="mb-8">
          <button
            onClick={() => navigate('/')}
            className="text-indigo-600 hover:text-indigo-800 mb-4 inline-flex items-center gap-2"
          >
            ← 返回地图
          </button>
          <h1 className="text-4xl font-bold text-gray-800 mb-2">
            ✏️ 记录新的孤独时刻
          </h1>
          <p className="text-gray-600">记录你独自去过的地方</p>
        </div>

        {/* 表单 */}
        <form onSubmit={handleSubmit} className="bg-white rounded-2xl shadow-lg p-8 space-y-6">
          {/* 标记类型 */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-3">
              标记类型 <span className="text-red-500">*</span>
            </label>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
              {Object.entries(markTypeLabels).map(([type, label]) => (
                <button
                  key={type}
                  type="button"
                  onClick={() => handleChange('markType', type)}
                  className={`px-4 py-3 rounded-lg border-2 transition-all ${
                    formData.markType === type
                      ? 'border-indigo-500 bg-indigo-50 text-indigo-700'
                      : 'border-gray-200 hover:border-gray-300 text-gray-600'
                  }`}
                >
                  <div
                    className="w-3 h-3 rounded-full inline-block mr-2"
                    style={{ backgroundColor: markTypeColors[type] }}
                  />
                  {label}
                </button>
              ))}
            </div>
          </div>

          {/* 地址名称 */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              地点名称 <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              value={formData.addressName}
              onChange={(e) => handleChange('addressName', e.target.value)}
              placeholder="例如：北京市东城区王府井大街"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
              required
            />
          </div>

          {/* 经纬度 */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                纬度
              </label>
              <input
                type="number"
                step="0.000001"
                value={formData.latitude}
                onChange={(e) => handleChange('latitude', e.target.value)}
                placeholder="例如：39.9042"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                经度
              </label>
              <input
                type="number"
                step="0.000001"
                value={formData.longitude}
                onChange={(e) => handleChange('longitude', e.target.value)}
                placeholder="例如：116.4074"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
              />
            </div>
          </div>

          {/* 描述 */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              记录描述
            </label>
            <textarea
              value={formData.description}
              onChange={(e) => handleChange('description', e.target.value)}
              placeholder="写下你此刻的感受..."
              rows={4}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent resize-none"
            />
          </div>

          {/* 提交按钮 */}
          <div className="flex gap-4">
            <button
              type="submit"
              disabled={loading}
              className={`flex-1 py-3 rounded-lg font-semibold transition-colors ${
                loading
                  ? 'bg-gray-400 cursor-not-allowed'
                  : 'bg-indigo-600 hover:bg-indigo-700 text-white'
              }`}
            >
              {loading ? '保存中...' : '保存记录'}
            </button>
            <button
              type="button"
              onClick={() => navigate('/')}
              className="px-8 py-3 border border-gray-300 rounded-lg font-semibold hover:bg-gray-50 transition-colors"
            >
              取消
            </button>
          </div>
        </form>

        {/* 提示信息 */}
        <div className="mt-6 bg-green-50 border border-green-200 rounded-lg p-4">
          <p className="text-sm text-green-800">
            ✅ <strong>已连接到后端 API</strong><br />
            数据将保存到服务器（当前为模拟模式）
          </p>
        </div>
      </div>
    </div>
  );
};

export default AddMarkPage;
