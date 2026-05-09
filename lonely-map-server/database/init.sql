-- 创建数据库
CREATE DATABASE IF NOT EXISTS lonely_map CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
USE lonely_map;

-- 用户表
CREATE TABLE IF NOT EXISTS users (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(50) NOT NULL UNIQUE,
    password_hash VARCHAR(255) NOT NULL,
    avatar_url VARCHAR(500) DEFAULT NULL,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- 地点标记表
CREATE TABLE IF NOT EXISTS marks (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    user_id BIGINT NOT NULL,
    latitude DECIMAL(10, 7) NOT NULL,
    longitude DECIMAL(10, 7) NOT NULL,
    address_name VARCHAR(255) NOT NULL COMMENT '逆地理编码得到的地址',
    mark_type ENUM('meal', 'movie', 'hospital', 'travel', 'other') NOT NULL,
    description TEXT,
    photo_urls JSON COMMENT '照片URL数组',
    is_public TINYINT(1) DEFAULT 0 COMMENT '是否匿名公开到公共地图',
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
    INDEX idx_user_id (user_id),
    INDEX idx_created_at (created_at)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- 创建测试用户（密码：123456）
-- 密码使用 bcrypt 加密，这里只是示例
INSERT INTO users (username, password_hash) VALUES
('test_user', '$2b$10$YourHashedPasswordHere')
ON DUPLICATE KEY UPDATE username=username;

-- 创建示例标记数据
INSERT INTO marks (user_id, latitude, longitude, address_name, mark_type, description, photo_urls, is_public) VALUES
(1, 39.9042, 116.4074, '北京市东城区王府井大街', 'meal', '一个人吃了一顿很棒的晚餐', JSON_ARRAY(), 0),
(1, 31.2304, 121.4737, '上海市黄浦区外滩', 'travel', '第一次一个人来上海', JSON_ARRAY(), 1)
ON DUPLICATE KEY UPDATE id=id;
