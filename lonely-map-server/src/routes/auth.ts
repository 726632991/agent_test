import { Router } from 'express';
import { register, login } from '../controllers/authController';

const router = Router();

// 用户注册
router.post('/register', register);

// 用户登录
router.post('/login', login);

export default router;
