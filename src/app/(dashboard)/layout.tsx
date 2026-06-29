import { auth } from '@/lib/auth';
import Sidebar from '@/components/layout/Sidebar';

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await auth();

  return (
    <div className="flex bg-slate-50">
      <Sidebar userEmail={session?.user?.email} />
      <main className="flex-1 p-8">{children}</main>
    </div>
  );
}