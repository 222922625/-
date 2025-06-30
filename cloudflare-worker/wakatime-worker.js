// Cloudflare Worker 代码示例
// 用于代理 WakaTime API 请求

export default {
  async fetch(request, env, ctx) {
    // 处理 CORS 预检请求
    if (request.method === 'OPTIONS') {
      return new Response(null, {
        status: 200,
        headers: {
          'Access-Control-Allow-Origin': '*',
          'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
          'Access-Control-Allow-Headers': 'Content-Type, Authorization',
        },
      });
    }

    try {
      // 从环境变量获取 WakaTime API Key
      const WAKATIME_API_KEY = env.WAKATIME_API_KEY;

      if (!WAKATIME_API_KEY) {
        return new Response(JSON.stringify({ error: 'WakaTime API key not configured' }), {
          status: 500,
          headers: {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*',
          },
        });
      }

      // 调用 WakaTime API 获取统计数据
      const wakatimeResponse = await fetch('https://wakatime.com/api/v1/users/current/stats/last_year', {
        headers: {
          'Authorization': `Bearer ${WAKATIME_API_KEY}`,
        },
      });

      if (!wakatimeResponse.ok) {
        throw new Error(`WakaTime API error: ${wakatimeResponse.status}`);
      }

      const data = await wakatimeResponse.json();

      // 返回处理后的数据
      return new Response(JSON.stringify(data.data), {
        status: 200,
        headers: {
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*',
          'Cache-Control': 'public, max-age=3600', // 缓存1小时
        },
      });

    } catch (error) {
      return new Response(JSON.stringify({ error: error.message }), {
        status: 500,
        headers: {
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*',
        },
      });
    }
  },
};

// 部署说明:
// 1. 在 Cloudflare Workers 控制台创建新的 Worker
// 2. 将此代码复制到 Worker 编辑器中
// 3. 在 Worker 设置中添加环境变量 WAKATIME_API_KEY
// 4. 部署 Worker 并获取 URL
// 5. 在 Footer.tsx 中将 'YOUR_CLOUDFLARE_WORKER_URL' 替换为实际的 Worker URL