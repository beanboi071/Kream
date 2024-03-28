import Image from 'next/image'
import React from 'react'

export default function MenuItem() {
  return (
    <div className='bg-gray-200 p-4 rounded-lg text-center hover:bg-gray-100 hover:shadow-2xl hover:shadow-black/30 transition-all'>
    <div className='w-100 relative h-36'>
    <Image src={'/HomeBread.png'} layout='fill' objectFit={'contain'} alt={'bread'}></Image>

    </div>
<h4 className='font-bold text-xl'>Bread</h4>
<p className='my-2 text-sm'>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Nesciunt incidunt officia ab, tempora odio quam dolores autem aliquid sed aliquam.</p>
<button className='bg-primary text-white py-2 rounded-full px-8 my-2'>Add to cart Rs. 50</button>
</div>
  )
}
