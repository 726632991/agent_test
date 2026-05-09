import { Router } from 'express';
import { authMiddleware } from '../middleware/auth';
import {
  getMarks,
  createMark,
  updateMark,
  deleteMark,
  getStatistics,
} from '../controllers/markController';

const router = Router();

// 所有标记路由都需要认证
router.use(authMiddleware);

// 获取用户所有标记
router.get('/', getMarks);

// 创建新标记
router.post('/', createMark);

// 更新标记
router.put('/:id', updateMark);

// 删除标记
router.delete('/:id', deleteMark);

// 获取统计数据
router.get('/statistics', getStatistics);

export default router;
