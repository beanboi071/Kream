import Image from 'next/image'
import React from 'react'
import Right from '../icons/Right'

export default function Hero() {
  return (
    <section className='hero mt-4'>
        <div className='py-12'>
        <h1 className='text-4xl font-semibold'>Everything is better with bread</h1>
        <p className='my-4 text-gray-500'>Bread is good</p>
        <div className='flex gap-2'>
            <button className="bg-primary rounded-full px-4 uppercase text-white  py-2 flex gap-2">Order now <Right/></button>
            <p className="items-center flex gap-2 text-gray-600 font-semibold w-full">Learn more <Right/></p>
        </div>
        </div>
        <div className='relative'>
            <Image src={"/HomeBread.png"} layout={'fill'} objectFit={'contain'} alt={'pizza'}></Image>
        </div>
    </section>
  )
}
