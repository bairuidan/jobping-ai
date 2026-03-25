import axios from 'axios';

const DEEPSEEK_URL = 'https://api.deepseek.com/chat/completions';

export async function callDeepSeek({ apiKey, messages, temperature = 0.7 }) {
  if (!apiKey) {
    throw new Error('Missing DeepSeek API Key');
  }

  const response = await axios.post(
    DEEPSEEK_URL,
    {
      model: 'deepseek-chat',
      messages,
      temperature,
      response_format: { type: 'text' },
    },
    {
      headers: {
        Authorization: `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
      },
      timeout: 60000,
    }
  );

  return response.data?.choices?.[0]?.message?.content || '';
}

export function safeJsonParse(raw, fallback) {
  try {
    return JSON.parse(raw);
  } catch {
    const start = raw.indexOf('[') >= 0 ? raw.indexOf('[') : raw.indexOf('{');
    const end = Math.max(raw.lastIndexOf(']'), raw.lastIndexOf('}'));
    if (start >= 0 && end > start) {
      try {
        return JSON.parse(raw.slice(start, end + 1));
      } catch {
        return fallback;
      }
    }
    return fallback;
  }
}
