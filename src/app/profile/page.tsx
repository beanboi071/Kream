'use client'
import { useSession } from 'next-auth/react'
import Image from 'next/image';
import Link from 'next/link';
import { redirect } from 'next/navigation';
import React, { useEffect, useState } from 'react'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import UserTabs from '../components/layout/UserTabs';

export default function ProfilePage() {
    const session = useSession();

    const [userName, setUserName] = useState<string>('');
    const [phoneNo, setphoneNo] = useState<string>('');
    const [country, setCountry] = useState<string>('');
    const [city, setCity] = useState<string>('');

    console.log(session.data?.user?.name)
    const userImage = session.data?.user?.image ?? '';
    const userEmail = session.data?.user?.email ?? '';


    const handleImageUpdate = async (ev: any) => {
  
        const files = ev.target.files;
        if (files?.length > 0) {
            const data = new FormData;
            data.set('files', files[0]);
            await fetch('/api/profileimage', {
                method: 'POST',
                body: data
            })
        }
    }
    const handleProfileInfoUpdate = async (ev: any) => {

        ev.preventDefault();
        const response = await fetch('/api/profile', {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ name: userName, phoneNo: phoneNo, country: country, city: city })
        });

        if (response.ok) {
            session.update({ name: userName, city: city, country: country, phoneNo: phoneNo })
            console.log("Profile saved!");
            toast.success("Profile sadfsdafsafsaved!");
        }
    }

    useEffect(() => {

        if (session.status === "authenticated") {

            fetch('/api/profile').then(response => {
                response.json().then(data => {
                    setUserName(data.name ?? '');
                    setphoneNo(data.phoneNo ?? '');
                    setCity(data.city ?? '');
                    setCountry(data.country ?? '');


                })
            });

        }
    }, [session])

    if (session.status === "unauthenticated") {
        return redirect('/login');
    }
    return (
        <section>

            <div className=' mx-auto flex flex-col items-center w-3/5'>


                <UserTabs/>

                <form onSubmit={handleProfileInfoUpdate} className='w-full'>
                    <div className='flex justify-between items-center'>
                        <div className=' rounded-lg  flex flex-col gap-2 items-center p-2'>
                            <Image className='rounded-full' src={userImage} alt='User Image' width={80} height={80}></Image>
                            {//<label className='border-solid border-slate-500 border-2 rounded-lg px-4 '><input onChange={handleImageUpdate} type='file' hidden></input><span >Edit</span></label>
                            }

                        </div>
                        <div className='grow'>
                            <div>
                                <label>Full Name</label>
                                <input className='' onChange={(e) => setUserName(e.target.value)} value={userName} type='text' placeholder='Full Name'></input>

                            </div>
                            <div>
                                <label>Email</label>
                                <input type='email' disabled={true} value={userEmail}></input>

                            </div>

                        </div>
                    </div>
                    <div>
                        <label>Phone No.</label>
                        <input type='tel' onChange={(e) => setphoneNo(e.target.value)} value={phoneNo} placeholder='Phone No.'></input>

                    </div>
                    <div className='flex   gap-2'>
                        <div className='grow'>
                            <label>Country</label>
                            <input type='text' onChange={(e) => setCountry(e.target.value)} value={country} placeholder='Country'></input>

                        </div>
                        <div className='grow'>
                            <label>City</label>
                            <input type='text' onChange={(e) => setCity(e.target.value)} value={city} placeholder='City'></input>

                        </div>

                    </div>

                    <button className='' type='submit'>Save</button>

                </form>

            </div>
        </section>
    )
}
