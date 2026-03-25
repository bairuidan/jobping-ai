'use client';

import { useEffect, useState } from 'react';
import { http } from '@/utils/api';
import { useParams } from 'next/navigation';
import { GreetingCards } from '@/components/GreetingCards';
import { SuggestionDiff } from '@/components/SuggestionDiff';

export default function SharedPage() {
  const { token } = useParams<{ token: string }>();
  const [data, setData] = useState<any>(null);

  useEffect(() => {
    if (!token) return;
    http.get(`/api/share/${token}`).then((res) => setData(res.data));
  }, [token]);

  if (!data) return <p>加载分享内容中...</p>;

  return (
    <div className="space-y-4">
      <h1 className="text-xl font-semibold">分享简历（只读）</h1>
      <GreetingCards greetings={data.greetings} />
      <SuggestionDiff suggestions={data.suggestions} />
      <div className="card whitespace-pre-wrap">{data.optimizedResume}</div>
    </div>
  );
}
