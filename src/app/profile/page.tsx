'use client'
import { useSession } from 'next-auth/react'
import Image from 'next/image';
import { redirect } from 'next/navigation';
import React, { useState } from 'react'

export default function ProfilePage() {
    const session = useSession();

    const [userName, setUserName] = useState<string>(session.data ? session.data.user.name : '');
    console.log(userName);
    if (session.status === "unauthenticated") {
        return redirect('/login');
    }
    const userImage = session.data?.user?.image ?? '';
    const userEmail = session.data?.user?.email ?? '';
    const handleProfileInfoUpdate = async (ev: any) => {
        ev.preventDefault();
        console.log('called')
        const response = await fetch('/api/profile', {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ name: userName })
        })
    }
    return (
        <section>
            <h1 className='text-center text-primary text-4xl'>Profile</h1>
            <div className='w-96 mx-auto flex flex-col items-center '>
                <div className='w-full flex gap-2 justify-between items-center'>

                    <div className=' rounded-lg  flex flex-col gap-2 items-center p-2'>
                        <Image className='rounded-full' src={userImage} alt='User Image' width={80} height={80}></Image>
                        <button type='button' className='m-0 p-2 border-solid border-slate-400 border-2 rounded-lg'>Edit</button>
                    </div>


                    <form onSubmit={handleProfileInfoUpdate} className='grow'>
                        <input className='' onChange={(e) => setUserName(e.target.value)} value={userName} type='text' placeholder='Full Name'></input>
                        <input type='email' disabled={true} value={userEmail}></input>
                        <button className='' type='submit'>Save</button>

                    </form>
                </div>
            </div>
        </section>
    )
}
