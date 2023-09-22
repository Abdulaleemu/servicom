'use client'
import MultiLevelSidebar from './Sidebar'
import Header from './Header'
import { useRouter } from 'next/navigation';
import {useEffect,useState} from 'react'
import jwtDecode from 'jwt-decode';





export default function Layout({ children }) {
    const router = useRouter()
    const [storedToken, setStoredToken] = useState(null)

    

    useEffect(() => {
     const storedToken = localStorage.getItem("token");
      if (!storedToken){
        router.replace("/login");
      }
      }, [])
  


   
        return (
        < >
        <MultiLevelSidebar/>
        <Header />
        {children}
        </>
      
    )

  }
  