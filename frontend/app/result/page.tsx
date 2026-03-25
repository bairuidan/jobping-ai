'use client';

import { useEffect, useState } from 'react';
import { GreetingCards } from '@/components/GreetingCards';
import { ResumeEditor } from '@/components/ResumeEditor';
import { Suggestion, SuggestionDiff } from '@/components/SuggestionDiff';
import { http } from '@/utils/api';
import { getCurrentVersionId } from '@/utils/storage';

type VersionData = {
  id: number;
  greetings: string[];
  suggestions: Suggestion[];
  optimizedResume: string;
};

export default function ResultPage() {
  const [data, setData] = useState<VersionData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const load = async () => {
      const versionId = getCurrentVersionId();
      if (!versionId) return setLoading(false);
      const res = await http.get(`/api/versions/${versionId}`);
      setData(res.data);
      localStorage.setItem('jobping_edited_resume', res.data.optimizedResume);
      setLoading(false);
    };

    load().catch(() => setLoading(false));
  }, []);

  if (loading) return <p>加载中...</p>;
  if (!data) return <p>暂无结果，请先在首页分析。</p>;

  return (
    <div className="space-y-4">
      <GreetingCards greetings={data.greetings} />
      <SuggestionDiff suggestions={data.suggestions} />
      <ResumeEditor
        initialValue={data.optimizedResume}
        onChange={(text) => localStorage.setItem('jobping_edited_resume', text)}
      />
    </div>
  );
}
