'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { http } from '@/utils/api';
import { getDecryptedKey, saveEncryptedKey } from '@/utils/crypto';
import { setCurrentVersionId } from '@/utils/storage';

export default function HomePage() {
  const router = useRouter();
  const [jd, setJd] = useState('');
  const [resume, setResume] = useState('');
  const [apiKey, setApiKey] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    setApiKey(getDecryptedKey());
  }, []);

  const analyze = async () => {
    setError('');
    setLoading(true);
    try {
      saveEncryptedKey(apiKey);
      const { data } = await http.post('/api/analyze', { jd, resume, apiKey });
      setCurrentVersionId(data.versionId);
      router.push('/result');
    } catch (e: any) {
      setError(e?.response?.data?.message || '分析失败');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-4">
      <h1 className="text-2xl font-semibold">AI招聘打招呼与简历优化工具</h1>
      <div className="card space-y-4">
        <div>
          <label className="text-sm">DeepSeek API Key（前端AES加密存储）</label>
          <input
            type="password"
            className="mt-1 w-full border rounded-lg p-2"
            value={apiKey}
            onChange={(e) => setApiKey(e.target.value)}
          />
        </div>
        <div>
          <label className="text-sm">岗位JD</label>
          <textarea className="mt-1 w-full border rounded-lg p-2 min-h-40" value={jd} onChange={(e) => setJd(e.target.value)} />
        </div>
        <div>
          <label className="text-sm">候选人简历</label>
          <textarea className="mt-1 w-full border rounded-lg p-2 min-h-56" value={resume} onChange={(e) => setResume(e.target.value)} />
        </div>
        {error && <p className="text-red-500 text-sm">{error}</p>}
        <button disabled={loading} onClick={analyze} className="bg-black text-white px-4 py-2 rounded-lg disabled:opacity-60">
          {loading ? '分析中...' : '开始分析'}
        </button>
      </div>
    </div>
  );
}
