'use client';

import Link from 'next/link';
import { ArrowLeft, Code, Eye, Download } from 'lucide-react';
import { useState } from 'react';

export default function PersonalWebpagePage() {
  const [activeTab, setActiveTab] = useState('preview');

  const htmlCode = `<!DOCTYPE html>
<html lang="zh-CN">
<head>
    <meta charset="UTF-8">
    <title>汤兴伟P231014812</title>
    <style>
        body {
            margin: 0;
            padding: 20px;
            background-image: url('微信图片_20250312121017.jpg');
            background-size: cover;
            background-position: center;
            min-height: 100vh;
            font-family: SimSun, STSong;
            position: relative;
        }

        body::before {
            content: '';
            position: absolute;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            background: inherit;
            background-attachment: fixed;
            filter: blur(5px);
            z-index: -1;
        }

        h1 {
            display: block;
            text-align: center;
            font-size: 2.5em;
            padding: 10px 20px;
            margin: 20px auto;
            color: transparent;
            background-clip: text;
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
            background-image: linear-gradient(90deg, #FF0000, #0000FF);
            position: relative;
            width: fit-content;
        }

        h1::after {
            content: "";
            position: absolute;
            left: -5px;
            right: -5px;
            top: 0;
            bottom: 0;
            background: white;
            z-index: -1;
            border-radius: 5px;
        }

        .content-box {
            background: rgba(240, 240, 240, 0.9);
            border: 2px solid #666;
            border-radius: 10px;
            padding: 20px;
            max-width: 600px;
            margin: 20px auto;
            box-shadow: 0 0 15px rgba(0,0,0,0.1);
        }

        h2, h3 {
            color: #0066cc;
            margin: 15px 0;
        }

        p {
            line-height: 1.6;
            color: #333;
        }

        .contact-item {
            background: rgba(255, 255, 255, 0.95);
            border: 2px solid #0066cc;
            border-radius: 8px;
            padding: 15px;
            margin: 15px 0;
            font-size: 1.2em;
        }

        .contact-item strong {
            color: #0066cc;
            font-size: 1.1em;
            display: inline-block;
            margin-right: 10px;
        }
    </style>
</head>
<body>
    <h1>汤兴伟的个人网页</h1>
    
    <div class="content-box">
        <h2>自我介绍</h2>
        <h3>你好啊！</h3>
        <p>我是汤兴伟，来自于新疆，高中就读于哈尔滨七十三中学内高班，现就读于西北民族大学新闻学系。欢迎来到我的网页！</p>
    </div>

    <div class="content-box">
        <h2>联系方式</h2>
        <div class="contact-item">
            <strong>📧 电子邮箱：</strong>3420808767@qq.com
        </div>
        <div class="contact-item">
            <strong>📞 电话号码：</strong>139红酒白酒葡萄酒
        </div>
    </div>
</body>
</html>`;

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 to-red-50 p-6">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <Link
            href="/exercises/html-basics"
            className="inline-flex items-center text-orange-600 hover:text-orange-800 mb-4 transition-colors"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            返回HTML练习
          </Link>
          <h1 className="text-4xl font-bold text-gray-800 mb-2">个人网页制作</h1>
          <p className="text-gray-600 text-lg">第四周作业 - 使用HTML和CSS创建个人介绍网页</p>
        </div>

        {/* Tab Navigation */}
        <div className="bg-white rounded-xl shadow-lg overflow-hidden mb-8">
          <div className="flex border-b border-gray-200">
            <button
              onClick={() => setActiveTab('preview')}
              className={`flex-1 px-6 py-4 text-center font-medium transition-colors ${activeTab === 'preview'
                  ? 'bg-orange-500 text-white'
                  : 'text-gray-600 hover:text-orange-600'
                }`}
            >
              <Eye className="w-5 h-5 inline-block mr-2" />
              预览效果
            </button>
            <button
              onClick={() => setActiveTab('code')}
              className={`flex-1 px-6 py-4 text-center font-medium transition-colors ${activeTab === 'code'
                  ? 'bg-orange-500 text-white'
                  : 'text-gray-600 hover:text-orange-600'
                }`}
            >
              <Code className="w-5 h-5 inline-block mr-2" />
              源代码
            </button>
          </div>

          {/* Tab Content */}
          <div className="p-6">
            {activeTab === 'preview' && (
              <div className="space-y-6">
                {/* Preview Description */}
                <div className="bg-orange-50 border border-orange-200 rounded-lg p-4">
                  <h3 className="text-lg font-semibold text-orange-800 mb-2">作品预览</h3>
                  <p className="text-orange-700">
                    这是一个个人介绍网页，展示了HTML结构设计和CSS样式应用的基础技能。
                    网页包含了渐变文字效果、背景图片处理、卡片式布局等现代网页设计元素。
                  </p>
                </div>

                {/* Simulated Preview */}
                <div className="border-2 border-gray-300 rounded-lg overflow-hidden">
                  <div className="bg-gray-100 px-4 py-2 border-b border-gray-300 text-sm text-gray-600">
                    个人网页预览 (模拟效果)
                  </div>
                  <div className="bg-gradient-to-br from-blue-100 to-purple-100 p-8 min-h-96">
                    {/* Simulated webpage content */}
                    <div className="text-center mb-8">
                      <h1 className="text-4xl font-bold bg-gradient-to-r from-red-500 to-blue-500 bg-clip-text text-transparent mb-4">
                        汤兴伟的个人网页
                      </h1>
                    </div>

                    <div className="max-w-2xl mx-auto space-y-6">
                      <div className="bg-white bg-opacity-90 rounded-lg p-6 shadow-lg">
                        <h2 className="text-xl font-bold text-blue-600 mb-3">自我介绍</h2>
                        <h3 className="text-lg font-semibold text-blue-600 mb-2">你好啊！</h3>
                        <p className="text-gray-700 leading-relaxed">
                          我是汤兴伟，来自于新疆，高中就读于哈尔滨七十三中学内高班，现就读于西北民族大学新闻学系。欢迎来到我的网页！
                        </p>
                      </div>

                      <div className="bg-white bg-opacity-90 rounded-lg p-6 shadow-lg">
                        <h2 className="text-xl font-bold text-blue-600 mb-4">联系方式</h2>
                        <div className="space-y-3">
                          <div className="bg-white border-2 border-blue-500 rounded-lg p-4">
                            <span className="font-semibold text-blue-600">📧 电子邮箱：</span>
                            <span className="ml-2">3420808767@qq.com</span>
                          </div>
                          <div className="bg-white border-2 border-blue-500 rounded-lg p-4">
                            <span className="font-semibold text-blue-600">📞 电话号码：</span>
                            <span className="ml-2">139红酒白酒葡萄酒</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'code' && (
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <h3 className="text-lg font-semibold text-gray-800">HTML + CSS 源代码</h3>
                  <button className="flex items-center px-4 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600 transition-colors">
                    <Download className="w-4 h-4 mr-2" />
                    下载代码
                  </button>
                </div>
                <div className="bg-gray-900 rounded-lg overflow-hidden">
                  <div className="bg-gray-800 px-4 py-2 text-gray-300 text-sm">
                    第四周作业.html
                  </div>
                  <pre className="p-4 text-sm text-gray-300 overflow-x-auto">
                    <code>{htmlCode}</code>
                  </pre>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Technical Analysis */}
        <div className="bg-white rounded-xl shadow-lg p-8">
          <h2 className="text-2xl font-bold text-gray-800 mb-6">技术要点分析</h2>
          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <h3 className="text-lg font-semibold text-orange-600 mb-4">CSS 技术特点</h3>
              <ul className="space-y-3">
                <li className="flex items-start">
                  <div className="w-2 h-2 bg-orange-500 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                  <div>
                    <strong>渐变文字效果：</strong>
                    <span className="text-gray-600">使用 background-clip: text 实现彩色渐变标题</span>
                  </div>
                </li>
                <li className="flex items-start">
                  <div className="w-2 h-2 bg-orange-500 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                  <div>
                    <strong>背景模糊效果：</strong>
                    <span className="text-gray-600">使用 ::before 伪元素和 filter: blur() 实现背景模糊</span>
                  </div>
                </li>
                <li className="flex items-start">
                  <div className="w-2 h-2 bg-orange-500 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                  <div>
                    <strong>卡片式布局：</strong>
                    <span className="text-gray-600">使用 border-radius 和 box-shadow 创建现代卡片效果</span>
                  </div>
                </li>
                <li className="flex items-start">
                  <div className="w-2 h-2 bg-orange-500 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                  <div>
                    <strong>透明度控制：</strong>
                    <span className="text-gray-600">使用 rgba() 实现半透明背景效果</span>
                  </div>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-orange-600 mb-4">HTML 结构特点</h3>
              <ul className="space-y-3">
                <li className="flex items-start">
                  <div className="w-2 h-2 bg-orange-500 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                  <div>
                    <strong>语义化标签：</strong>
                    <span className="text-gray-600">合理使用 h1, h2, h3 等标题标签</span>
                  </div>
                </li>
                <li className="flex items-start">
                  <div className="w-2 h-2 bg-orange-500 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                  <div>
                    <strong>内容分组：</strong>
                    <span className="text-gray-600">使用 div 和 class 进行内容模块化</span>
                  </div>
                </li>
                <li className="flex items-start">
                  <div className="w-2 h-2 bg-orange-500 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                  <div>
                    <strong>字符编码：</strong>
                    <span className="text-gray-600">正确设置 UTF-8 编码支持中文显示</span>
                  </div>
                </li>
                <li className="flex items-start">
                  <div className="w-2 h-2 bg-orange-500 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                  <div>
                    <strong>响应式设计：</strong>
                    <span className="text-gray-600">设置 viewport meta 标签</span>
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