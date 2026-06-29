'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { signIn } from 'next-auth/react';

export default function LoginPage() {
  const router = useRouter();
  const [error, setError] = useState('');

  async function handleSubmit(formData: FormData) {
    const email = formData.get('email') as string;
    const password = formData.get('password') as string;

    const result = await signIn('credentials', {
      email,
      password,
      redirect: false,
    });

    if (result?.error) {
      setError('Invalid email or password');
      return;
    }

    router.push('/dashboard');
  }

  return (
    <form action={handleSubmit} className="max-w-sm mx-auto mt-20 space-y-4">
      <h1 className="text-2xl font-bold">Login</h1>
      {error && <p className="text-red-500">{error}</p>}
      <input name="email" type="email" placeholder="Email" required className="border p-2 w-full" />
      <input name="password" type="password" placeholder="Password" required className="border p-2 w-full" />
      <button type="submit" className="bg-blue-600 text-white p-2 w-full rounded">
        Login
      </button>
    </form>
  );
}