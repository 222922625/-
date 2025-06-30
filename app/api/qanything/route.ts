import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
  const { prompt } = await req.json();

  // 使用DeepSeek API配置
  const apiKey = process.env.DEEPSEEK_API_KEY;
  const baseUrl = process.env.DEEPSEEK_BASE_URL || 'https://api.deepseek.com';

  if (!apiKey) {
    return NextResponse.json({ error: 'DeepSeek API key not configured' }, { status: 500 });
  }

  try {
    const endpoint = `${baseUrl}/chat/completions`;

    console.log(`Calling DeepSeek API: ${endpoint}`);

    const requestBody = {
      model: 'deepseek-chat',
      messages: [
        {
          role: 'system',
          content: '你是一个有用的AI助手，请用中文回答用户的问题。'
        },
        {
          role: 'user',
          content: prompt
        }
      ],
      temperature: 0.7,
      max_tokens: 2000,
      stream: false
    };

    const response = await fetch(endpoint, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${apiKey}`,
      },
      body: JSON.stringify(requestBody),
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error(`DeepSeek API error (${response.status}):`, errorText);
      return NextResponse.json(
        { error: `DeepSeek API error: ${response.status}` },
        { status: response.status }
      );
    }

    const data = await response.json();

    if (!data.choices || data.choices.length === 0) {
      console.error('No response from DeepSeek API');
      return NextResponse.json(
        { error: 'No response from DeepSeek API' },
        { status: 500 }
      );
    }

    const answer = data.choices[0].message.content;
    console.log('DeepSeek API response received successfully');

    return NextResponse.json({ answer });
  } catch (error) {
    console.error('DeepSeek API call failed:', error);

    // 返回友好的错误消息
    return NextResponse.json(
      {
        answer: '抱歉，AI服务暂时不可用，请稍后再试。',
        error: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    );
  }
}