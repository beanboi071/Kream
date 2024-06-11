'use client';
import Image from 'next/image'
import React, { useEffect, useState } from 'react'
import MenuItem from '../menu/MenuItem'
import SectionHeader from './SectionHeader'

export default function HomeMenu() {
  const [bestSellers, setBestSellers] = useState([]);
  useEffect(() => {
    fetch('/api/menu-items').then(res => {
      res.json().then(menuItems => {
        setBestSellers(menuItems.slice(-3));
      });
    });
  }, []);
  return (
    <section className='relative  flex flex-col items-center justify-center'>
      <div className='h-64 w-64 absolute right-0 -top-16'>
        <Image src={'/cuaso.png'} layout={'fill'} objectFit={'contain'} alt={'cuaso'}></Image>
      </div>
      <div className='h-64 w-64 absolute left-0 -top-24 -z-10'>
        <Image src={'/donot.png'} layout={'fill'} objectFit={'contain'} alt={'donot'}></Image>
      </div>
      <div className="text-center mb-4 mt-24">
        <SectionHeader
          subHeader={'check out'}
          mainHeader={'Our Best Sellers'} />
      </div>
      <div className="grid sm:grid-cols-3 gap-4">
        {bestSellers?.length > 0 && bestSellers.map(item => (
          <MenuItem key={item._id} {...item} />
        ))}
      </div>
    </section>
  )
}
