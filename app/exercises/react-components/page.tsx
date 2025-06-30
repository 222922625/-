'use client';

import Link from 'next/link';
import { ArrowLeft, Component, Layers, RefreshCw } from 'lucide-react';

export default function ReactComponentsPage() {
  const exercises = [
    {
      id: 'basic-components',
      title: 'React基础组件',
      description: '学习React组件的创建、props传递和基本使用',
      status: '已完成',
      difficulty: '初级',
      concepts: ['函数组件', 'JSX语法', 'Props传递', '组件导入导出']
    },
    {
      id: 'state-management',
      title: '状态管理练习',
      description: '掌握useState Hook和组件状态管理',
      status: '进行中',
      difficulty: '中级',
      concepts: ['useState Hook', '事件处理', '状态更新', '条件渲染']
    },
    {
      id: 'component-lifecycle',
      title: '组件生命周期',
      description: '理解useEffect Hook和组件生命周期',
      status: '计划中',
      difficulty: '中级',
      concepts: ['useEffect Hook', '副作用处理', '清理函数', '依赖数组']
    },
    {
      id: 'custom-hooks',
      title: '自定义Hooks',
      description: '创建和使用自定义Hooks实现逻辑复用',
      status: '计划中',
      difficulty: '高级',
      concepts: ['自定义Hooks', '逻辑复用', 'Hook规则', '状态共享']
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case '已完成': return 'bg-green-100 text-green-800';
      case '进行中': return 'bg-yellow-100 text-yellow-800';
      case '计划中': return 'bg-gray-100 text-gray-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case '初级': return 'bg-blue-100 text-blue-800';
      case '中级': return 'bg-orange-100 text-orange-800';
      case '高级': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-cyan-50 to-blue-50 p-6">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <Link
            href="/exercises"
            className="inline-flex items-center text-cyan-600 hover:text-cyan-800 mb-4 transition-colors"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            返回练习列表
          </Link>
          <h1 className="text-4xl font-bold text-gray-800 mb-2">React 组件开发</h1>
          <p className="text-gray-600 text-lg">学习React组件化开发和状态管理</p>
        </div>

        {/* Progress Overview */}
        <div className="bg-white rounded-xl shadow-lg p-6 mb-8">
          <h2 className="text-xl font-bold text-gray-800 mb-4">学习进度</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="text-center p-4 bg-green-50 rounded-lg">
              <div className="text-2xl font-bold text-green-600 mb-1">1</div>
              <div className="text-sm text-green-700">已完成</div>
            </div>
            <div className="text-center p-4 bg-yellow-50 rounded-lg">
              <div className="text-2xl font-bold text-yellow-600 mb-1">1</div>
              <div className="text-sm text-yellow-700">进行中</div>
            </div>
            <div className="text-center p-4 bg-gray-50 rounded-lg">
              <div className="text-2xl font-bold text-gray-600 mb-1">2</div>
              <div className="text-sm text-gray-700">计划中</div>
            </div>
          </div>
        </div>

        {/* Exercises List */}
        <div className="space-y-6">
          {exercises.map((exercise, index) => (
            <div key={exercise.id} className="bg-white rounded-xl shadow-lg overflow-hidden">
              <div className="p-6">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <h3 className="text-xl font-bold text-gray-800">{exercise.title}</h3>
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(exercise.status)}`}>
                        {exercise.status}
                      </span>
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${getDifficultyColor(exercise.difficulty)}`}>
                        {exercise.difficulty}
                      </span>
                    </div>
                    <p className="text-gray-600 mb-4">{exercise.description}</p>
                  </div>
                  <div className="ml-4">
                    <Component className="w-8 h-8 text-cyan-500" />
                  </div>
                </div>

                {/* Concepts */}
                <div className="mb-4">
                  <h4 className="text-sm font-semibold text-gray-700 mb-2">核心概念</h4>
                  <div className="flex flex-wrap gap-2">
                    {exercise.concepts.map((concept, conceptIndex) => (
                      <span
                        key={conceptIndex}
                        className="bg-cyan-100 text-cyan-800 px-3 py-1 rounded-full text-sm"
                      >
                        {concept}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Action Button */}
                <div className="flex justify-end">
                  {exercise.status === '已完成' && (
                    <Link
                      href={`/exercises/react-components/${exercise.id}`}
                      className="bg-cyan-500 hover:bg-cyan-600 text-white px-4 py-2 rounded-lg transition-colors"
                    >
                      查看练习
                    </Link>
                  )}
                  {exercise.status === '进行中' && (
                    <button className="bg-yellow-500 hover:bg-yellow-600 text-white px-4 py-2 rounded-lg transition-colors">
                      继续练习
                    </button>
                  )}
                  {exercise.status === '计划中' && (
                    <button className="bg-gray-400 text-white px-4 py-2 rounded-lg cursor-not-allowed" disabled>
                      即将开始
                    </button>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* React Learning Guide */}
        <div className="mt-12 bg-white rounded-xl shadow-lg p-8">
          <h2 className="text-2xl font-bold text-gray-800 mb-6">React 学习指南</h2>
          <div className="grid md:grid-cols-3 gap-6">
            <div className="text-center">
              <div className="bg-cyan-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Component className="w-8 h-8 text-cyan-600" />
              </div>
              <h3 className="text-lg font-semibold text-gray-800 mb-2">组件化思维</h3>
              <p className="text-gray-600 text-sm">
                将UI拆分为独立、可复用的组件
              </p>
            </div>
            <div className="text-center">
              <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Layers className="w-8 h-8 text-blue-600" />
              </div>
              <h3 className="text-lg font-semibold text-gray-800 mb-2">状态管理</h3>
              <p className="text-gray-600 text-sm">
                使用Hooks管理组件状态和副作用
              </p>
            </div>
            <div className="text-center">
              <div className="bg-indigo-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <RefreshCw className="w-8 h-8 text-indigo-600" />
              </div>
              <h3 className="text-lg font-semibold text-gray-800 mb-2">数据流</h3>
              <p className="text-gray-600 text-sm">
                理解单向数据流和组件通信
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}