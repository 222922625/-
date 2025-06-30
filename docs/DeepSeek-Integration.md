# DeepSeek 悬浮聊天集成指南

## 功能概述

本项目集成了 DeepSeek 大语言模型问答服务，以悬浮窗的形式提供智能对话功能。用户可以在网站的任何页面通过右下角的聊天按钮与AI助手进行交互。

## 功能特性

- 🎯 **悬浮窗设计**: 不干扰主要内容，随时可用
- 💬 **实时对话**: 支持多轮对话，保持上下文
- 📱 **响应式设计**: 适配不同屏幕尺寸
- 🚀 **高性能**: 基于 DeepSeek 先进的语言模型
- 🔒 **安全可靠**: API 密钥通过环境变量管理
- 🎨 **现代化UI**: 简洁美观的用户界面

## 主要特性

- **OpenAI兼容API**：使用标准的 OpenAI 兼容 API 格式
- **智能对话**：基于 DeepSeek 强大的语言理解能力
- **错误处理**：提供友好的错误提示和降级响应
- **安全性**：API 密钥通过环境变量管理
- **模块化设计**：独立的 API 调用库，易于维护和扩展
- **类型安全**：完整的 TypeScript 类型定义
- **用户体验**：非侵入式浮动窗口设计

## 技术架构

```
前端悬浮窗 → DeepSeek API库 → DeepSeek API → AI响应
```

### 核心组件

1. **FloatingChat.tsx**: 悬浮聊天窗口组件
2. **lib/deepseek.ts**: DeepSeek API调用库
3. **app/api/qanything/route.ts**: API路由处理
4. **Layout集成**: 全局可用的聊天功能

### DeepSeek API 调用库 (`/lib/deepseek.ts`)
- 使用 OpenAI 兼容的 API 格式
- 提供 `fetchAnswer()` 函数进行 API 调用
- 提供 `askDeepSeek()` 简化调用接口
- 内置错误处理和连接检查功能

### 浮动聊天组件 (`FloatingChat.tsx`)
- 现代化 UI 设计，支持最小化/最大化
- 实时消息显示和输入处理
- 通过 API 路由调用 DeepSeek 服务
- 响应式设计，适配不同屏幕尺寸

### API 路由 (`app/api/qanything/route.ts`)
- 服务端 API 调用，保护 API 密钥
- 统一的错误处理和响应格式
- 支持 CORS 和安全配置

## 环境变量配置

在项目根目录创建 `.env.local` 文件：

```env
# DeepSeek API 配置
DEEPSEEK_API_KEY=sk-f879857d7f344354bbf22619e5b38df4
DEEPSEEK_BASE_URL=https://api.deepseek.com
```

### 获取 DeepSeek API 密钥

1. 访问 [DeepSeek 平台](https://platform.deepseek.com/)
2. 注册并登录账户
3. 在 API 密钥页面创建新的 API 密钥
4. 将密钥复制到 `.env.local` 文件中

## 配置说明

### API 端点配置

DeepSeek API 使用标准的 OpenAI 兼容端点：
- **API 根地址**: `https://api.deepseek.com`
- **聊天端点**: `/chat/completions`
- **模型**: `deepseek-chat`

### 请求参数

```json
{
  "model": "deepseek-chat",
  "messages": [
    {
      "role": "system",
      "content": "你是一个有用的AI助手，请用中文回答用户的问题。"
    },
    {
      "role": "user",
      "content": "用户的问题"
    }
  ],
  "temperature": 0.7,
  "max_tokens": 2000,
  "stream": false
}
```

## 使用方法

### 1. 安装依赖

```bash
npm install
```

### 2. 配置环境变量

复制 `.env.example` 为 `.env.local` 并填入您的 DeepSeek API 密钥：

```bash
cp .env.example .env.local
```

### 3. 启动开发服务器

```bash
npm run dev
```

### 4. 测试聊天功能

1. 打开浏览器访问 `http://localhost:3000`
2. 点击右下角的聊天图标
3. 输入问题并发送
4. 查看 AI 回复

## 故障排除

### 常见问题

1. **API 调用失败**：
   - 检查 API 密钥是否正确
   - 确认网络连接正常
   - 查看浏览器控制台的错误信息

2. **环境变量未生效**：
   - 确认 `.env.local` 文件在项目根目录
   - 重启开发服务器
   - 检查环境变量名称是否正确

3. **聊天窗口不显示**：
   - 检查 FloatingChat 组件是否正确导入
   - 确认 CSS 样式是否加载
   - 查看浏览器开发者工具的错误信息

### 调试模式

在开发环境中，API 调用会在控制台输出详细的日志信息：

```javascript
console.log('Calling DeepSeek API:', endpoint);
console.log('DeepSeek API response received successfully');
```

## 安全考虑

- API密钥通过环境变量管理，不会暴露到前端
- 所有API调用通过Next.js API路由代理
- 输入内容进行基本的安全过滤
- 使用 HTTPS 加密传输

## 性能优化

- 使用 Next.js API 路由减少客户端请求
- 实现请求缓存机制
- 优化组件渲染性能
- 支持流式响应（可选）

## 扩展功能

### 集成其他AI服务

组件设计具有良好的扩展性，可以轻松集成其他AI服务：

```tsx
// 创建新的API路由
// app/api/openai/route.ts
// app/api/claude/route.ts

// 修改FloatingChat组件的API调用
const response = await fetch('/api/openai', {
  // ...
});
```

### 自定义模型参数

可以通过修改 API 路由来自定义模型参数：

```typescript
const requestBody = {
  model: 'deepseek-chat',
  temperature: 0.8,  // 调整创造性
  max_tokens: 4000,  // 增加最大令牌数
  top_p: 0.9,        // 添加 top_p 参数
};
```

## 更新日志

### v2.0.0 - DeepSeek 集成
- **重大更新**: 完全替换为 DeepSeek API
- **新功能**: 使用 OpenAI 兼容的 API 格式
- **优化**: 简化了 API 调用流程，移除复杂的签名机制
- **改进**: 更好的错误处理和用户体验
- **配置**: 更新环境变量配置为 DeepSeek 格式

### v1.2.0 - QAnything 集成（已废弃）
- 根据用户配置更新API集成
- 修复API端点和请求参数格式
- 更新 `QANYTHING_BOT_ID` 环境变量
- 优化错误处理和重试机制

## 技术支持

如果您在使用过程中遇到问题，请：

1. 查看本文档的故障排除部分
2. 检查浏览器控制台的错误信息
3. 确认API密钥和配置是否正确
4. 查看 [DeepSeek 官方文档](https://platform.deepseek.com/docs)

## 许可证

本项目遵循 MIT 许可证。