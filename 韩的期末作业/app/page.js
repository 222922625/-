'use client';

import { useState, useEffect } from 'react';
import Image from "next/image";

export default function Home() {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchProjects();
  }, []);

  const fetchProjects = async () => {
    try {
      setLoading(true);
      const response = await fetch('/api/github');
      
      if (!response.ok) {
        throw new Error('Failed to fetch projects');
      }
      
      const data = await response.json();
      setProjects(data.projects || []);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const refreshProjects = () => {
    fetchProjects();
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      {/* Header Section */}
      <div className="relative overflow-hidden bg-gradient-to-r from-blue-600 to-purple-600 text-white">
        <div className="absolute inset-0 bg-black opacity-10"></div>
        <div className="relative max-w-6xl mx-auto px-4 py-16 text-center">
          <div className="mb-8">
            <Image
              className="mx-auto mb-6 filter brightness-0 invert"
              src="/next.svg"
              alt="Next.js logo"
              width={120}
              height={25}
              priority
            />
          </div>
          <h1 className="text-5xl md:text-6xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-white to-blue-100">
            韩瑞的课程成果展示
          </h1>
          <p className="text-xl md:text-2xl text-blue-100 mb-8">
            创作者：新闻学2班 韩瑞
          </p>
          <div className="flex justify-center gap-4 mb-8">
            <button 
              onClick={refreshProjects}
              className="bg-white text-blue-600 px-8 py-3 rounded-full font-semibold hover:bg-blue-50 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1"
            >
              🔄 刷新项目列表
            </button>
            <a
              href="https://github.com/222922625/-"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-gray-800 text-white px-8 py-3 rounded-full font-semibold hover:bg-gray-700 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1 flex items-center gap-2"
            >
              <Image
                src="/globe.svg"
                alt="GitHub"
                width={20}
                height={20}
                className="filter brightness-0 invert"
              />
              GitHub 仓库
            </a>
          </div>
        </div>
        <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-white to-transparent"></div>
      </div>

      {/* Main Content */}
      <div className="max-w-6xl mx-auto px-4 py-12">
        {loading ? (
          <div className="text-center py-20">
            <div className="inline-block animate-spin rounded-full h-16 w-16 border-4 border-blue-600 border-t-transparent mb-6"></div>
            <p className="text-gray-600 text-lg">加载项目列表中...</p>
          </div>
        ) : error ? (
          <div className="text-center py-20">
            <div className="text-red-500 text-6xl mb-6">❌</div>
            <p className="text-red-600 text-lg mb-6">错误: {error}</p>
            <button 
              onClick={refreshProjects}
              className="bg-red-600 text-white px-8 py-3 rounded-full font-semibold hover:bg-red-700 transition-all duration-300 shadow-lg"
            >
              重试
            </button>
          </div>
        ) : (
          <>
            {/* Projects Section */}
            <div className="mb-12">
              <h2 className="text-3xl font-bold text-gray-900 text-center mb-8">
                📚 我的课程项目
              </h2>
              <p className="text-center text-gray-600 mb-8">
                来自仓库: <a 
                  href="https://github.com/222922625/-" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-blue-600 hover:underline font-semibold"
                >
                  222922625/-
                </a>
              </p>
              
              {projects.length === 0 ? (
                <div className="text-center py-20">
                  <div className="text-gray-400 text-8xl mb-6">📁</div>
                  <p className="text-gray-600 text-xl">暂无项目</p>
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                  {projects.map((project, index) => (
                    <div 
                      key={project.path}
                      className="bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 border border-gray-100 overflow-hidden"
                    >
                      <div className="p-6">
                        <div className="flex items-start justify-between mb-4">
                          <div className="flex items-center gap-3">
                            <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl flex items-center justify-center shadow-lg">
                              <span className="text-white font-bold text-lg">
                                {project.name.charAt(0).toUpperCase()}
                              </span>
                            </div>
                            <div>
                              <h3 className="font-bold text-gray-900 text-lg">
                                {project.name}
                              </h3>
                              <p className="text-sm text-gray-500">项目 #{index + 1}</p>
                            </div>
                          </div>
                        </div>
                        
                        <div className="flex flex-wrap gap-2 mb-4">
                          <span className={`inline-block text-xs px-3 py-1 rounded-full font-semibold ${
                            project.itemType === 'directory' 
                              ? 'bg-yellow-100 text-yellow-800' 
                              : 'bg-blue-100 text-blue-800'
                          }`}>
                            {project.itemType === 'directory' ? '📁 文件夹' : `📄 ${project.type?.toUpperCase() || '文件'}`}
                          </span>
                          {project.itemType === 'file' && (
                            <span className="inline-block bg-gray-100 text-gray-800 text-xs px-3 py-1 rounded-full font-semibold">
                              {(project.size / 1024).toFixed(1)} KB
                            </span>
                          )}
                        </div>
                        
                        <div className="mb-6">
                          <p className="text-gray-600 text-sm">
                            <span className="font-semibold text-gray-800">路径:</span> {project.path}
                          </p>
                        </div>
                        
                        <div className="flex gap-3">
                          <a 
                            href={project.url} 
                            target="_blank" 
                            rel="noopener noreferrer"
                            className="flex-1 bg-gradient-to-r from-blue-600 to-blue-700 text-white text-center py-3 px-4 rounded-xl hover:from-blue-700 hover:to-blue-800 transition-all duration-300 text-sm font-semibold shadow-lg hover:shadow-xl"
                          >
                            查看项目
                          </a>
                          {project.itemType === 'file' && project.download_url && (
                            <a 
                              href={project.download_url} 
                              target="_blank" 
                              rel="noopener noreferrer"
                              className="bg-gradient-to-r from-green-600 to-green-700 text-white text-center py-3 px-4 rounded-xl hover:from-green-700 hover:to-green-800 transition-all duration-300 text-sm font-semibold shadow-lg hover:shadow-xl"
                            >
                              下载
                            </a>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </>
        )}
        
        {/* Footer */}
        <div className="text-center mt-16 pt-8 border-t border-gray-200">
          <p className="text-gray-500 text-sm mb-4">
            最后更新: <span suppressHydrationWarning>{new Date().toLocaleString('zh-CN')}</span>
          </p>
          <div className="flex justify-center gap-6 text-sm text-gray-400">
            <a href="https://nextjs.org" target="_blank" rel="noopener noreferrer" className="hover:text-blue-600 transition-colors">
              Powered by Next.js
            </a>
            <span>•</span>
            <a href="https://tailwindcss.com" target="_blank" rel="noopener noreferrer" className="hover:text-blue-600 transition-colors">
              Styled with Tailwind CSS
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
