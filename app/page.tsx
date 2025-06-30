'use client';

import Link from 'next/link';
import { Github, BookOpen, BarChart3, MessageSquare, Code, Palette, Zap } from 'lucide-react';

export default function HomePage() {
  const features = [
    {
      title: 'GitHub 项目',
      description: '展示我的开源项目和代码仓库',
      href: '/github-projects',
      icon: <Github className="w-8 h-8" />,
      color: 'bg-gray-700 hover:bg-gray-600'
    },
    {
      title: '课程练习',
      description: 'Web开发学习过程中的各类练习和作业',
      href: '/exercises',
      icon: <BookOpen className="w-8 h-8" />,
      color: 'bg-blue-600 hover:bg-blue-500'
    },
    {
      title: 'WakaTime 统计',
      description: '见页面页脚处',
      href: '/wakatime-stats',
      icon: <BarChart3 className="w-8 h-8" />,
      color: 'bg-green-600 hover:bg-green-500'
    },
    {
      title: 'AI 助手',
      description: '点击右下角助手即可选择两种方案体验',
      href: '#',
      icon: <MessageSquare className="w-8 h-8" />,
      color: 'bg-purple-600 hover:bg-purple-500',
      isAI: true
    }
  ];

  const techStack = [
    { name: 'HTML', icon: <Code className="w-6 h-6" />, color: 'text-orange-500' },
    { name: 'CSS', icon: <Palette className="w-6 h-6" />, color: 'text-blue-500' },
    { name: 'JavaScript', icon: <Zap className="w-6 h-6" />, color: 'text-yellow-500' },
    { name: 'React', icon: <Code className="w-6 h-6" />, color: 'text-cyan-500' },
    { name: 'Next.js', icon: <Code className="w-6 h-6" />, color: 'text-gray-300' }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-blue-900 to-purple-900 text-white">
      {/* Hero Section */}
      <div className="flex flex-col items-center justify-center py-20 px-4">
        <div className="text-center mb-12">
          <h1 className="text-6xl font-bold mb-6 bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
            汤兴伟的Web开发探索之旅
          </h1>
          <p className="text-2xl mb-4 text-gray-300">创作者：汤兴伟</p>
          <p className="text-xl text-gray-400">学号：P231014812</p>
          <p className="text-lg text-gray-500 mt-4 max-w-2xl mx-auto">
            欢迎来到我的Web开发学习展示平台，这里记录了我在前端开发路上的每一步成长足迹
          </p>
        </div>

        {/* Feature Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto mb-16">
          {features.map((feature, index) => (
            <Link
              key={index}
              href={feature.href}
              className={`${feature.color} rounded-xl p-6 transition-all duration-300 transform hover:scale-105 hover:shadow-2xl group ${
                !feature.isAI && feature.href !== '/wakatime-stats' ? 'cursor-pointer relative' : ''
              }`}
              onClick={feature.isAI ? (e) => {
                e.preventDefault();
                // AI助手功能将通过FloatingChat组件处理
              } : undefined}
            >
              <div className="flex flex-col items-center text-center">
                <div className="mb-4 group-hover:scale-110 transition-transform duration-300">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-bold mb-2">{feature.title}</h3>
                <p className="text-sm text-gray-200 opacity-90">{feature.description}</p>
                {!feature.isAI && feature.href !== '/wakatime-stats' && (
                  <div className="mt-3 text-xs text-gray-300 opacity-75 group-hover:opacity-100 transition-opacity duration-300">
                    点击查看 →
                  </div>
                )}
              </div>
            </Link>
          ))}
        </div>

        {/* Tech Stack */}
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-8">技术栈</h2>
          <div className="flex flex-wrap justify-center gap-6">
            {techStack.map((tech, index) => (
              <div
                key={index}
                className="bg-white rounded-lg p-4 flex items-center space-x-3 hover:bg-gray-50 transition-all duration-300 shadow-lg"
              >
                <div className={tech.color}>
                  {tech.icon}
                </div>
                <span className="font-medium text-gray-800">{tech.name}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Stats */}
        <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
          <div className="bg-white rounded-xl p-6 text-center hover:bg-gray-50 transition-all duration-300 shadow-lg">
            <div className="text-4xl font-bold text-blue-600 mb-2">15+</div>
            <div className="text-gray-800 font-medium">完成练习</div>
          </div>
          <div className="bg-white rounded-xl p-6 text-center hover:bg-gray-50 transition-all duration-300 shadow-lg">
            <div className="text-4xl font-bold text-green-600 mb-2">5</div>
            <div className="text-gray-800 font-medium">技术分类</div>
          </div>
          <div className="bg-white rounded-xl p-6 text-center hover:bg-gray-50 transition-all duration-300 shadow-lg">
            <div className="text-4xl font-bold text-purple-600 mb-2">8</div>
            <div className="text-gray-800 font-medium">学习周数</div>
          </div>
        </div>
      </div>
    </div>
  );
}
