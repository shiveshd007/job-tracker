'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { createApplication } from '@/actions/application.actions';

export default function NewApplicationPage() {
  const router = useRouter();
  const [error, setError] = useState('');

  async function handleSubmit(formData: FormData) {
    const companyName = formData.get('companyName') as string;
    const role = formData.get('role') as string;
    const jobLink = formData.get('jobLink') as string;
    const notes = formData.get('notes') as string;

    const result = await createApplication({ companyName, role, jobLink, notes });

    if (result.error) {
      setError(result.error);
      return;
    }

    router.push('/applications');
  }

  return (
    <form action={handleSubmit} className="max-w-md mx-auto mt-12 space-y-4 p-6">
      <h1 className="text-2xl font-bold">Add Application</h1>
      {error && <p className="text-red-500">{error}</p>}

      <div>
        <label className="block text-sm font-medium mb-1">Company Name</label>
        <input
          name="companyName"
          required
          className="border p-2 w-full rounded"
          placeholder="e.g. Google"
        />
      </div>

      <div>
        <label className="block text-sm font-medium mb-1">Role</label>
        <input
          name="role"
          required
          className="border p-2 w-full rounded"
          placeholder="e.g. Frontend Developer"
        />
      </div>

      <div>
        <label className="block text-sm font-medium mb-1">Job Link (optional)</label>
        <input
          name="jobLink"
          type="url"
          className="border p-2 w-full rounded"
          placeholder="https://..."
        />
      </div>

      <div>
        <label className="block text-sm font-medium mb-1">Notes (optional)</label>
        <textarea
          name="notes"
          className="border p-2 w-full rounded"
          rows={3}
        />
      </div>

      <button
        type="submit"
        className="bg-blue-600 text-white p-2 w-full rounded hover:bg-blue-700"
      >
        Add Application
      </button>
    </form>
  );
}