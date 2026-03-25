'use client';

import { useState } from 'react';
import { http } from '@/utils/api';
import { getCurrentVersionId } from '@/utils/storage';

export default function SharePage() {
  const [link, setLink] = useState('');

  const generate = async () => {
    const versionId = getCurrentVersionId();
    if (!versionId) return alert('请先生成结果');
    const { data } = await http.post('/api/share', { versionId });
    const url = `${window.location.origin}/s/${data.token}`;
    setLink(url);
  };

  return (
    <div className="space-y-4">
      <h1 className="text-xl font-semibold">分享页</h1>
      <button onClick={generate} className="bg-black text-white rounded-md px-4 py-2">生成分享链接</button>
      {link && (
        <div className="card flex items-center justify-between gap-3">
          <p className="text-sm break-all">{link}</p>
          <button onClick={() => navigator.clipboard.writeText(link)} className="border rounded px-3 py-1 text-sm">复制</button>
        </div>
      )}
    </div>
  );
}
