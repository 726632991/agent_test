// 标记类型枚举
export type MarkType = 'meal' | 'movie' | 'hospital' | 'travel' | 'other';

// 标记数据接口
export interface Mark {
  id: number;
  userId: number;
  latitude: number;
  longitude: number;
  addressName: string;
  markType: MarkType;
  description: string;
  photoUrls: string[];
  isPublic: boolean;
  createdAt: string;
}

// 用户接口
export interface User {
  id: number;
  username: string;
  avatarUrl: string;
  createdAt: string;
}

// 统计数据接口
export interface Statistics {
  totalMarks: number;
  totalCities: number;
  totalDistance: number;
  farthestMark: Mark | null;
  markTypeCount: Record<MarkType, number>;
}
