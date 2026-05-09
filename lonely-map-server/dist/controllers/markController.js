"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getStatistics = exports.deleteMark = exports.updateMark = exports.createMark = exports.getMarks = void 0;
const database_1 = __importDefault(require("../config/database"));
// 获取用户所有标记
const getMarks = async (req, res) => {
    try {
        const userId = req.userId;
        const [marks] = await database_1.default.query('SELECT * FROM marks WHERE user_id = ? ORDER BY created_at DESC', [userId]);
        res.json({ marks });
    }
    catch (error) {
        console.error('Get marks error:', error);
        res.status(500).json({ message: '服务器错误' });
    }
};
exports.getMarks = getMarks;
// 创建新标记
const createMark = async (req, res) => {
    try {
        const userId = req.userId;
        const { latitude, longitude, addressName, markType, description, photoUrls, isPublic, } = req.body;
        if (!latitude || !longitude || !addressName || !markType) {
            return res.status(400).json({ message: '缺少必要参数' });
        }
        const [result] = await database_1.default.query(`INSERT INTO marks (user_id, latitude, longitude, address_name, mark_type, description, photo_urls, is_public)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?)`, [
            userId,
            latitude,
            longitude,
            addressName,
            markType,
            description || null,
            JSON.stringify(photoUrls || []),
            isPublic ? 1 : 0,
        ]);
        res.status(201).json({
            message: '标记创建成功',
            markId: result.insertId,
        });
    }
    catch (error) {
        console.error('Create mark error:', error);
        res.status(500).json({ message: '服务器错误' });
    }
};
exports.createMark = createMark;
// 更新标记
const updateMark = async (req, res) => {
    try {
        const userId = req.userId;
        const markId = parseInt(req.params.id);
        const { description, photoUrls, isPublic } = req.body;
        // 检查标记是否存在且属于该用户
        const [marks] = await database_1.default.query('SELECT * FROM marks WHERE id = ? AND user_id = ?', [markId, userId]);
        if (marks.length === 0) {
            return res.status(404).json({ message: '标记不存在或无权修改' });
        }
        await database_1.default.query(`UPDATE marks SET description = ?, photo_urls = ?, is_public = ? WHERE id = ?`, [
            description || marks[0].description,
            JSON.stringify(photoUrls || JSON.parse(marks[0].photo_urls)),
            isPublic !== undefined ? (isPublic ? 1 : 0) : marks[0].is_public,
            markId,
        ]);
        res.json({ message: '标记更新成功' });
    }
    catch (error) {
        console.error('Update mark error:', error);
        res.status(500).json({ message: '服务器错误' });
    }
};
exports.updateMark = updateMark;
// 删除标记
const deleteMark = async (req, res) => {
    try {
        const userId = req.userId;
        const markId = parseInt(req.params.id);
        const [result] = await database_1.default.query('DELETE FROM marks WHERE id = ? AND user_id = ?', [markId, userId]);
        if (result.affectedRows === 0) {
            return res.status(404).json({ message: '标记不存在或无权删除' });
        }
        res.json({ message: '标记删除成功' });
    }
    catch (error) {
        console.error('Delete mark error:', error);
        res.status(500).json({ message: '服务器错误' });
    }
};
exports.deleteMark = deleteMark;
// 获取统计数据
const getStatistics = async (req, res) => {
    try {
        const userId = req.userId;
        const [marks] = await database_1.default.query('SELECT * FROM marks WHERE user_id = ?', [userId]);
        // 计算统计信息
        const totalMarks = marks.length;
        const cities = new Set(marks.map((m) => m.address_name.split('市')[0] + '市'));
        const totalCities = cities.size;
        // 计算总里程（简化版：累加所有标记点之间的距离）
        let totalDistance = 0;
        for (let i = 1; i < marks.length; i++) {
            const prev = marks[i - 1];
            const curr = marks[i];
            const dist = getDistance(prev.latitude, prev.longitude, curr.latitude, curr.longitude);
            totalDistance += dist;
        }
        // 找出最远的标记（简化：距离第一个标记最远的）
        let farthestMark = null;
        if (marks.length > 0) {
            const firstMark = marks[0];
            let maxDist = 0;
            for (const mark of marks) {
                const dist = getDistance(firstMark.latitude, firstMark.longitude, mark.latitude, mark.longitude);
                if (dist > maxDist) {
                    maxDist = dist;
                    farthestMark = mark;
                }
            }
        }
        // 统计各类型数量
        const markTypeCount = {
            meal: 0,
            movie: 0,
            hospital: 0,
            travel: 0,
            other: 0,
        };
        marks.forEach((m) => {
            markTypeCount[m.mark_type]++;
        });
        res.json({
            statistics: {
                totalMarks,
                totalCities,
                totalDistance: Math.round(totalDistance),
                farthestMark,
                markTypeCount,
            },
        });
    }
    catch (error) {
        console.error('Get statistics error:', error);
        res.status(500).json({ message: '服务器错误' });
    }
};
exports.getStatistics = getStatistics;
// 计算两个经纬度之间的距离（Haversine 公式，返回公里）
function getDistance(lat1, lon1, lat2, lon2) {
    const R = 6371; // 地球半径（公里）
    const dLat = ((lat2 - lat1) * Math.PI) / 180;
    const dLon = ((lon2 - lon1) * Math.PI) / 180;
    const a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
        Math.cos((lat1 * Math.PI) / 180) *
            Math.cos((lat2 * Math.PI) / 180) *
            Math.sin(dLon / 2) *
            Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return R * c;
}
