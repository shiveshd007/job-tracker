'use server';

import bcrypt from 'bcryptjs';
import { prisma } from '@/lib/db';

export async function signup(email: string, password: string, name?: string) {
  const existingUser = await prisma.user.findUnique({ where: { email } });
  if (existingUser) {
    return { error: 'User already exists with this email' };
  }

  const passwordHash = await bcrypt.hash(password, 10);

  await prisma.user.create({
    data: { email, passwordHash, name },
  });

  return { success: true };
}