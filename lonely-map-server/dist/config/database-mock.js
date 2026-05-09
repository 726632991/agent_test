"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class MockDatabase {
    constructor() {
        this.users = [
            {
                id: 1,
                username: 'test_user',
                password_hash: '$2b$10$YourHashedPasswordHere', // 实际应使用 bcrypt 加密
                avatar_url: null,
                created_at: new Date(),
            },
        ];
        this.marks = [
            {
                id: 1,
                user_id: 1,
                latitude: 39.9042,
                longitude: 116.4074,
                address_name: '北京市东城区王府井大街',
                mark_type: 'meal',
                description: '一个人吃了一顿很棒的晚餐',
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
                description: '第一次一个人来上海',
                photo_urls: JSON.stringify([]),
                is_public: 1,
                created_at: new Date('2024-04-20'),
                updated_at: new Date(),
            },
        ];
    }
    query(sql, params) {
        console.log('Mock DB Query:', sql, params);
        // 简化版：实际应解析 SQL 并返回对应数据
        return this.marks;
    }
}
const mockDb = new MockDatabase();
exports.default = {
    query: (sql, params) => {
        return Promise.resolve([mockDb.query(sql, params)]);
    },
};
