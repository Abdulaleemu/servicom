'use client'
import React, { useEffect, useState } from 'react'
import Stats from './Stats'
import StatsItem from './StatsItem';
import ChartAndMore from './ChartAndMore'
import Loading from '../../../components/Loading';
import Main from '../Main'
import { FlagIcon } from '@heroicons/react/24/solid';



async function fetchDataWithToken(token) {
  // URL of the API endpoint
  const apiUrl = `${process.env.NEXT_BASEURL}Dashboard`;

  // Headers object with Authorization header
  const headers = {
    Authorization: `Bearer ${token}`,
    // You can add other headers as needed
  };

  // Fetch request
  try {
    const response = await fetch(apiUrl, {
      method: "GET",
      headers: headers,
    });
    // Check for success (status code in the range 200-299)
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    return await response.json();

  } catch (error) {
    console.error("There was a problem with the fetch operation:", error);
    throw error;
  }
}

export default function Dashboard() {

  const [data, setData] = useState('');
  // const token = localStorage.getItem("token");
  
  useEffect(() => {
    let token = null;
    if (typeof localStorage !== 'undefined') {
    token = localStorage.getItem('token');
  }
    
    fetchDataWithToken(token)
      .then((data) => {
        console.log("Data:", data.data);
        setData(data.data);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  }, []);
console.log('from data', data)

  if(!data){
    return <Loading/>
  }
  return (<div className='w-full md:w-[calc(100vw-20rem)] flex-col h-[calc(100vh-10rem)] rounded-md absolute top-[9rem] md:ml-[20rem] overflow-y-auto  no-scrollbar '>
    <div className='w-full md:w-[calc(100vw-20rem)] flex  h-[10rem] rounded-md relative bg-white'>
     <div className='mr-auto ml-auto mt-auto mb-auto flex flex-row space-x-2 items-start justify-around w-2/3 '>
        <StatsItem title='Total Reports' reports={data?.totalReports}/>
        <StatsItem title='Resolved Reports' main={data?.resolvedAsString} details={data?.resolvedPercentage}  />
        <StatsItem title='Unresolved Reports' main={data?.unResolvedAsString} details={data?.unResolvedPercentage}/>
    </div>
    </div>
    {/* chart and toprated */}
    <div className='bg-white mt-4 h-full'>
  
   
   <ChartAndMore topRated={data?.topRatedAgencies} bottomRated={data?.bottomRatedAgencies} reports={data?.totalReports} resolved={data?.resolvedReports} unresolved={data?.unResolvedReports} reportTagData={data?.reportTagData}/> 
  
     
    </div>
    </div>
  )
}
