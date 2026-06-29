import Link from 'next/link';

const stages = [
  {
    label: 'APPLIED',
    color: 'border-slate-300 bg-slate-50',
    dot: 'bg-slate-400',
    cards: ['Frontend Engineer — Razorpay', 'SDE I — Atlassian'],
  },
  {
    label: 'INTERVIEW',
    color: 'border-amber-300 bg-amber-50',
    dot: 'bg-amber-500',
    cards: ['Frontend Developer — Postman'],
  },
  {
    label: 'OFFER',
    color: 'border-emerald-300 bg-emerald-50',
    dot: 'bg-emerald-500',
    cards: ['React Developer — Freshworks'],
  },
];

export default function Home() {
  return (
    <main className="min-h-screen overflow-hidden">
      <div className="max-w-6xl mx-auto px-6 py-20 grid lg:grid-cols-2 gap-16 items-center">
        {/* Left: copy */}
        <div className="animate-fade-up">
          <p className="font-mono text-xs tracking-[0.2em] text-blue-700 mb-4">
            FOR YOUR JOB SEARCH
          </p>
          <h1
            className="text-4xl sm:text-5xl font-bold leading-[1.1] text-slate-900"
            style={{ fontFamily: 'var(--font-display)' }}
          >
            Know exactly where every application stands.
          </h1>
          <p className="mt-5 text-slate-500 text-lg leading-relaxed max-w-md">
            Add applications as you apply, move them through stages as you hear back,
            and see your progress at a glance — no spreadsheet required.
          </p>

          <div className="mt-8 flex items-center gap-3">
            <Link
              href="/signup"
              className="bg-blue-600 text-white px-5 py-2.5 rounded-lg font-medium hover:bg-blue-700 transition-colors"
            >
              Sign up
            </Link>
            <Link
              href="/login"
              className="px-5 py-2.5 rounded-lg font-medium text-slate-700 border border-slate-300 hover:bg-slate-100 transition-colors"
            >
              Log in
            </Link>
          </div>

          <dl className="mt-14 space-y-5 max-w-md">
            <div className="flex gap-4">
              <dt className="font-mono text-xs tracking-wider text-slate-400 mt-0.5 w-20 shrink-0">APPLIED</dt>
              <dd className="text-sm text-slate-500">Log the role, company, and link the moment you hit submit.</dd>
            </div>
            <div className="flex gap-4">
              <dt className="font-mono text-xs tracking-wider text-amber-600 mt-0.5 w-20 shrink-0">INTERVIEW</dt>
              <dd className="text-sm text-slate-500">Move it forward when you hear back — no more digging through email.</dd>
            </div>
            <div className="flex gap-4">
              <dt className="font-mono text-xs tracking-wider text-emerald-600 mt-0.5 w-20 shrink-0">OFFER</dt>
              <dd className="text-sm text-slate-500">See your whole search at a glance, and know what needs a follow-up.</dd>
            </div>
          </dl>
        </div>

        {/* Right: pipeline visual */}
        <div className="grid grid-cols-3 gap-4 animate-fade-up" style={{ animationDelay: '150ms' }}>
          {stages.map((stage) => (
            <div key={stage.label} className="space-y-3">
              <p className="font-mono text-[10px] tracking-wider text-slate-400 text-center">
                {stage.label}
              </p>
              {stage.cards.map((card) => {
                const isOffer = stage.label === 'OFFER';
                return (
                  <div
                    key={card}
                    className={`rounded-lg border ${stage.color} p-3 text-xs text-slate-900 shadow-sm ${
                      isOffer ? 'ring-2 ring-emerald-400/60 animate-pulse-ring' : ''
                    }`}
                  >
                    <span className={`inline-block w-1.5 h-1.5 rounded-full ${stage.dot} mr-1.5`} />
                    {card}
                  </div>
                );
              })}
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}