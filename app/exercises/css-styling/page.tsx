'use client';

import Link from 'next/link';
import { ArrowLeft, ExternalLink, Calendar, Palette } from 'lucide-react';

export default function CssStylingPage() {
  const exercises = [
    {
      id: 'css-basics',
      title: 'CSS基础样式练习',
      date: '3.19练习',
      description: '学习CSS基本语法、选择器和样式属性的使用',
      technologies: ['CSS3', '选择器', '颜色属性', '背景样式'],
      features: [
        '背景颜色设置',
        '文字颜色控制',
        'RGB颜色值使用',
        '基础CSS语法'
      ],
      content: {
        html: `<!DOCTYPE html>
<html lang="zh">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>汤的css练习</title>
    <link rel="stylesheet" href="3.19.css">
</head>
<body>
    <h1>我爱玩火影忍者</h1>
    <h2>最喜欢的是漩涡鸣人</h2>
</body>
</html>`,
        css: `body {
    background-color: rgb(35, 33, 33);
    color: rgb(215, 104, 104);
}`
      }
    },
    {
      id: 'css-layout',
      title: 'CSS布局练习',
      date: '3.26练习',
      description: '学习CSS布局技术和页面结构设计',
      technologies: ['CSS布局', 'Flexbox', 'Grid', '响应式设计'],
      features: [
        '页面布局设计',
        '元素定位',
        '响应式布局',
        '现代CSS技术'
      ],
      content: {
        html: '<!-- 布局练习内容 -->',
        css: '/* 布局样式 */'
      }
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50 p-6">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <Link
            href="/exercises"
            className="inline-flex items-center text-blue-600 hover:text-blue-800 mb-4 transition-colors"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            返回练习列表
          </Link>
          <h1 className="text-4xl font-bold text-gray-800 mb-2">CSS 样式练习</h1>
          <p className="text-gray-600 text-lg">掌握CSS选择器、布局和样式设计</p>
        </div>

        {/* Exercises List */}
        <div className="space-y-8">
          {exercises.map((exercise) => (
            <div key={exercise.id} className="bg-white rounded-xl shadow-lg overflow-hidden">
              {/* Exercise Header */}
              <div className="bg-gradient-to-r from-blue-500 to-indigo-500 p-6 text-white">
                <div className="flex items-start justify-between">
                  <div>
                    <h2 className="text-2xl font-bold mb-2">{exercise.title}</h2>
                    <div className="flex items-center text-blue-100 mb-3">
                      <Calendar className="w-4 h-4 mr-2" />
                      <span>{exercise.date}</span>
                    </div>
                    <p className="text-blue-100">{exercise.description}</p>
                  </div>
                  <Link
                    href={`/exercises/css-styling/${exercise.id}`}
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
                          className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-medium"
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
                          <div className="w-2 h-2 bg-blue-500 rounded-full mr-3"></div>
                          {feature}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                {/* Code Preview for CSS Basics */}
                {exercise.id === 'css-basics' && (
                  <div className="mt-6 pt-6 border-t border-gray-200">
                    <h3 className="text-lg font-semibold text-gray-800 mb-4">代码预览</h3>
                    <div className="grid md:grid-cols-2 gap-4">
                      {/* HTML */}
                      <div>
                        <h4 className="text-sm font-medium text-gray-600 mb-2">HTML 结构</h4>
                        <div className="bg-gray-900 rounded-lg p-4 overflow-x-auto">
                          <pre className="text-sm text-gray-300">
                            <code>{exercise.content.html}</code>
                          </pre>
                        </div>
                      </div>
                      {/* CSS */}
                      <div>
                        <h4 className="text-sm font-medium text-gray-600 mb-2">CSS 样式</h4>
                        <div className="bg-gray-900 rounded-lg p-4 overflow-x-auto">
                          <pre className="text-sm text-gray-300">
                            <code>{exercise.content.css}</code>
                          </pre>
                        </div>
                      </div>
                    </div>

                    {/* Visual Effect Preview */}
                    <div className="mt-4">
                      <h4 className="text-sm font-medium text-gray-600 mb-2">视觉效果预览</h4>
                      <div className="border-2 border-gray-300 rounded-lg overflow-hidden">
                        <div className="bg-gray-800 text-red-300 p-6 text-center">
                          <h1 className="text-2xl font-bold mb-2">我爱玩火影忍者</h1>
                          <h2 className="text-xl">最喜欢的是漩涡鸣人</h2>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* CSS Learning Guide */}
        <div className="mt-12 bg-white rounded-xl shadow-lg p-8">
          <h2 className="text-2xl font-bold text-gray-800 mb-6">CSS 学习指南</h2>
          <div className="grid md:grid-cols-3 gap-6">
            <div className="text-center">
              <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Palette className="w-8 h-8 text-blue-600" />
              </div>
              <h3 className="text-lg font-semibold text-gray-800 mb-2">基础语法</h3>
              <p className="text-gray-600 text-sm">
                学习CSS选择器、属性和值的基本语法结构
              </p>
            </div>
            <div className="text-center">
              <div className="bg-indigo-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <div className="w-8 h-8 bg-indigo-600 rounded"></div>
              </div>
              <h3 className="text-lg font-semibold text-gray-800 mb-2">颜色与背景</h3>
              <p className="text-gray-600 text-sm">
                掌握颜色值表示方法和背景样式设置
              </p>
            </div>
            <div className="text-center">
              <div className="bg-purple-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <div className="grid grid-cols-2 gap-1 w-6 h-6">
                  <div className="bg-purple-600 rounded-sm"></div>
                  <div className="bg-purple-600 rounded-sm"></div>
                  <div className="bg-purple-600 rounded-sm"></div>
                  <div className="bg-purple-600 rounded-sm"></div>
                </div>
              </div>
              <h3 className="text-lg font-semibold text-gray-800 mb-2">布局技术</h3>
              <p className="text-gray-600 text-sm">
                学习现代CSS布局方法和响应式设计
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}