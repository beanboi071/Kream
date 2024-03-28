import React from 'react'

interface SectionHeaderProps {
    mainHeader: string;
    subHeader: string;
  }
export default function SectionHeader({mainHeader,subHeader}:SectionHeaderProps) {
  return (
    <div className='text-center'>
        <h3 className='uppercase text-gray-500'>{subHeader}</h3>
        <h3 className='text-primary text-4xl italic font-bold'>{mainHeader}</h3>

        </div>
  )
}
