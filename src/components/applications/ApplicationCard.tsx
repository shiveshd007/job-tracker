'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { updateApplicationStatus, deleteApplication } from '@/actions/application.actions';

type Application = {
  id: string;
  companyName: string;
  role: string;
  status: string;
  jobLink: string | null;
  notes: string | null;
};

const statusStyles: Record<string, string> = {
  APPLIED: 'bg-slate-100 text-slate-700',
  INTERVIEW: 'bg-amber-100 text-amber-700',
  OFFER: 'bg-emerald-100 text-emerald-700',
  REJECTED: 'bg-red-100 text-red-700',
};

export default function ApplicationCard({ application }: { application: Application }) {
  const router = useRouter();
  const [status, setStatus] = useState(application.status);
  const [isDeleting, setIsDeleting] = useState(false);

  async function handleStatusChange(newStatus: string) {
    setStatus(newStatus);
    await updateApplicationStatus(
      application.id,
      newStatus as 'APPLIED' | 'INTERVIEW' | 'OFFER' | 'REJECTED'
    );
  }

  async function handleDelete() {
    if (!confirm(`Delete application for ${application.companyName}?`)) return;
    setIsDeleting(true);
    await deleteApplication(application.id);
    router.refresh();
  }

  return (
    <div className="border border-slate-200 rounded-lg p-4 flex justify-between items-center bg-white">
      <div>
        <div className="flex items-center gap-2">
          <h3 className="font-medium text-slate-900">{application.companyName}</h3>
          <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${statusStyles[status]}`}>
            {status}
          </span>
        </div>
        <p className="text-sm text-slate-500 mt-0.5">{application.role}</p>
      </div>

      <div className="flex items-center gap-3">
        <select
          value={status}
          onChange={(e) => handleStatusChange(e.target.value)}
          className="border border-slate-200 rounded p-1.5 text-sm text-slate-700"
        >
          <option value="APPLIED">Applied</option>
          <option value="INTERVIEW">Interview</option>
          <option value="OFFER">Offer</option>
          <option value="REJECTED">Rejected</option>
        </select>

        <button
          onClick={handleDelete}
          disabled={isDeleting}
          className="text-red-600 text-sm hover:underline disabled:opacity-50"
        >
          Delete
        </button>
      </div>
    </div>
  );
}