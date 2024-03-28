import Image from 'next/image'
import React from 'react'
import MenuItem from '../menu/MenuItem'
import SectionHeader from './SectionHeader'

export default function HomeMenu() {
  return (
    <section className='relative  flex flex-col items-center justify-center'>
        <div className='h-64 w-64 absolute right-0 -top-16'>
        <Image src={'/cuaso.png'} layout={'fill'} objectFit={'contain'} alt={'cuaso'}></Image>
        </div>
        <div className='h-64 w-64 absolute left-0 -top-24 -z-10'>
            <Image src={'/donot.png'} layout={'fill'} objectFit={'contain'} alt={'donot'}></Image>
        </div>
        <SectionHeader mainHeader="Menu" subHeader="Check Out"/>
        <div className='grid grid-cols-3 gap-4 mt-24'>
<MenuItem/>
<MenuItem/>
<MenuItem/>
<MenuItem/>
<MenuItem/>
<MenuItem/>
<MenuItem/>
        </div>
    </section>
  )
}
