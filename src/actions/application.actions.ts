'use server';

import { prisma } from '@/lib/db';
import { auth } from '@/lib/auth';
import { revalidatePath } from 'next/cache';
import { applicationSchema } from '@/validations/application.schema';

export async function createApplication(data: {
  companyName: string;
  role: string;
  jobLink?: string;
  notes?: string;
}) {
  const session = await auth();

  if (!session?.user?.id) {
    return { error: 'Unauthorized' };
  }

  const result = applicationSchema.safeParse(data);

  if (!result.success) {
    return { error: result.error.errors[0].message };
  }

  await prisma.application.create({
    data: {
      userId: session.user.id,
      companyName: result.data.companyName,
      role: result.data.role,
      jobLink: result.data.jobLink || null,
      notes: result.data.notes || null,
    },
  });

  revalidatePath('/applications');
  revalidatePath('/dashboard');

  return { success: true };
}

export async function getApplications() {
  const session = await auth();

  if (!session?.user?.id) {
    return { error: 'Unauthorized', data: [] };
  }

  const applications = await prisma.application.findMany({
    where: { userId: session.user.id },
    orderBy: { createdAt: 'desc' },
  });

  return { data: applications };
}

export async function getApplicationStats() {
  const session = await auth();

  if (!session?.user?.id) {
    return { error: 'Unauthorized', data: null };
  }

  const counts = await prisma.application.groupBy({
    by: ['status'],
    where: { userId: session.user.id },
    _count: { status: true },
  });

  const stats = {
    total: 0,
    APPLIED: 0,
    INTERVIEW: 0,
    OFFER: 0,
    REJECTED: 0,
  };

  counts.forEach((c) => {
    stats[c.status as keyof typeof stats] = c._count.status;
    stats.total += c._count.status;
  });

  return { data: stats };
}

export async function updateApplicationStatus(
  applicationId: string,
  status: 'APPLIED' | 'INTERVIEW' | 'OFFER' | 'REJECTED'
) {
  const session = await auth();

  if (!session?.user?.id) {
    return { error: 'Unauthorized' };
  }

  await prisma.application.update({
    where: {
      id: applicationId,
      userId: session.user.id,
    },
    data: { status },
  });

  revalidatePath('/applications');
  revalidatePath('/dashboard');

  return { success: true };
}

export async function deleteApplication(applicationId: string) {
  const session = await auth();

  if (!session?.user?.id) {
    return { error: 'Unauthorized' };
  }

  await prisma.application.delete({
    where: {
      id: applicationId,
      userId: session.user.id,
    },
  });

  revalidatePath('/applications');
  revalidatePath('/dashboard');

  return { success: true };
}