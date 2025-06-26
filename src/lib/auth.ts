import 'server-only';
import type { User } from '@/types';

// This is a mock authentication library.
// In a real application, you would use a library like next-auth or handle JWTs properly.

const mockUser: User = {
    id: '1',
    name: 'Alex Doe',
    email: 'alex.doe@example.com',
};

export async function getUser(): Promise<User> {
  // Since authentication is removed, we always return the mock user.
  return mockUser;
}
