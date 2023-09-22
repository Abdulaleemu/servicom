'use client'
import MultiLevelSidebar from './Sidebar'
import Header from './Header'
import { useRouter } from 'next/navigation';
import {useEffect} from 'react'
import jwtDecode from 'jwt-decode';





export default function Layout({ children }) {
    const router = useRouter()
    let storedToken =''

    useEffect(() => {
     storedToken = localStorage.getItem("token");
      
      }, [])
  


    if (storedToken != null ) {
        return (
        < >
        <MultiLevelSidebar/>
        <Header />
        {children}
        </>
      
    )
} else {
    router.replace("/login");
  }
  }
  