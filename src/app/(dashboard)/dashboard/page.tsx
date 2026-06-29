import { auth } from '@/lib/auth';
import { getApplicationStats } from '@/actions/application.actions';

const statCards = [
  { key: 'total', label: 'Total applications', color: 'bg-slate-100 text-slate-700' },
  { key: 'APPLIED', label: 'Applied', color: 'bg-slate-100 text-slate-700' },
  { key: 'INTERVIEW', label: 'Interview', color: 'bg-amber-100 text-amber-700' },
  { key: 'OFFER', label: 'Offer', color: 'bg-emerald-100 text-emerald-700' },
  { key: 'REJECTED', label: 'Rejected', color: 'bg-red-100 text-red-700' },
] as const;

export default async function DashboardPage() {
  const session = await auth();
  const result = await getApplicationStats();
  const stats = result.data;

  return (
    <div>
      <h1 className="text-2xl font-semibold text-slate-900">
        Welcome back{session?.user?.name ? `, ${session.user.name}` : ''}
      </h1>
      <p className="text-slate-500 mt-1">Here's your job search at a glance.</p>

      <div className="grid grid-cols-2 sm:grid-cols-5 gap-4 mt-6">
        {statCards.map((card) => (
          <div key={card.key} className="bg-white border border-slate-200 rounded-lg p-4">
            <p className="text-2xl font-semibold text-slate-900">
              {stats ? stats[card.key] : 0}
            </p>
            <span
              className={`inline-block mt-2 text-xs px-2 py-0.5 rounded-full font-medium ${card.color}`}
            >
              {card.label}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}