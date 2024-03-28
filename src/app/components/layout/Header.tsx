import Link from 'next/link'
import React from 'react'

export default function Header() {
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
          <Link href={'/login'}>Login</Link>

          <Link href={'/register'} className="bg-primary rounded-full  text-white px-8 py-2">Register</Link>

        </nav>
      </header>
    </>
  )
}
