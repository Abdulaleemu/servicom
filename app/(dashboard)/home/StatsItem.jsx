'use client'
import React from 'react'
import { FlagIcon } from '@heroicons/react/24/solid'

export default function StatsItem({title, main, details,reports}) {
  return (
    <div className='flex flex-col  items-center '>
       <div className='flex items-center gap-2'>
       <FlagIcon className='h-6 w-6 text-red-500 '/>
        <h1 className='text-xl font-semibold  '>{title}</h1>
       </div>
       <h1 className='text-sm '>{main}</h1>
        <h1 className='text-2xl font-bold ' >{details}</h1>
        <h1 className='text-2xl font-bold ' >{reports}</h1>
    </div>
  )
}
