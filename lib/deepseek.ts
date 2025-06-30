// DeepSeek API 调用函数
// 使用 OpenAI 兼容的 API 格式

interface DeepSeekMessage {
  role: 'system' | 'user' | 'assistant';
  content: string;
}

interface DeepSeekResponse {
  id: string;
  object: string;
  created: number;
  model: string;
  choices: {
    index: number;
    message: {
      role: string;
      content: string;
    };
    finish_reason: string;
  }[];
  usage: {
    prompt_tokens: number;
    completion_tokens: number;
    total_tokens: number;
  };
}

interface DeepSeekRequest {
  model: string;
  messages: DeepSeekMessage[];
  temperature?: number;
  max_tokens?: number;
  stream?: boolean;
}

/**
 * 调用 DeepSeek API 获取回答
 * @param question 用户问题
 * @param apiKey API 密钥
 * @param baseUrl API 基础URL
 * @returns Promise<string>
 */
export const fetchAnswer = async (
  question: string,
  apiKey?: string,
  baseUrl?: string
): Promise<string> => {
  const key = apiKey || process.env.DEEPSEEK_API_KEY;
  const url = baseUrl || process.env.DEEPSEEK_BASE_URL || 'https://api.deepseek.com';

  if (!key) {
    throw new Error('DeepSeek API key is required');
  }

  const endpoint = `${url}/chat/completions`;

  try {
    console.log(`Calling DeepSeek API: ${endpoint}`);

    const requestBody: DeepSeekRequest = {
      model: 'deepseek-chat',
      messages: [
        {
          role: 'system',
          content: '你是一个有用的AI助手，请用中文回答用户的问题。'
        },
        {
          role: 'user',
          content: question
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
        'Authorization': `Bearer ${key}`,
      },
      body: JSON.stringify(requestBody),
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error(`DeepSeek API error (${response.status}):`, errorText);
      throw new Error(`DeepSeek API error: ${response.status} - ${errorText}`);
    }

    const data: DeepSeekResponse = await response.json();

    if (!data.choices || data.choices.length === 0) {
      throw new Error('No response from DeepSeek API');
    }

    const answer = data.choices[0].message.content;
    console.log('DeepSeek API response received successfully');

    return answer;
  } catch (error) {
    console.error('DeepSeek API call failed:', error);
    throw error;
  }
};

/**
 * 简化的 DeepSeek API 调用接口
 * @param question 用户问题
 * @returns Promise<string>
 */
export const askDeepSeek = async (question: string): Promise<string> => {
  try {
    const response = await fetchAnswer(question);
    return response || '抱歉，无法获取回答。';
  } catch (error) {
    console.error('DeepSeek API call failed:', error);
    return `抱歉，服务暂时不可用。错误信息：${error instanceof Error ? error.message : 'Unknown error'}`;
  }
};

// 导出默认函数以保持向后兼容
export default {
  fetchAnswer,
  askDeepSeek
};