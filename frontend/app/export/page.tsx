'use client';

import { useRef, useState } from 'react';
import { toPng } from 'html-to-image';
import { http } from '@/utils/api';

export default function ExportPage() {
  const [content, setContent] = useState('');
  const ref = useRef<HTMLDivElement>(null);

  const loadResume = () => {
    setContent(localStorage.getItem('jobping_edited_resume') || '');
  };

  const exportImage = async () => {
    if (!ref.current) return;
    const dataUrl = await toPng(ref.current, { cacheBust: true });
    const a = document.createElement('a');
    a.href = dataUrl;
    a.download = 'optimized-resume.png';
    a.click();
  };

  const exportPdf = async () => {
    const html = `<html><body style="font-family:Arial;padding:24px;white-space:pre-wrap;line-height:1.6;">${content.replace(/\n/g, '<br/>')}</body></html>`;
    const res = await http.post('/api/export/pdf', { html }, { responseType: 'blob' });
    const url = URL.createObjectURL(res.data);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'optimized-resume.pdf';
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="space-y-4">
      <h1 className="text-xl font-semibold">导出页</h1>
      <button onClick={loadResume} className="border rounded-md px-3 py-2">加载当前简历</button>
      <div ref={ref} className="card whitespace-pre-wrap min-h-[320px]">{content || '请先加载简历'}</div>
      <div className="flex gap-3">
        <button onClick={exportPdf} className="bg-black text-white rounded-md px-4 py-2">导出PDF</button>
        <button onClick={exportImage} className="border rounded-md px-4 py-2">导出图片</button>
      </div>
    </div>
  );
}
