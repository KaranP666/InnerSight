// src/lib/auth.actions.ts
'use server';

import { prisma } from './prisma';
import bcrypt from 'bcrypt';
import { getServerSession } from 'next-auth';
import { authConfig } from './auth.config';

export async function getCurrentUser() {
  const session = await getServerSession(authConfig);

  if (!session?.user) return null;

  return {
    id: session.user.id,
    name: session.user.name,
    email: session.user.email,
  };
}


export async function registerUser(name: string, email: string, password: string) {
  const existingUser = await prisma.user.findUnique({ where: { email } });
  if (existingUser) {
    return { error: 'User already exists.' };
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  const user = await prisma.user.create({
    data: {
      name,
      email,
      password: hashedPassword
    }
  });

  return { success: true, user };
}
