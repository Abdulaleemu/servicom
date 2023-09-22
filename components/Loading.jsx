import React from 'react'
import {  SyncLoader } from 'react-spinners'
import Main from '../app/(dashboard)/Main'

export default function Loading() {
  return (
<Main>
<div className='flex items-center justify-center h-full w-full'>
      <SyncLoader color="#1d71be" />
  </div>
</Main>
  )
}
