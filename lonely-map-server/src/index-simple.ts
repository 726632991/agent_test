import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';

const app = express();
const PORT = process.env.PORT || 3000;

// 模拟数据
let users: any[] = [
  {
    id: 1,
    username: 'test_user',
    password_hash: '$2b$10$YourHashedPasswordHere', // 实际应使用 bcrypt
    avatar_url: null,
    created_at: new Date(),
  },
];

let marks: any[] = [
  {
    id: 1,
    user_id: 1,
    latitude: 39.9042,
    longitude: 116.4074,
    address_name: '北京市东城区王府井大街',
    mark_type: 'meal',
    description: '一个人吃了一顿很棒的晚餐，餐厅很安静，适合独自思考。',
    photo_urls: JSON.stringify([]),
    is_public: 0,
    created_at: new Date('2024-03-15'),
    updated_at: new Date(),
  },
  {
    id: 2,
    user_id: 1,
    latitude: 31.2304,
    longitude: 121.4737,
    address_name: '上海市黄浦区外滩',
    mark_type: 'travel',
    description: '第一次一个人来上海，在外滩走了很久。',
    photo_urls: JSON.stringify([]),
    is_public: 1,
    created_at: new Date('2024-04-20'),
    updated_at: new Date(),
  },
];

let nextMarkId = 3;

// 中间件
app.use(cors({ origin: true, credentials: true }));
app.use(bodyParser.json());

// 健康检查
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', message: 'Lonely Map API is running (Simple Mode)' });
});

// 登录（简化版，不验证密码）
app.post('/api/auth/login', (req, res) => {
  const { username } = req.body;
  const user = users.find(u => u.username === username);
  
  if (!user) {
    return res.status(401).json({ message: '用户不存在' });
  }
  
  // 简化版：直接返回成功（实际应使用 JWT）
  res.json({
    message: '登录成功',
    token: 'mock-token-123',
    user: {
      id: user.id,
      username: user.username,
      avatarUrl: user.avatar_url,
    },
  });
});

// 注册（简化版）
app.post('/api/auth/register', (req, res) => {
  const { username, password } = req.body;
  
  const existingUser = users.find(u => u.username === username);
  if (existingUser) {
    return res.status(400).json({ message: '用户名已存在' });
  }
  
  const newUser = {
    id: users.length + 1,
    username,
    password_hash: 'hashed-' + password,
    avatar_url: null,
    created_at: new Date(),
  };
  
  users.push(newUser);
  
  res.status(201).json({
    message: '注册成功',
    userId: newUser.id,
  });
});

// 获取所有标记（简化版，不验证 token）
app.get('/api/marks', (req, res) => {
  const userId = 1; // 简化：假设用户 ID 为 1
  const userMarks = marks.filter(m => m.user_id === userId);
  res.json({ marks: userMarks });
});

// 创建标记
app.post('/api/marks', (req, res) => {
  const userId = 1; // 简化：假设用户 ID 为 1
  const { latitude, longitude, addressName, markType, description, photoUrls, isPublic } = req.body;
  
  const newMark = {
    id: nextMarkId++,
    user_id: userId,
    latitude,
    longitude,
    address_name: addressName,
    mark_type: markType,
    description: description || '',
    photo_urls: JSON.stringify(photoUrls || []),
    is_public: isPublic ? 1 : 0,
    created_at: new Date(),
    updated_at: new Date(),
  };
  
  marks.push(newMark);
  
  res.status(201).json({
    message: '标记创建成功',
    markId: newMark.id,
  });
});

// 获取统计
app.get('/api/marks/statistics', (req, res) => {
  const userId = 1;
  const userMarks = marks.filter(m => m.user_id === userId);
  
  const totalMarks = userMarks.length;
  const cities = new Set(userMarks.map(m => m.address_name.split('市')[0] + '市'));
  
  res.json({
    statistics: {
      totalMarks,
      totalCities: cities.size,
      totalDistance: 3500, // 模拟
      farthestMark: userMarks[userMarks.length - 1] || null,
      markTypeCount: {
        meal: userMarks.filter(m => m.mark_type === 'meal').length,
        movie: userMarks.filter(m => m.mark_type === 'movie').length,
        hospital: userMarks.filter(m => m.mark_type === 'hospital').length,
        travel: userMarks.filter(m => m.mark_type === 'travel').length,
        other: userMarks.filter(m => m.mark_type === 'other').length,
      },
    },
  });
});

// 启动服务器
app.listen(PORT, () => {
  console.log(`🚀 Server is running on port ${PORT}`);
  console.log(`📍 API available at http://localhost:${PORT}/api`);
  console.log(`⚠️  Running in SIMPLE mode (no database required)`);
});

export default app;
