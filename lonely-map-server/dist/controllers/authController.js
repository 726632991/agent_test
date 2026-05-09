"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.login = exports.register = void 0;
const bcrypt_1 = __importDefault(require("bcrypt"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const dotenv_1 = __importDefault(require("dotenv"));
const database_1 = __importDefault(require("../config/database"));
dotenv_1.default.config();
const register = async (req, res) => {
    try {
        const { username, password } = req.body;
        if (!username || !password) {
            return res.status(400).json({ message: '用户名和密码不能为空' });
        }
        // 检查用户是否存在
        const [existingUsers] = await database_1.default.query('SELECT * FROM users WHERE username = ?', [username]);
        if (existingUsers.length > 0) {
            return res.status(400).json({ message: '用户名已存在' });
        }
        // 加密密码
        const passwordHash = await bcrypt_1.default.hash(password, 10);
        // 创建用户
        const [result] = await database_1.default.query('INSERT INTO users (username, password_hash) VALUES (?, ?)', [username, passwordHash]);
        res.status(201).json({
            message: '注册成功',
            userId: result.insertId,
        });
    }
    catch (error) {
        console.error('Registration error:', error);
        res.status(500).json({ message: '服务器错误' });
    }
};
exports.register = register;
const login = async (req, res) => {
    try {
        const { username, password } = req.body;
        if (!username || !password) {
            return res.status(400).json({ message: '用户名和密码不能为空' });
        }
        // 查找用户
        const [users] = await database_1.default.query('SELECT * FROM users WHERE username = ?', [username]);
        if (users.length === 0) {
            return res.status(401).json({ message: '用户名或密码错误' });
        }
        const user = users[0];
        // 验证密码
        const isValidPassword = await bcrypt_1.default.compare(password, user.password_hash);
        if (!isValidPassword) {
            return res.status(401).json({ message: '用户名或密码错误' });
        }
        // 生成 JWT
        const token = jsonwebtoken_1.default.sign({ userId: user.id, username: user.username }, process.env.JWT_SECRET, { expiresIn: process.env.JWT_EXPIRES_IN || '7d' });
        res.json({
            message: '登录成功',
            token,
            user: {
                id: user.id,
                username: user.username,
                avatarUrl: user.avatar_url,
            },
        });
    }
    catch (error) {
        console.error('Login error:', error);
        res.status(500).json({ message: '服务器错误' });
    }
};
exports.login = login;
