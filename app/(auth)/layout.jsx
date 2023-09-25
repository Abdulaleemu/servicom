import Image from "next/image";

export default function Layout({ children }) {
  return (
    
      < >
       <div className="h-screen w-screen flex flex-cols md:flex-row no-scrollbar ">
       <div className="hidden lg:block md:h-screen  md:w-[50vw] relative ">
        <Image src="/img/left.png" fill={true} objectFit="cover" alt="Logo" />
      </div>
      <div className="h-full w-full md:w-1/2 flex justify-center items-center">
     {children}
     </div>
     </div>
      </>
    
  )
}
