'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { signup } from '@/actions/auth.actions';
import { signIn } from 'next-auth/react';

export default function SignupPage() {
  const router = useRouter();
  const [error, setError] = useState('');

  async function handleSubmit(formData: FormData) {
    const email = formData.get('email') as string;
    const password = formData.get('password') as string;
    const name = formData.get('name') as string;

    const result = await signup(email, password, name);

    if (result.error) {
      setError(result.error);
      return;
    }

    // Signup ke baad automatically login kar do
    await signIn('credentials', { email, password, redirect: false });
    router.push('/dashboard');
  }

  return (
    <form action={handleSubmit} className="max-w-sm mx-auto mt-20 space-y-4">
      <h1 className="text-2xl font-bold">Sign Up</h1>
      {error && <p className="text-red-500">{error}</p>}
      <input name="name" placeholder="Name" className="border p-2 w-full" />
      <input name="email" type="email" placeholder="Email" required className="border p-2 w-full" />
      <input name="password" type="password" placeholder="Password" required className="border p-2 w-full" />
      <button type="submit" className="bg-blue-600 text-white p-2 w-full rounded">
        Sign Up
      </button>
    </form>
  );
}