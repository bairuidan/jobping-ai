'use client';

export type Suggestion = {
  before: string;
  after: string;
  reason: string;
};

export function SuggestionDiff({ suggestions }: { suggestions: Suggestion[] }) {
  return (
    <section className="card space-y-3">
      <h2 className="font-semibold">简历优化建议</h2>
      {suggestions.map((s, i) => (
        <div key={i} className="grid grid-cols-1 md:grid-cols-2 gap-3 border rounded-lg p-3">
          <div>
            <p className="text-xs text-gray-500 mb-1">Before</p>
            <p className="bg-red-50 border border-red-100 rounded p-2 text-sm">{s.before}</p>
          </div>
          <div>
            <p className="text-xs text-gray-500 mb-1">After</p>
            <p className="bg-green-50 border border-green-100 rounded p-2 text-sm">{s.after}</p>
          </div>
          <p className="text-xs text-gray-600 md:col-span-2">原因：{s.reason}</p>
        </div>
      ))}
    </section>
  );
}
