'use client';

type Props = {
  greetings: string[];
};

export function GreetingCards({ greetings }: Props) {
  const copyText = async (text: string) => {
    await navigator.clipboard.writeText(text);
    alert('已复制');
  };

  return (
    <section className="card space-y-3">
      <h2 className="font-semibold">打招呼话术</h2>
      {greetings.map((text, i) => (
        <div key={`${text}-${i}`} className="rounded-lg border border-gray-200 p-3 flex justify-between gap-3">
          <p className="text-sm">{text}</p>
          <button onClick={() => copyText(text)} className="text-xs border px-2 py-1 rounded-md">
            复制
          </button>
        </div>
      ))}
    </section>
  );
}
