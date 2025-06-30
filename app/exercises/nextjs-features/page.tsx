'use client';

import Link from 'next/link';
import { ArrowLeft, Globe, Server, Zap, Database, FileText, Settings } from 'lucide-react';

export default function NextjsFeaturesPage() {
  const features = [
    {
      id: 'routing',
      title: 'App Router 路由系统',
      description: '学习Next.js 13+ App Router的文件系统路由',
      icon: <Globe className="w-8 h-8" />,
      status: '已实现',
      examples: [
        'app/page.tsx - 首页路由',
        'app/exercises/page.tsx - 练习列表页',
        'app/github-projects/page.tsx - 项目展示页',
        'app/exercises/[category]/page.tsx - 动态路由'
      ]
    },
    {
      id: 'api-routes',
      title: 'API Routes',
      description: '创建服务端API接口处理数据请求',
      icon: <Server className="w-8 h-8" />,
      status: '已实现',
      examples: [
        'app/api/projects/route.ts - GitHub项目API',
        'app/api/wakatime/route.ts - WakaTime统计API',
        'RESTful API设计',
        '错误处理和响应格式化'
      ]
    },
    {
      id: 'components',
      title: '组件系统',
      description: '构建可复用的React组件库',
      icon: <Zap className="w-8 h-8" />,
      status: '已实现',
      examples: [
        'FloatingChat - AI助手组件',
        'ProjectCard - 项目卡片组件',
        'Footer - 页脚组件',
        'Layout - 布局组件'
      ]
    },
    {
      id: 'styling',
      title: 'Tailwind CSS 样式',
      description: '使用Tailwind CSS实现现代化UI设计',
      icon: <FileText className="w-8 h-8" />,
      status: '已实现',
      examples: [
        '响应式设计',
        '渐变背景和动画',
        '组件样式系统',
        '暗色主题支持'
      ]
    },
    {
      id: 'data-fetching',
      title: '数据获取',
      description: '实现客户端和服务端数据获取策略',
      icon: <Database className="w-8 h-8" />,
      status: '已实现',
      examples: [
        'GitHub API集成',
        'WakaTime API集成',
        '错误处理和加载状态',
        '数据缓存策略'
      ]
    },
    {
      id: 'configuration',
      title: '项目配置',
      description: '配置TypeScript、ESLint和构建优化',
      icon: <Settings className="w-8 h-8" />,
      status: '已实现',
      examples: [
        'TypeScript配置',
        'ESLint代码规范',
        'Next.js配置优化',
        '环境变量管理'
      ]
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case '已实现': return 'bg-green-100 text-green-800';
      case '进行中': return 'bg-yellow-100 text-yellow-800';
      case '计划中': return 'bg-gray-100 text-gray-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-indigo-50 p-6">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <Link
            href="/exercises"
            className="inline-flex items-center text-purple-600 hover:text-purple-800 mb-4 transition-colors"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            返回练习列表
          </Link>
          <h1 className="text-4xl font-bold text-gray-800 mb-2">Next.js 特性实现</h1>
          <p className="text-gray-600 text-lg">探索Next.js的路由、API和部署特性</p>
        </div>

        {/* Project Overview */}
        <div className="bg-white rounded-xl shadow-lg p-8 mb-8">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">项目架构概览</h2>
          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <h3 className="text-lg font-semibold text-purple-600 mb-3">前端技术栈</h3>
              <ul className="space-y-2 text-gray-600">
                <li>• Next.js 14 (App Router)</li>
                <li>• React 18 (函数组件 + Hooks)</li>
                <li>• TypeScript (类型安全)</li>
                <li>• Tailwind CSS (样式框架)</li>
                <li>• Lucide React (图标库)</li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-purple-600 mb-3">集成服务</h3>
              <ul className="space-y-2 text-gray-600">
                <li>• GitHub API (项目数据)</li>
                <li>• WakaTime API (编程统计)</li>
                <li>• QAnything AI (智能助手)</li>
                <li>• Cloudflare Worker (代理服务)</li>
                <li>• Vercel (部署平台)</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {features.map((feature) => (
            <div key={feature.id} className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300">
              {/* Feature Header */}
              <div className="bg-gradient-to-r from-purple-500 to-indigo-500 p-6 text-white">
                <div className="flex items-center justify-between mb-3">
                  <div className="text-purple-100">
                    {feature.icon}
                  </div>
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(feature.status)}`}>
                    {feature.status}
                  </span>
                </div>
                <h3 className="text-xl font-bold mb-2">{feature.title}</h3>
                <p className="text-purple-100 text-sm">{feature.description}</p>
              </div>

              {/* Feature Content */}
              <div className="p-6">
                <h4 className="text-sm font-semibold text-gray-700 mb-3">实现示例</h4>
                <ul className="space-y-2">
                  {feature.examples.map((example, index) => (
                    <li key={index} className="flex items-start text-sm text-gray-600">
                      <div className="w-1.5 h-1.5 bg-purple-500 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                      <span>{example}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>

        {/* File Structure */}
        <div className="bg-white rounded-xl shadow-lg p-8 mb-8">
          <h2 className="text-2xl font-bold text-gray-800 mb-6">项目文件结构</h2>
          <div className="bg-gray-900 rounded-lg p-6 overflow-x-auto">
            <pre className="text-sm text-gray-300">
              {`qimozuoye/
├── app/
│   ├── api/
│   │   ├── projects/route.ts
│   │   └── wakatime/route.ts
│   ├── components/
│   │   ├── FloatingChat.tsx
│   │   └── Footer.tsx
│   ├── exercises/
│   │   ├── html-basics/
│   │   ├── css-styling/
│   │   ├── javascript-fundamentals/
│   │   ├── react-components/
│   │   └── nextjs-features/
│   ├── github-projects/
│   ├── wakatime-stats/
│   ├── layout.tsx
│   ├── page.tsx
│   └── globals.css
├── lib/
│   ├── github.js
│   └── deepseek.ts
├── types/
├── cloudflare-worker/
├── docs/
├── package.json
├── next.config.ts
├── tailwind.config.js
└── tsconfig.json`}
            </pre>
          </div>
        </div>

        {/* Learning Outcomes */}
        <div className="bg-white rounded-xl shadow-lg p-8">
          <h2 className="text-2xl font-bold text-gray-800 mb-6">学习成果</h2>
          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <h3 className="text-lg font-semibold text-purple-600 mb-4">技术能力</h3>
              <ul className="space-y-3">
                <li className="flex items-start">
                  <div className="w-2 h-2 bg-purple-500 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                  <div>
                    <strong>全栈开发：</strong>
                    <span className="text-gray-600">掌握前端React和后端API开发</span>
                  </div>
                </li>
                <li className="flex items-start">
                  <div className="w-2 h-2 bg-purple-500 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                  <div>
                    <strong>现代工具链：</strong>
                    <span className="text-gray-600">熟练使用TypeScript、Tailwind CSS等现代工具</span>
                  </div>
                </li>
                <li className="flex items-start">
                  <div className="w-2 h-2 bg-purple-500 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                  <div>
                    <strong>API集成：</strong>
                    <span className="text-gray-600">实现多个第三方服务的集成</span>
                  </div>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-purple-600 mb-4">项目经验</h3>
              <ul className="space-y-3">
                <li className="flex items-start">
                  <div className="w-2 h-2 bg-purple-500 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                  <div>
                    <strong>组件化开发：</strong>
                    <span className="text-gray-600">构建可复用的组件库</span>
                  </div>
                </li>
                <li className="flex items-start">
                  <div className="w-2 h-2 bg-purple-500 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                  <div>
                    <strong>响应式设计：</strong>
                    <span className="text-gray-600">实现跨设备的用户体验</span>
                  </div>
                </li>
                <li className="flex items-start">
                  <div className="w-2 h-2 bg-purple-500 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                  <div>
                    <strong>性能优化：</strong>
                    <span className="text-gray-600">应用Next.js的性能优化特性</span>
                  </div>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}