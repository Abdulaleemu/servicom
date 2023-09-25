'use client'
import React, { useState, useEffect } from 'react'
import jwtDecode from 'jwt-decode';
import { Avatar,Badge } from "@material-tailwind/react";
import { BellIcon } from '@heroicons/react/24/solid';


export default function Header() {
const [user, setUser]=useState();

 
 useEffect(() => {
 const token =  localStorage.getItem('token')
 const decoded = jwtDecode(token)
    if (decoded){
        setUser(decoded)
     }
  },[]);
  
  
  return (
    <div className=' w-full md:w-[calc(100vw-20rem)] h-[7rem]  absolute top-0 right-0 p-4 shadow-sm bg-white'>
        <div className='w-full flex items-center justify-between p-2'>
            <h1 className='flex-1 text-2xl p-2 font-sans font-semibold text--800'>Welcome, {user?.FullName}</h1>
         <div className='flex items-center space-x-6'>
         <Badge content="5">
     <BellIcon className='h-8 w-8'/>
     </Badge>
     <Avatar src="/img/place.jpeg" alt="avatar" />;
         </div>
        </div>
     
    </div>
  )
}
