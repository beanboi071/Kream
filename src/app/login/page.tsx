"use client";
import { signIn } from 'next-auth/react';
import { redirect } from 'next/dist/server/api-utils';
import Image from 'next/image';
import Link from 'next/link';
import React, { useState } from 'react'

export default function LoginPage() {
    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [loginProgress, setLoginProgress] = useState<boolean>(false);
    const [userCreated, setUserCreated] = useState<boolean>(false);
    async function handleSubmit(ev: any) {
        ev.preventDefault();
        setLoginProgress(true);
        await signIn('credentials', { email, password, redirect: true, callbackUrl: '/' });
        setLoginProgress(false);
    }
    return (
        <section>
            <h1 className='text-primary my-12  text-center text-2xl'>Login</h1>
            <form className="max-w-xl mx-auto" onSubmit={handleSubmit}>
                <input type='email' placeholder='Email' value={email} onChange={env => { setEmail(env.target.value) }}></input>
                <input type='password' placeholder='Password' value={password} onChange={env => { setPassword(env.target.value) }}></input>
                <button type='submit' >Login</button>
                <div className='text-center text-gray-700'>or login with provider</div>
                <button type='button' onClick={() => signIn('google', { redirect: true, callbackUrl: '/' })} className='flex items-center justify-center gap-4'>
                    <Image src={"/google.png"} alt={""} width={32} height={32}></Image>
                    Login with google</button>
                <h1 className='text-center'>Dont have an account? <Link className='underline' href={'/register'}>Register now &raquo;</Link></h1>
            </form>
        </section>
    )
}
