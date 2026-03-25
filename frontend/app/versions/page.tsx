'use client';

import { useEffect, useState } from 'react';
import { http } from '@/utils/api';
import { setCurrentVersionId } from '@/utils/storage';
import { useRouter } from 'next/navigation';

type Item = {
  id: number;
  createdAt: string;
  jd: string;
};

export default function VersionsPage() {
  const [items, setItems] = useState<Item[]>([]);
  const router = useRouter();

  useEffect(() => {
    http.get('/api/versions').then((res) => setItems(res.data));
  }, []);

  return (
    <div className="space-y-4">
      <h1 className="text-xl font-semibold">版本时间线</h1>
      <div className="space-y-2">
        {items.map((item) => (
          <button
            key={item.id}
            className="card w-full text-left hover:border-black"
            onClick={() => {
              setCurrentVersionId(item.id);
              router.push('/result');
            }}
          >
            <p className="font-medium">Version #{item.id}</p>
            <p className="text-xs text-gray-500">{new Date(item.createdAt).toLocaleString()}</p>
            <p className="text-sm text-gray-700 line-clamp-2 mt-1">{item.jd}</p>
          </button>
        ))}
      </div>
    </div>
  );
}
