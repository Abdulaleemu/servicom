'use client'
import Link from "next/link";
import {
  Card,
  Typography,
  List,
  ListItem,
  ListItemPrefix,
  ListItemSuffix,
  BuildingOffice2,
  Chip,
  Accordion,
  AccordionHeader,
  AccordionBody,
  Button,
  
} from "@material-tailwind/react";
import {
  PresentationChartBarIcon,
  ShoppingBagIcon,
  UserCircleIcon,
  Cog6ToothIcon,
  InboxIcon,
  PowerIcon,
  BuildingOffice2Icon,
  FlagIcon,
} from "@heroicons/react/24/solid";
import { ChevronRightIcon, ChevronDownIcon } from "@heroicons/react/24/outline";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState } from "react";
 
export default function MultiLevelSidebar() {
  const [open, setOpen] = useState(0);
  const router = useRouter()
 
  const handleOpen = (value) => {
    setOpen(open === value ? 0 : value);
  };
 

  const handleLogout = ()=>{
  localStorage.removeItem('token')
   router.replace('/login')
    
  } 
  
  return (
    <Card className="h-[100vh] w-full max-w-[20rem] p-4 shadow-xl shadow-blue-gray-900/5 hidden md:flex ">
      <div className="mb-2 p-4">
        <Typography variant="h5" color="blue-gray">
          <Image src='/img/logo.png' height={150} width={150} alt="LOGO" className="p-2 mb-6"/>
          <hr className=""></hr>
        </Typography>
      </div>
      <List>
        <ListItem  >
        <ListItemPrefix>
            <PresentationChartBarIcon className="h-5 w-5" />
          </ListItemPrefix>
          <Link href='/home'>Dashboard</Link>
          <ListItemSuffix>
            {/* <Chip value="14" size="sm" variant="ghost" color="blue-gray" className="rounded-full" /> */}
          </ListItemSuffix>
        </ListItem>
        <ListItem onClick={()=>router.push(`/agencies`)}>
          <ListItemPrefix>
            <BuildingOffice2Icon className="h-5 w-5" />
          </ListItemPrefix>
         Agencies
        </ListItem>
        {/* <ListItem onClick={()=>router.push(`/outlets`)}>
          <ListItemPrefix>
            <BuildingOffice2Icon className="h-5 w-5" />
          </ListItemPrefix>
         Outlets
        </ListItem> */}
        <ListItem onClick={()=>router.push(`/complaints`)}>
          <ListItemPrefix>
            <FlagIcon className="h-5 w-5" />
          </ListItemPrefix>
          Feedbacks
        </ListItem>
   
      </List>
  <Button className="fle items-center mt-auto" onClick={handleLogout}>
  Logout
  </Button>
            
      
    </Card>
  );
}