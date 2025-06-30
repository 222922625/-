'use client';

import { useState, useEffect } from 'react';

export default function GitHubProjects() {
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

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">加载项目列表中...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="text-red-500 text-xl mb-4">❌</div>
          <p className="text-red-600 mb-4">错误: {error}</p>
          <button 
            onClick={refreshProjects}
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition-colors"
          >
            重试
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-6xl mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            GitHub 项目列表
          </h1>
          <p className="text-gray-600 mb-6">
            来自仓库: <a 
              href="https://github.com/222922625/-" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-blue-600 hover:underline"
            >
              222922625/-
            </a>
          </p>
          <button 
            onClick={refreshProjects}
            className="bg-green-600 text-white px-6 py-2 rounded-lg hover:bg-green-700 transition-colors inline-flex items-center gap-2"
          >
            🔄 刷新项目列表
          </button>
        </div>

        {/* Projects Grid */}
        {projects.length === 0 ? (
          <div className="text-center py-12">
            <div className="text-gray-400 text-6xl mb-4">📁</div>
            <p className="text-gray-600 text-lg">暂无项目</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {projects.map((project, index) => (
              <div 
                key={project.path} 
                className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow p-6 border border-gray-200"
              >
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                      <span className="text-blue-600 font-bold text-lg">
                        {project.name.charAt(0).toUpperCase()}
                      </span>
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900 text-lg">
                        {project.name}
                      </h3>
                      <p className="text-sm text-gray-500">项目 #{index + 1}</p>
                    </div>
                  </div>
                </div>
                
                <div className="flex space-x-2 mb-2">
                        <span className={`inline-block text-xs px-2 py-1 rounded ${
                          project.itemType === 'directory' 
                            ? 'bg-yellow-100 text-yellow-800' 
                            : 'bg-blue-100 text-blue-800'
                        }`}>
                          {project.itemType === 'directory' ? '📁 文件夹' : `📄 ${project.type?.toUpperCase() || '文件'}`}
                        </span>
                        {project.itemType === 'file' && (
                          <span className="inline-block bg-gray-100 text-gray-800 text-xs px-2 py-1 rounded">
                            {(project.size / 1024).toFixed(1)} KB
                          </span>
                        )}
                      </div>
                
                <div className="mb-4">
                  <p className="text-gray-600 text-sm mb-2">
                    <span className="font-medium">路径:</span> {project.path}
                  </p>
                </div>
                
                <div className="flex gap-2">
                  <a 
                    href={project.url} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="flex-1 bg-blue-600 text-white text-center py-2 px-4 rounded hover:bg-blue-700 transition-colors text-sm"
                  >
                    查看项目
                  </a>
                  {project.itemType === 'file' && project.download_url && (
                     <a 
                       href={project.download_url} 
                       target="_blank" 
                       rel="noopener noreferrer"
                       className="bg-green-600 text-white text-center py-2 px-4 rounded hover:bg-green-700 transition-colors text-sm"
                     >
                       下载文件
                     </a>
                   )}
                </div>
              </div>
            ))}
          </div>
        )}
        
        {/* Footer */}
        <div className="text-center mt-12 pt-8 border-t border-gray-200">
          <p className="text-gray-500 text-sm">
            最后更新: {new Date().toLocaleString('zh-CN')}
          </p>
        </div>
      </div>
    </div>
  );
}