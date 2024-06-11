import { useSession } from 'next-auth/react';
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import React, { useEffect, useState } from 'react'

export default function UserTabs() {
    const path = usePathname();
    const session = useSession();
    const [isAdmin, setIsAdmin] = useState<boolean>(false);

    useEffect(() => {

        if (session.status === "authenticated") {

            fetch('/api/profile').then(response => {
                response.json().then(data => {

                    setIsAdmin(data.admin);


                })
            });

        }
    }, [session])

    return (
        <div className='flex items-center justify-center gap-2 tabs'>
            <Link className={`profileNav  ${path === '/profile' && 'active'}`} href={'/profile'}>Profile</Link>
            {isAdmin &&
                <>
                    <Link className={`profileNav  ${path === '/categories' && 'active'}`} href={'/categories'}>Categories</Link>
                    <Link className={`profileNav  ${path === '/menu-items' && 'active'}`} href={'/menu-items'}>Menu Items</Link>

                </>


            }
        </div>
    )
}
