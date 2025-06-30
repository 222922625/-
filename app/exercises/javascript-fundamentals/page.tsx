'use client';

import Link from 'next/link';
import { ArrowLeft, ExternalLink, Calendar, Zap, Play } from 'lucide-react';

export default function JavaScriptFundamentalsPage() {
  const exercises = [
    {
      id: 'js-basics',
      title: 'JavaScript基础语法',
      date: '4.02课上练习',
      description: '学习JavaScript基本语法、变量声明和循环结构',
      technologies: ['JavaScript', '变量声明', '循环语句', '弹窗函数'],
      features: [
        'alert() 弹窗函数',
        'let 变量声明',
        'for 循环语句',
        '字符串操作'
      ],
      code: `<script>
    alert("韩瑞是傻逼");
    let a = 1;
    let b = 2;
    for(hanhan="sb",hanhan<"sbsbsbsbsb";hanhan++){
       console.log(hanhan);
    }
</script>`,
      difficulty: '初级'
    },
    {
      id: 'dom-manipulation',
      title: 'DOM操作练习',
      date: '4.09课上练习',
      description: '学习DOM元素获取、内容修改和事件处理',
      technologies: ['DOM API', 'getElementById', 'innerHTML', 'DOMContentLoaded'],
      features: [
        'DOM元素获取',
        '元素内容修改',
        '事件监听器',
        '页面加载事件'
      ],
      code: `<script>
    // 确保DOM加载完成后执行JavaScript代码
    document.addEventListener("DOMContentLoaded", function() {
        // 获取ID为demo的元素
        let myDom = document.getElementById("demo");
        // 完善console.log语句
        console.log("获取到元素:", myDom);
        // 修改元素内容
        myDom.innerHTML = '我是汤兴伟';
    });
</script>`,
      difficulty: '中级'
    },
    {
      id: 'callback-functions',
      title: '回调函数练习',
      date: '4.16课上练习',
      description: '理解回调函数概念和异步编程基础',
      technologies: ['回调函数', 'setTimeout', '异步编程', '函数参数'],
      features: [
        '回调函数定义',
        '异步操作模拟',
        '函数作为参数',
        '定时器使用'
      ],
      code: `<script>
    function 点餐(餐名, 通知我) {
        console.log(\`已点\${餐名}，厨师正在准备\`);
        
        // 模拟食物准备时间
        setTimeout(function() {
            // 食物准备好了，调用回调函数通知你
            通知我(\`您的\${餐名}已经准备好了！\`);
        }, 2000);
    }

    点餐("宫保鸡丁", function(消息) {
        console.log(消息);  // 两秒后输出：您的宫保鸡丁已经准备好了！
    });
    console.log("我可以继续做其他事情");  // 这行会立即执行
</script>`,
      difficulty: '中级'
    }
  ];

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case '初级': return 'bg-green-100 text-green-800';
      case '中级': return 'bg-yellow-100 text-yellow-800';
      case '高级': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-yellow-50 to-orange-50 p-6">
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <Link
            href="/exercises"
            className="inline-flex items-center text-yellow-600 hover:text-yellow-800 mb-4 transition-colors"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            返回练习列表
          </Link>
          <h1 className="text-4xl font-bold text-gray-800 mb-2">JavaScript 基础练习</h1>
          <p className="text-gray-600 text-lg">学习JavaScript语法、DOM操作和事件处理</p>
        </div>

        {/* Exercises List */}
        <div className="space-y-8">
          {exercises.map((exercise, index) => (
            <div key={exercise.id} className="bg-white rounded-xl shadow-lg overflow-hidden">
              {/* Exercise Header */}
              <div className="bg-gradient-to-r from-yellow-500 to-orange-500 p-6 text-white">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <h2 className="text-2xl font-bold">{exercise.title}</h2>
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${getDifficultyColor(exercise.difficulty)}`}>
                        {exercise.difficulty}
                      </span>
                    </div>
                    <div className="flex items-center text-yellow-100 mb-3">
                      <Calendar className="w-4 h-4 mr-2" />
                      <span>{exercise.date}</span>
                    </div>
                    <p className="text-yellow-100">{exercise.description}</p>
                  </div>
                  <Link
                    href={`/exercises/javascript-fundamentals/${exercise.id}`}
                    className="bg-white bg-opacity-20 hover:bg-opacity-30 px-4 py-2 rounded-lg transition-all duration-200 flex items-center ml-4"
                  >
                    <ExternalLink className="w-4 h-4 mr-2" />
                    查看练习
                  </Link>
                </div>
              </div>

              {/* Exercise Content */}
              <div className="p-6">
                <div className="grid lg:grid-cols-3 gap-6">
                  {/* Technologies */}
                  <div>
                    <h3 className="text-lg font-semibold text-gray-800 mb-3">使用技术</h3>
                    <div className="flex flex-wrap gap-2">
                      {exercise.technologies.map((tech, techIndex) => (
                        <span
                          key={techIndex}
                          className="bg-yellow-100 text-yellow-800 px-3 py-1 rounded-full text-sm font-medium"
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
                      {exercise.features.map((feature, featureIndex) => (
                        <li key={featureIndex} className="flex items-center text-gray-600">
                          <div className="w-2 h-2 bg-yellow-500 rounded-full mr-3"></div>
                          {feature}
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Quick Preview */}
                  <div>
                    <h3 className="text-lg font-semibold text-gray-800 mb-3">练习概览</h3>
                    <div className="bg-gray-50 rounded-lg p-4">
                      <div className="flex items-center text-sm text-gray-600 mb-2">
                        <Zap className="w-4 h-4 mr-2" />
                        练习 {index + 1} / {exercises.length}
                      </div>
                      <p className="text-sm text-gray-700">
                        {exercise.description}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Code Preview */}
                <div className="mt-6 pt-6 border-t border-gray-200">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-lg font-semibold text-gray-800">代码预览</h3>
                    <button className="flex items-center px-3 py-1 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors text-sm">
                      <Play className="w-3 h-3 mr-1" />
                      运行代码
                    </button>
                  </div>
                  <div className="bg-gray-900 rounded-lg overflow-hidden">
                    <div className="bg-gray-800 px-4 py-2 text-gray-300 text-sm flex items-center">
                      <div className="flex space-x-2 mr-4">
                        <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                        <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                        <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                      </div>
                      {exercise.date}.html
                    </div>
                    <pre className="p-4 text-sm text-gray-300 overflow-x-auto">
                      <code>{exercise.code}</code>
                    </pre>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* JavaScript Learning Path */}
        <div className="mt-12 bg-white rounded-xl shadow-lg p-8">
          <h2 className="text-2xl font-bold text-gray-800 mb-6">JavaScript 学习路径</h2>
          <div className="grid md:grid-cols-3 gap-6">
            <div className="text-center">
              <div className="bg-green-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-green-600">1</span>
              </div>
              <h3 className="text-lg font-semibold text-gray-800 mb-2">基础语法</h3>
              <p className="text-gray-600 text-sm">
                变量声明、数据类型、运算符和控制结构
              </p>
            </div>
            <div className="text-center">
              <div className="bg-yellow-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-yellow-600">2</span>
              </div>
              <h3 className="text-lg font-semibold text-gray-800 mb-2">DOM 操作</h3>
              <p className="text-gray-600 text-sm">
                元素获取、内容修改和事件处理
              </p>
            </div>
            <div className="text-center">
              <div className="bg-orange-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-orange-600">3</span>
              </div>
              <h3 className="text-lg font-semibold text-gray-800 mb-2">异步编程</h3>
              <p className="text-gray-600 text-sm">
                回调函数、Promise 和异步操作
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}