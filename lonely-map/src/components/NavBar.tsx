import React from 'react';
import { Link, useLocation } from 'react-router-dom';

const NavBar: React.FC = () => {
  const location = useLocation();

  const isActive = (path: string) => {
    return location.pathname === path;
  };

  return (
    <nav className="bg-white shadow-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2">
            <span className="text-2xl">🗺️</span>
            <span className="text-xl font-bold text-gray-800">地图上的孤独</span>
          </Link>

          {/* 导航链接 */}
          <div className="flex items-center gap-6">
            <Link
              to="/"
              className={`px-4 py-2 rounded-lg transition-colors ${
                isActive('/')
                  ? 'bg-indigo-100 text-indigo-700 font-semibold'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              🗺️ 地图
            </Link>
            <Link
              to="/marks"
              className={`px-4 py-2 rounded-lg transition-colors ${
                isActive('/marks')
                  ? 'bg-indigo-100 text-indigo-700 font-semibold'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              📝 记录列表
            </Link>
            <Link
              to="/add"
              className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors font-semibold"
            >
              ✏️ 记录新地点
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default NavBar;
