import type { Mark, Statistics } from '../types';

const API_BASE_URL = 'http://localhost:3000/api';

// 登录
export const login = async (username: string, password: string) => {
  const response = await fetch(`${API_BASE_URL}/auth/login`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ username, password }),
  });
  
  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.message || '登录失败');
  }
  
  return response.json();
};

// 注册
export const register = async (username: string, password: string) => {
  const response = await fetch(`${API_BASE_URL}/auth/register`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ username, password }),
  });
  
  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.message || '注册失败');
  }
  
  return response.json();
};

// 获取所有标记
export const getMarks = async (): Promise<Mark[]> => {
  const response = await fetch(`${API_BASE_URL}/marks`);
  
  if (!response.ok) {
    throw new Error('获取标记失败');
  }
  
  const data = await response.json();
  return data.marks.map((m: any) => ({
    ...m,
    markType: m.mark_type,
    addressName: m.address_name,
    photoUrls: JSON.parse(m.photo_urls || '[]'),
    isPublic: m.is_public === 1,
    createdAt: m.created_at,
  }));
};

// 创建标记
export const createMark = async (markData: Partial<Mark>) => {
  const response = await fetch(`${API_BASE_URL}/marks`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      latitude: markData.latitude,
      longitude: markData.longitude,
      addressName: markData.addressName,
      markType: markData.markType,
      description: markData.description,
      photoUrls: markData.photoUrls,
      isPublic: markData.isPublic,
    }),
  });
  
  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.message || '创建标记失败');
  }
  
  return response.json();
};

// 获取统计数据
export const getStatistics = async (): Promise<Statistics> => {
  const response = await fetch(`${API_BASE_URL}/marks/statistics`);
  
  if (!response.ok) {
    throw new Error('获取统计数据失败');
  }
  
  const data = await response.json();
  return data.statistics;
};
