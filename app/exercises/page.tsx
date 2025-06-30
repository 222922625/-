'use client';

import Link from 'next/link';
import { ArrowLeft, Code, Palette, Zap, Globe, Component } from 'lucide-react';

export default function ExercisesPage() {
  const exerciseCategories = [
    {
      id: 'html-basics',
      title: 'HTML 基础练习',
      description: '学习HTML基本标签、结构和语义化标记',
      icon: <Globe className="w-8 h-8" />,
      color: 'bg-orange-500',
      exercises: [
        { name: '个人网页制作', date: '第四周作业' },
        { name: 'HTML结构练习', date: '3.23课上练习' }
      ]
    },
    {
      id: 'css-styling',
      title: 'CSS 样式练习',
      description: '掌握CSS选择器、布局和样式设计',
      icon: <Palette className="w-8 h-8" />,
      color: 'bg-blue-500',
      exercises: [
        { name: 'CSS基础样式', date: '3.19练习' },
        { name: 'CSS布局练习', date: '3.26练习' }
      ]
    },
    {
      id: 'javascript-fundamentals',
      title: 'JavaScript 基础',
      description: '学习JavaScript语法、DOM操作和事件处理',
      icon: <Zap className="w-8 h-8" />,
      color: 'bg-yellow-500',
      exercises: [
        { name: 'JavaScript基础语法', date: '4.02课上练习' },
        { name: 'DOM操作练习', date: '4.09课上练习' },
        { name: '回调函数练习', date: '4.16课上练习' }
      ]
    },
    {
      id: 'react-components',
      title: 'React 组件开发',
      description: '学习React组件化开发和状态管理',
      icon: <Component className="w-8 h-8" />,
      color: 'bg-cyan-500',
      exercises: [
        { name: 'React基础组件', date: '组件练习' },
        { name: '状态管理练习', date: 'State练习' }
      ]
    },
    {
      id: 'nextjs-features',
      title: 'Next.js 特性',
      description: '探索Next.js的路由、API和部署特性',
      icon: <Code className="w-8 h-8" />,
      color: 'bg-purple-500',
      exercises: [
        { name: 'Next.js路由', date: '路由练习' },
        { name: 'API Routes', date: 'API练习' }
      ]
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 p-6">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <Link
            href="/"
            className="inline-flex items-center text-blue-600 hover:text-blue-800 mb-4 transition-colors"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            返回首页
          </Link>
          <h1 className="text-4xl font-bold text-gray-800 mb-2">课程练习展示</h1>
          <p className="text-gray-600 text-lg">Web开发学习过程中的各类练习和作业</p>
        </div>

        {/* Exercise Categories Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {exerciseCategories.map((category) => (
            <Link
              key={category.id}
              href={`/exercises/${category.id}`}
              className="group block"
            >
              <div className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 overflow-hidden">
                {/* Category Header */}
                <div className={`${category.color} p-6 text-white`}>
                  <div className="flex items-center justify-between mb-3">
                    {category.icon}
                    <span className="text-sm opacity-90">{category.exercises.length} 个练习</span>
                  </div>
                  <h3 className="text-xl font-bold mb-2">{category.title}</h3>
                  <p className="text-sm opacity-90">{category.description}</p>
                </div>

                {/* Exercise List */}
                <div className="p-6">
                  <div className="space-y-3">
                    {category.exercises.map((exercise, index) => (
                      <div key={index} className="flex justify-between items-center text-sm">
                        <span className="text-gray-700 font-medium">{exercise.name}</span>
                        <span className="text-gray-500">{exercise.date}</span>
                      </div>
                    ))}
                  </div>

                  <div className="mt-4 pt-4 border-t border-gray-200">
                    <span className="text-blue-600 font-medium group-hover:text-blue-800 transition-colors">
                      查看练习 →
                    </span>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>

        {/* Statistics */}
        <div className="mt-12 bg-white rounded-xl shadow-lg p-8">
          <h2 className="text-2xl font-bold text-gray-800 mb-6">学习统计</h2>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <div className="text-center">
              <div className="text-3xl font-bold text-blue-600 mb-2">
                {exerciseCategories.reduce((total, cat) => total + cat.exercises.length, 0)}
              </div>
              <div className="text-gray-600">总练习数</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-green-600 mb-2">{exerciseCategories.length}</div>
              <div className="text-gray-600">技术分类</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-purple-600 mb-2">8</div>
              <div className="text-gray-600">学习周数</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-orange-600 mb-2">100%</div>
              <div className="text-gray-600">完成度</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}