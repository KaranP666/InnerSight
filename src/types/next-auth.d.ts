// src/types/next-auth.d.ts
import NextAuth from 'next-auth';
import { NextRequest } from 'next/server';

declare module 'next/server' {
  interface NextRequest {
    nextauth?: {
      token?: any;
    };
  }
}
declare module 'next-auth' {
  interface Session {
    user: {
      id: string;
      name?: string | null;
      email?: string | null;
    };
  }
}
