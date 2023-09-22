import Image from "next/image";

export default function Main({children, heading,}) {
  return (
    <div className='w-full md:w-[calc(100vw-20rem)] flex-col h-[calc(100vh-11rem)] rounded-md absolute top-[8rem] md:ml-[20rem]  shadow-gray-400 p-2'>
        <h1 className='text-2xl'>{heading}</h1>
       
        {children}</div>
  )
}
