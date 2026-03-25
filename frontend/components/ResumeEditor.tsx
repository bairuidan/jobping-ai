'use client';

import { useEffect, useState } from 'react';

type Props = {
  initialValue: string;
  onChange?: (value: string) => void;
};

export function ResumeEditor({ initialValue, onChange }: Props) {
  const [value, setValue] = useState(initialValue);

  useEffect(() => {
    setValue(initialValue);
  }, [initialValue]);

  return (
    <section className="card space-y-3">
      <h2 className="font-semibold">简历预览（可编辑）</h2>
      <textarea
        className="w-full min-h-[360px] p-4 rounded-lg border border-gray-200 bg-[#fbfbfa] font-mono text-sm"
        value={value}
        onChange={(e) => {
          setValue(e.target.value);
          onChange?.(e.target.value);
        }}
      />
    </section>
  );
}
