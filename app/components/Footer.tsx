'use client';

import { useState, useEffect } from 'react';

interface WakaTimeStats {
  total_seconds: number;
  text: string;
  decimal: string;
  digital: string;
  daily_average: number;
  is_up_to_date: boolean;
  percent_calculated: number;
  range: {
    start_text: string;
    end_text: string;
    timezone: string;
  };
  languages?: Array<{
    name: string;
    total_seconds: number;
    percent: number;
  }>;
}

const Footer = () => {
  const [stats, setStats] = useState<WakaTimeStats | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchWakaTimeStats = async () => {
      try {
        // Cloudflare Worker URL
        const response = await fetch('https://tight-hill-8c38.3420808767.workers.dev');

        if (!response.ok) {
          throw new Error('Failed to fetch WakaTime stats');
        }

        const data = await response.json();
        // API返回的数据在data字段中
        setStats(data.data);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Unknown error');
      } finally {
        setLoading(false);
      }
    };

    fetchWakaTimeStats();
  }, []);

  const formatTime = (seconds: number) => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    return `${hours}h ${minutes}m`;
  };

  return (
    <footer className="bg-gray-900 text-white py-8 mt-auto">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* 个人信息 */}
          <div>
            <h3 className="text-lg font-semibold mb-4">汤兴伟的Web开发探索之旅</h3>
            <p className="text-gray-400">学号: P231014812</p>
            <p className="text-gray-400">专注于现代Web开发技术</p>
          </div>

          {/* WakaTime 统计 */}
          <div>
            <h3 className="text-lg font-semibold mb-4">编程统计</h3>
            {loading ? (
              <div className="text-gray-400">加载中...</div>
            ) : error ? (
              <div className="text-red-400">加载失败: {error}</div>
            ) : stats ? (
              <div className="space-y-3">
                {/* 基础统计 */}
                <div className="space-y-2">
                  <p className="text-gray-400">
                    总编程时间: <span className="text-white font-semibold">{stats.text}</span>
                  </p>
                  <p className="text-gray-400">
                    数字格式: <span className="text-white">{stats.digital}</span>
                  </p>
                  <p className="text-gray-400">
                    日均编程: <span className="text-white">{formatTime(stats.daily_average)}</span>
                  </p>
                </div>

                {/* 统计范围 */}
                <div className="border-t border-gray-700 pt-2">
                  <p className="text-gray-400 text-sm">
                    统计范围: <span className="text-gray-300">{stats.range.start_text}</span> 至 <span className="text-gray-300">{stats.range.end_text}</span>
                  </p>
                  <div className="flex justify-between items-center mt-1">
                    <span className="text-gray-400 text-sm">数据完整性: <span className="text-green-400">{stats.percent_calculated}%</span></span>
                    <span className="text-gray-400 text-sm">{stats.is_up_to_date ? '✅ 最新' : '⚠️ 延迟'}</span>
                  </div>
                </div>

                {/* 编程语言 */}
                {stats.languages && stats.languages.length > 0 && (
                  <div className="border-t border-gray-700 pt-2">
                    <p className="text-gray-400 mb-2 text-sm">主要编程语言:</p>
                    <div className="space-y-1">
                      {stats.languages.slice(0, 3).map((lang, index) => (
                        <div key={index} className="flex justify-between items-center text-sm">
                          <span className="text-gray-300">{lang.name}</span>
                          <div className="flex items-center space-x-2">
                            <div className="w-12 bg-gray-700 rounded-full h-1.5">
                              <div
                                className="bg-blue-500 h-1.5 rounded-full"
                                style={{ width: `${lang.percent}%` }}
                              ></div>
                            </div>
                            <span className="text-white w-10 text-right">{lang.percent.toFixed(1)}%</span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            ) : (
              <div className="text-gray-400">暂无数据</div>
            )}
          </div>

          {/* 快速链接 */}
          <div>
            <h3 className="text-lg font-semibold mb-4">快速链接</h3>
            <div className="space-y-2">
              <a href="/" className="block text-gray-400 hover:text-white transition-colors">
                首页
              </a>
              <a href="/github-projects" className="block text-gray-400 hover:text-white transition-colors">
                GitHub 项目
              </a>
              <a href="https://github.com/Faust-10086" target="_blank" rel="noopener noreferrer" className="block text-gray-400 hover:text-white transition-colors">
                GitHub 主页
              </a>
            </div>
          </div>
        </div>

        {/* 底部版权信息 */}
        <div className="border-t border-gray-800 mt-8 pt-8 text-center">
          <p className="text-gray-400">
            © 2024 汤兴伟. All rights reserved. | Powered by Next.js & Cloudflare Workers
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;