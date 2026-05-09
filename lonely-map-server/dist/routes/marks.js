"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const auth_1 = require("../middleware/auth");
const markController_1 = require("../controllers/markController");
const router = (0, express_1.Router)();
// 所有标记路由都需要认证
router.use(auth_1.authMiddleware);
// 获取用户所有标记
router.get('/', markController_1.getMarks);
// 创建新标记
router.post('/', markController_1.createMark);
// 更新标记
router.put('/:id', markController_1.updateMark);
// 删除标记
router.delete('/:id', markController_1.deleteMark);
// 获取统计数据
router.get('/statistics', markController_1.getStatistics);
exports.default = router;
