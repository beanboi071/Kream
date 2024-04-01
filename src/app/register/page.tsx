"use client";
import { signIn } from 'next-auth/react';
import Image from 'next/image'
import Link from 'next/link';
import React, { useState } from 'react'

export default function RegisterPage() {
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [creatingUser, setCreatingUser] = useState<boolean>(false);
  const [userCreated, setUserCreated] = useState<boolean>(false);
  async function handleSubmit(ev: any) {
    ev.preventDefault();
    setCreatingUser(true);
    await fetch('/api/register', {
      method: 'POST',
      body: JSON.stringify({ email, password }),
      headers: { 'Content-Type': 'application/json' }
    }).then(res => {
      if (res.status == 200) {
        setUserCreated(true);

      } else {
        setUserCreated(false);
      }
    })
    setCreatingUser(false);
  }
  return (
    <section>
      <h1 className='text-primary my-12  text-center text-2xl'>Register</h1>
      {userCreated && <h1 className='text-center'>User Created. You can now proceed to <Link className='underline' href={'/login'}>login &raquo;</Link></h1>}
      <form className="max-w-xl mx-auto" onSubmit={handleSubmit}>
        <input type='email' disabled={creatingUser} placeholder='Email' value={email} onChange={env => { setEmail(env.target.value) }}></input>
        <input type='password' disabled={creatingUser} placeholder='Password' value={password} onChange={env => { setPassword(env.target.value) }}></input>
        <button type='submit' disabled={creatingUser}>Register</button>
        <div className='text-center text-gray-700'>or login with provider</div>
        <button onClick={() => signIn('google', { redirect: true, callbackUrl: '/' })} className='flex items-center justify-center gap-4'>
          <Image src={"/google.png"} alt={""} width={32} height={32}></Image>
          Login with google</button>
        <h1 className='text-center'>Already have an account? <Link className='underline' href={'/login'}>Login in &raquo;</Link></h1>
      </form>
    </section>
  )
}
