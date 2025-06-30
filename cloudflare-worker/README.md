# WakaTime Footer 组件集成指南

本指南将帮助您在网站页脚集成 WakaTime 编程统计显示组件。

## 架构概述

```
网站页脚 → Cloudflare Worker → WakaTime API → 统计数据显示
```

## 配置步骤

### 1. 部署 Cloudflare Worker

1. 登录 [Cloudflare Dashboard](https://dash.cloudflare.com/)
2. 进入 "Workers & Pages" 部分
3. 点击 "Create application" → "Create Worker"
4. 将 `wakatime-worker.js` 中的代码复制到编辑器中
5. 点击 "Save and Deploy"

### 2. 配置环境变量

1. 在 Worker 详情页面，点击 "Settings" → "Variables"
2. 添加环境变量：
   - 变量名: `WAKATIME_API_KEY`
   - 值: 您的 WakaTime API Key
3. 点击 "Save"

### 3. 获取 WakaTime API Key

1. 登录 [WakaTime](https://wakatime.com/)
2. 进入 [Settings → API Key](https://wakatime.com/api-key)
3. 复制您的 API Key

### 4. 更新 Footer 组件

在 `app/components/Footer.tsx` 文件中，将第 25 行的 `YOUR_CLOUDFLARE_WORKER_URL` 替换为您的 Worker URL：

```typescript
const response = await fetch('https://your-worker-name.your-subdomain.workers.dev');
```

## 组件功能

Footer 组件将显示以下 WakaTime 统计信息：

- **总编程时间**: 显示累计编程时长
- **日均编程时间**: 显示每日平均编程时长
- **主要编程语言**: 显示使用最多的前3种编程语言及占比

## 样式特性

- 响应式设计，适配移动端和桌面端
- 深色主题，与网站整体风格一致
- 加载状态和错误处理
- 优雅的动画过渡效果

## 缓存策略

Cloudflare Worker 设置了1小时的缓存，减少对 WakaTime API 的请求频率，提高页面加载速度。

## 故障排除

### 常见问题

1. **显示"加载失败"**
   - 检查 Cloudflare Worker 是否正常部署
   - 验证 WakaTime API Key 是否正确配置
   - 确认 Worker URL 是否正确

2. **显示"暂无数据"**
   - 确保您的 WakaTime 账户有编程活动记录
   - 检查 API Key 权限是否正确

3. **CORS 错误**
   - Worker 代码已包含 CORS 头设置
   - 确保 Worker 代码完整复制

### 调试步骤

1. 在浏览器开发者工具中查看网络请求
2. 检查 Cloudflare Worker 日志
3. 验证 WakaTime API 响应

## 自定义选项

您可以根据需要修改 Footer 组件：

- 调整显示的语言数量（当前为前3种）
- 修改样式和布局
- 添加更多统计信息
- 自定义缓存时间

## 安全注意事项

- WakaTime API Key 存储在 Cloudflare Worker 环境变量中，不会暴露给客户端
- 使用 HTTPS 确保数据传输安全
- 定期更新 API Key

## 性能优化

- 使用 Cloudflare 全球 CDN 加速
- 1小时缓存减少 API 调用
- 异步加载，不影响页面主要内容显示