'use client';

import Link from 'next/link';
import { ArrowLeft, ExternalLink, Calendar, User } from 'lucide-react';

export default function HtmlBasicsPage() {
  const exercises = [
    {
      id: 'personal-webpage',
      title: '个人网页制作',
      date: '第四周作业',
      description: '使用HTML和CSS创建个人介绍网页，包含自我介绍、联系方式等信息',
      technologies: ['HTML5', 'CSS3', '响应式设计', '背景图片'],
      features: [
        '渐变文字效果',
        '背景图片模糊效果',
        '卡片式布局',
        '联系方式展示'
      ]
    },
    {
      id: 'html-structure',
      title: 'HTML结构练习',
      date: '3.23课上练习',
      description: '学习HTML基本结构和标签使用',
      technologies: ['HTML5', '语义化标签'],
      features: [
        'HTML5文档结构',
        'meta标签使用',
        '基础HTML模板'
      ]
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 to-red-50 p-6">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <Link
            href="/exercises"
            className="inline-flex items-center text-orange-600 hover:text-orange-800 mb-4 transition-colors"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            返回练习列表
          </Link>
          <h1 className="text-4xl font-bold text-gray-800 mb-2">HTML 基础练习</h1>
          <p className="text-gray-600 text-lg">学习HTML基本标签、结构和语义化标记</p>
        </div>

        {/* Exercises List */}
        <div className="space-y-8">
          {exercises.map((exercise) => (
            <div key={exercise.id} className="bg-white rounded-xl shadow-lg overflow-hidden">
              {/* Exercise Header */}
              <div className="bg-gradient-to-r from-orange-500 to-red-500 p-6 text-white">
                <div className="flex items-start justify-between">
                  <div>
                    <h2 className="text-2xl font-bold mb-2">{exercise.title}</h2>
                    <div className="flex items-center text-orange-100 mb-3">
                      <Calendar className="w-4 h-4 mr-2" />
                      <span>{exercise.date}</span>
                    </div>
                    <p className="text-orange-100">{exercise.description}</p>
                  </div>
                  <Link
                    href={`/exercises/html-basics/${exercise.id}`}
                    className="bg-white bg-opacity-20 hover:bg-opacity-30 px-4 py-2 rounded-lg transition-all duration-200 flex items-center"
                  >
                    <ExternalLink className="w-4 h-4 mr-2" />
                    查看练习
                  </Link>
                </div>
              </div>

              {/* Exercise Content */}
              <div className="p-6">
                <div className="grid md:grid-cols-2 gap-6">
                  {/* Technologies */}
                  <div>
                    <h3 className="text-lg font-semibold text-gray-800 mb-3">使用技术</h3>
                    <div className="flex flex-wrap gap-2">
                      {exercise.technologies.map((tech, index) => (
                        <span
                          key={index}
                          className="bg-orange-100 text-orange-800 px-3 py-1 rounded-full text-sm font-medium"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Features */}
                  <div>
                    <h3 className="text-lg font-semibold text-gray-800 mb-3">主要特性</h3>
                    <ul className="space-y-2">
                      {exercise.features.map((feature, index) => (
                        <li key={index} className="flex items-center text-gray-600">
                          <div className="w-2 h-2 bg-orange-500 rounded-full mr-3"></div>
                          {feature}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Learning Objectives */}
        <div className="mt-12 bg-white rounded-xl shadow-lg p-8">
          <h2 className="text-2xl font-bold text-gray-800 mb-6">学习目标</h2>
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <h3 className="text-lg font-semibold text-orange-600 mb-3">HTML 基础知识</h3>
              <ul className="space-y-2 text-gray-600">
                <li>• 掌握HTML5文档结构</li>
                <li>• 理解语义化标签的使用</li>
                <li>• 学会meta标签的配置</li>
                <li>• 掌握基本的HTML标签</li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-orange-600 mb-3">实践技能</h3>
              <ul className="space-y-2 text-gray-600">
                <li>• 创建完整的网页结构</li>
                <li>• 实现个人信息展示</li>
                <li>• 掌握HTML与CSS的结合</li>
                <li>• 理解网页的基本组成</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}