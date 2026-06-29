import { getApplications } from '@/actions/application.actions';
import ApplicationCard from '@/components/applications/ApplicationCard';
import Link from 'next/link';

export default async function ApplicationsPage() {
  const result = await getApplications();
  const applications = result.data || [];

  return (
    <div className="max-w-3xl mx-auto p-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">My Applications</h1>
        <Link
          href="/applications/new"
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          + Add Application
        </Link>
      </div>

      {applications.length === 0 ? (
        <p className="text-gray-500">No applications yet. Add your first one!</p>
      ) : (
        <div className="space-y-3">
          {applications.map((app) => (
            <ApplicationCard key={app.id} application={app} />
          ))}
        </div>
      )}
    </div>
  );
}