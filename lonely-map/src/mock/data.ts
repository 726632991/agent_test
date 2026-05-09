import type { Mark, User, Statistics } from '../types';

// 模拟用户数据
export const mockUser: User = {
  id: 1,
  username: '孤独旅者',
  avatarUrl: 'https://api.dicebear.com/7.x/avataaars/svg?seed=lonely',
  createdAt: '2024-01-15T10:00:00Z',
};

// 模拟标记数据
export const mockMarks: Mark[] = [
  {
    id: 1,
    userId: 1,
    latitude: 39.9042,
    longitude: 116.4074,
    addressName: '北京市东城区王府井大街',
    markType: 'meal',
    description: '一个人吃了一顿很棒的晚餐，餐厅很安静，适合独自思考。',
    photoUrls: [
      'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=400',
    ],
    isPublic: false,
    createdAt: '2024-03-15T18:30:00Z',
  },
  {
    id: 2,
    userId: 1,
    latitude: 31.2304,
    longitude: 121.4737,
    addressName: '上海市黄浦区外滩',
    markType: 'travel',
    description: '第一次一个人来上海，在外滩走了很久，看着对岸的灯光，感觉很自由。',
    photoUrls: [
      'https://images.unsplash.com/photo-1474181625751-aps7f7e1b724?w=400',
    ],
    isPublic: true,
    createdAt: '2024-04-20T20:00:00Z',
  },
  {
    id: 3,
    userId: 1,
    latitude: 22.5431,
    longitude: 114.0579,
    addressName: '深圳市南山区科技园',
    markType: 'movie',
    description: '看了一部文艺片，影院里人不多，哭得很大声也没人注意到。',
    photoUrls: [],
    isPublic: false,
    createdAt: '2024-05-10T15:45:00Z',
  },
  {
    id: 4,
    userId: 1,
    latitude: 30.5728,
    longitude: 104.0668,
    addressName: '成都市锦江区春熙路',
    markType: 'meal',
    description: '一个人吃火锅，服务员问了好几次"就一位吗"，但还是觉得挺自在的。',
    photoUrls: [
      'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=400',
    ],
    isPublic: false,
    createdAt: '2024-06-05T12:00:00Z',
  },
  {
    id: 5,
    userId: 1,
    latitude: 34.3416,
    longitude: 108.9398,
    addressName: '西安市碑林区钟楼',
    markType: 'travel',
    description: '独自旅行的第一站，站在钟楼底下，突然觉得自己长大了。',
    photoUrls: [
      'https://images.unsplash.com/photo-1599571234909-29ed5d1321d6?w=400',
      'https://images.unsplash.com/photo-1578632292335-df3abbb0d586?w=400',
    ],
    isPublic: true,
    createdAt: '2024-07-18T10:30:00Z',
  },
  {
    id: 6,
    userId: 1,
    latitude: 29.4316,
    longitude: 106.9123,
    addressName: '重庆市渝中区洪崖洞',
    markType: 'travel',
    description: '夜里的洪崖洞真的很美，一个人走走停停，拍了很多照片。',
    photoUrls: [
      'https://images.unsplash.com/photo-1519681393784-d120267933ba?w=400',
    ],
    isPublic: false,
    createdAt: '2024-08-22T21:15:00Z',
  },
  {
    id: 7,
    userId: 1,
    latitude: 39.9042,
    longitude: 116.4074,
    addressName: '北京市海淀区中关村',
    markType: 'hospital',
    description: '一个人去医院体检，还好身体没问题。独自面对健康的感觉很奇妙。',
    photoUrls: [],
    isPublic: false,
    createdAt: '2024-09-10T09:00:00Z',
  },
];

// 模拟统计数据
export const mockStatistics: Statistics = {
  totalMarks: mockMarks.length,
  totalCities: 6, // 北京、上海、深圳、成都、西安、重庆
  totalDistance: 3500, // 模拟总里程（公里）
  farthestMark: mockMarks[4], // 西安是最远的
  markTypeCount: {
    meal: 2,
    movie: 1,
    hospital: 1,
    travel: 3,
    other: 0,
  },
};

// 标记类型的中文映射
export const markTypeLabels: Record<string, string> = {
  meal: '独自吃饭',
  movie: '独自看电影',
  hospital: '独自去医院',
  travel: '独自旅行',
  other: '其他',
};

// 标记类型的颜色映射
export const markTypeColors: Record<string, string> = {
  meal: '#FF6B6B',
  movie: '#4ECDC4',
  hospital: '#95E1D3',
  travel: '#F38181',
  other: '#AAAAAA',
};
