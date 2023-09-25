"use client";
import React, { useState, useEffect } from "react";
import axios from "axios";
import Link from "next/link";
import Loading from '../../../components/Loading'
import Main from '../Main'

import { ArrowRightIcon, ArrowLeftIcon } from "@heroicons/react/24/outline";
import {
    Card,
    CardHeader,
    IconButton, 
    Typography,
    Input,
    Button,
    CardBody,
    Chip,
    CardFooter,
    Tabs,
    TabsHeader,
    Tab,
    Avatar,
    Tooltip,
    Select,
    Option,
  } from "@material-tailwind/react";
import jwtDecode from "jwt-decode";
import { useParams, useRouter } from "next/navigation";
import { MagnifyingGlassIcon } from "@heroicons/react/24/solid";
import Pagination from '../../../components/pagination'

const TABS = [

    {
      label: "All",
      value: "all",
    },
    {
        label: "Pending",
        value: "pending",
      },
    {
      label: "Resolved",
      value: "resolved",
    },
    {
      label: "Unresolved",
      value: "unresolved",
    },
 
  ];


const Complaints = () => {
 
  const router = useRouter();
  const params = useParams();
  const id = params.id;
  const [agencies, setAgencies] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(null);
  const [status, setStatus] = useState('')
  const [role, setRole] = useState('')
  const [filters, setFilters] = useState({
    id: "",
    status: "",
    agencyName: "",
    name: "",
  });
  const [isLoading, setIsLoading] = useState(false);

  const handleLink = (id)=>{
    router.push(`/complaints/${id}`)
  }
 
  const next = () => {
    if (currentPage === totalPages) return;
 
    setCurrentPage(currentPage + 1);
  };
 
  const prev = () => {
    if (currentPage === 1) return;
 
    setCurrentPage(currentPage - 1);
  };

  
  const fetchAgencies = async (page) => {
    try {
      setIsLoading(true);
      const { status, agencyName, name, id } = filters;
      const response = await axios.get(`${process.env.NEXT_BASEURL}Complaint/paged`, {
        params: {
          PageNumber: page,
          PageSize: 10,
          status,
          name,
          agencyName,
        },
      });
      setAgencies(response.data.data);
      console.log('from complaints',response.data.data)
      setTotalPages(response.data.totalPages);
      setIsLoading(false);
    } catch (error) {
      console.error("Failed to fetch agencies:", error.message);
      setIsLoading(false);
    }
  };

  console.log('total pages',totalPages)

  const fetchAgenciesByAgencies = async (page,aId) => {
    try {
      setIsLoading(true);
      const { status, agencyName, name, id } = filters;
      const response = await axios.get(`${process.env.NEXT_BASEURL}Complaint/paged?AgencyId=${aId}`, {
        params: {
          PageNumber: page,
          PageSize: 10,
          status: status,
          name,
          agencyName,
        },
      });
      setAgencies(response.data.data);
      setTotalPages(response.data.totalPages);
      setIsLoading(false);
    } catch (error) {
      console.error("Failed to fetch agencies:", error.message);
      setIsLoading(false);
    }
  };

  const  handleTabClick = (tabValue) => {
    setStatus(tabValue)

    console.log('status',status)
     };


  useEffect(() => {
    let token = null;
    if (typeof localStorage !== 'undefined') {
    token = localStorage.getItem('token');
  }
    
    const decodedToken = jwtDecode(token);
    const role = decodedToken.role
    const id = decodedToken.AgencyID
  
    if (role == "Agency Admin") {
      console.log('role',role)
      fetchAgenciesByAgencies(currentPage, id)
    }else if(role == "Desk Officer"){
      console.log('role',role)
      fetchAgenciesByAgencies(currentPage, id)
    fetchAgencies(currentPage);
    }else if(role == "Administrator"){
      console.log('role',role)
    fetchAgencies(currentPage);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentPage, filters]);


  

  const handleFilterChange = (event, filterKey) => {
    setFilters((prevFilters) => ({
      ...prevFilters,
      [filterKey]: event.target.value,
    }));
  };



  if(agencies.length < 1){
    return <Loading/>
  }


  return (
    <Main heading='Feedbacks'>
   
   <Card className="h-full w-full ">
      <CardHeader floated={false} shadow={false} className="rounded-none">
        <div className="flex flex-col items-center justify-between gap-4 md:flex-row md:gap-0">
          <Tabs value="all" className="w-full md:w-max flex items-center mb-4">
            <TabsHeader>
              {TABS?.map(({ label, value }) => (
                <Tab key={value} value={value} onClick={()=> handleTabClick(value)}>
                  &nbsp;&nbsp;{label}&nbsp;&nbsp;
                </Tab>
              ))}
            </TabsHeader>
          </Tabs>
          <div className="w-full md:w-[40vw] mb-4 flex space-x-2">
            <Input
              label="Complainers Name"
              value={filters.name}
             onChange={(e) => handleFilterChange(e, "name")}
              icon={<MagnifyingGlassIcon className="h-5 w-5" />}
            />
              <Input
              label="Agency Name"
              onChange={(e) => handleFilterChange(e, "agencyName")}
              icon={<MagnifyingGlassIcon className="h-5 w-5" />}
            />
              <Input
              label="Status"
              onChange={(e) => handleFilterChange(e, "status")}
              icon={<MagnifyingGlassIcon className="h-5 w-5" />}
            />
          </div>
        </div>
      </CardHeader>
      <CardBody className="overflow-scroll  no-scrollbar px-0">
        <table className="mt-4 w-full min-w-max table-auto text-left">
          <thead>
            
            <tr>
              
                <th
                  className="border-y border-blue-gray-100 bg-blue-gray-50/50 p-4"
                >
                  <Typography
                    variant="h5"
                    color="blue-gray"
                    className="font-normal leading-none opacity-70"
                  >
                    Agency
                  </Typography>
                </th>
              
                <th
                  className="border-y border-blue-gray-100 bg-blue-gray-50/50 p-4"
                >
                  <Typography
                    variant="h5"
                    color="blue-gray"
                    className="font-normal leading-none opacity-70"
                  >
                    Name
                  </Typography>
                </th>
                <th
                  className="border-y border-blue-gray-100 bg-blue-gray-50/50 p-4"
                >
                  <Typography
                    variant="h5"
                    color="blue-gray"
                    className="font-normal leading-none opacity-70"
                  >
                    Feedback
                  </Typography>
                </th>
                <th
                  className="border-y border-blue-gray-100 bg-blue-gray-50/50 p-4"
                >
                  <Typography
                    variant="h5"
                    color="blue-gray"
                    className="font-normal leading-none opacity-70"
                  >
                    Status
                  </Typography>
                </th>
                <th
                  className="border-y border-blue-gray-100 bg-blue-gray-50/50 p-4"
                >
                  <Typography
                    variant="h5"
                    color="blue-gray"
                    className="font-normal leading-none opacity-70"
                  >
                    Rating
                  </Typography>
                </th>
            </tr>
        
          </thead>
          <tbody>
            {agencies && agencies.map(
              ({ id, name, agencyName, body, rating,status }, index) => {
                const isLast = index === agencies.length - 1;
                const classes = isLast
                  ? "p-4"
                  : "p-4 border-b border-blue-gray-50";
 
                return (
                    
                  <tr key={id} className='hover:bg-blue-gray-300 cursor-pointer'onClick={()=>handleLink(id)}>
<td className={classes}>
                      <Typography
                        variant="small"
                        color="blue-gray"
                        className="font-normal"
                      >
                        {agencyName}
                      </Typography>
                    </td><td className={classes}>
                      <Typography
                        variant="small"
                        color="blue-gray"
                        className="font-normal"
                      >
                        {name}
                      </Typography>
                    </td>
                    <td className={classes}>
                      <Typography
                        variant="small"
                        color="blue-gray"
                        className="font-normal"
                      >
                        {body.slice(0,40)}
                      </Typography>
                    </td>
                    <td className={classes}>
                      <Typography
                        variant="small"
                        color="blue-gray"
                        className="font-normal"
                      >
                        {status}
                      </Typography>
                    </td>
                
                    <td className={classes}>
                      <Typography
                        variant="small"
                        color="blue-gray"
                        className="font-normal"
                      >
                        {rating}
                      </Typography>
                    </td>
                   
                  </tr>
                 
                );
              },
            )}
          </tbody>
        </table>
      </CardBody>
      <CardFooter className="flex items-center justify-between border-t border-blue-gray-50 p-4 h-8">
       {/* pagination  */}
       <div className="flex items-center gap-8">
      <IconButton
        size="sm"
        variant="outlined"
        onClick={prev}
        disabled={currentPage === 1}
      >
        <ArrowLeftIcon strokeWidth={2} className="h-4 w-4" />
      </IconButton>
      <Typography color="gray" className="font-normal">
        Page <strong className="text-gray-900">{currentPage}</strong> of{" "}
        <strong className="text-gray-900">{totalPages}</strong>
      </Typography>
      <IconButton
        size="sm"
        variant="outlined"
        onClick={next}
        disabled={currentPage === totalPages}
      >
        <ArrowRightIcon strokeWidth={2} className="h-4 w-4" />
      </IconButton>
    </div>
      </CardFooter>
    </Card>
    </Main>
  );
};

export default Complaints;
