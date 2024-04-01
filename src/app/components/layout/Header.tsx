'use client';
import { signOut, useSession } from 'next-auth/react';
import Link from 'next/link'
import React, { useState } from 'react'

export default function Header() {
  const session = useSession();
  const userData = session?.data?.user;
  console.log(session);
  const [userName, setUserName] = useState<string>()
  return (
    <>
      <header className="flex items-center justify-between">
        <nav className="flex gap-8 items-center text-gray-500 font-semibold">
          <Link className="text-primary font-extrabold" href={'/'}>KREAM</Link>

          <Link href={'/'}>Home</Link>
          <Link href={''}>Menu</Link>
          <Link href={''}>Abount</Link>
          <Link href={''}>About</Link>

        </nav>
        <nav className='flex gap-4 items-center  text-gray-500 font-semibold'>
          {session.status === "authenticated" ?
            <><Link className='' href={'/profile'}>Hello, {userData?.name ? (userData.name.includes(' ') ? userData.name.split(' ')[0] : userData.name) : ''}</Link>
              <button className="bg-primary border-0 rounded-full  text-white px-8 py-2 w-36" onClick={() => signOut()} >Log Out</button>
            </> :
            <><Link href={'/login'}>Login</Link>
              <Link href={'/register'} className="bg-primary rounded-full w-36  text-white px-8 py-2">Register</Link>
            </>
          }



        </nav>
      </header>
    </>
  )
}
