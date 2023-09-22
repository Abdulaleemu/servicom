'use client'
import Main from '../Main'
import Loading from '../../../components/Loading'
import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import {
  Card,
  CardHeader,
  Input,
  Typography,
  Button,
  CardBody,
  Chip,
  CardFooter,
  Tabs,
  TabsHeader,
  Tab,
  Avatar,
  IconButton,
  Tooltip,
  Rating, 
} from "@material-tailwind/react";
import React, { useState, useEffect } from "react";
import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/navigation";
import jwtDecode from "jwt-decode";
 
const TABS = [
  {
    label: "All",
    value: "all",
  },
  {
    label: "Headquaters",
    value: "headquaters",
  },
  {
    label: "Branches",
    value: "Branches",
  },
];
 

export default function Agencies() {

    const [isLoading, setIsLoading] = useState(false);
 
  const [agencies, setAgencies] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const router = useRouter();

  const [filters, setFilters] = useState({
    state: "",
    name: "",
    complaintId: "",
    agencyId: "",
  });


  const fetchAgencies = async (page) => {
    try {
      setIsLoading(true);
      const { state, name, complaintId, agencyId } = filters;
      const response = await axios.get(`${process.env.NEXT_BASEURL}Agency/paged`, {
        params: {
          PageNumber: page,
          PageSize: 10,
          state,
          name,
          complaintId,
          agencyId : 0,
        },
      });
      setAgencies(response.data.data);
      setTotalPages(response.data.totalPages);
      setIsLoading(false);
      console.log("from response", response.data.data);
    } catch (error) {
      console.error("Failed to fetch agencies:", error.message);
      setIsLoading(true);
    }
  };
  const handleFilterChange = (event, filterKey) => {
    setFilters((prevFilters) => ({
      ...prevFilters,
      [filterKey]: event.target.value,
    }));
  };
  
  useEffect(() => {
    let token
    token = localStorage.getItem('token')
    const decodedToken = jwtDecode(token);
    const role = decodedToken.role;


    if (role == "Agency Admin") {
      router.push(`/agencies/${decodedToken.AgencyID}`);
    }
    fetchAgencies(currentPage);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentPage, filters]);

  const handleLink = (id)=>{
    router.push(`/agencies/${id}`)
  }
 
  const handlePrevious = ()=>{
            if(currentPage == 1){
                return null
            }else if(currentPage > 1){
                setCurrentPage(currentPage - 1)
            }
         
  }

  const handleNext = ()=>{
    if(currentPage == totalPages){
        return null
    }else if(currentPage < totalPages){
        setCurrentPage(currentPage + 1)
    }
 
}

if(!agencies){
  return <Loading/>
}
  return (
    <Main heading='Agencies'>
        <Card className="h-full w-full">
      <CardHeader floated={false} shadow={false} className="rounded-none">
        <div className="flex flex-col items-center justify-between gap-4 md:flex-row md:gap-0">
          {/* <Tabs value="all" className="w-full md:w-max flex items-center mb-4">
            <TabsHeader>
              {TABS.map(({ label, value }) => (
                <Tab key={value} value={value}>
                  &nbsp;&nbsp;{label}&nbsp;&nbsp;
                </Tab>
              ))}
            </TabsHeader>
          </Tabs> */}
          <div className="w-full md:w-[40vw] mb-4 flex space-x-2">
            <Input
              label="Agency Name"
              value={filters.name}
             onChange={(e) => handleFilterChange(e, "name")}
              icon={<MagnifyingGlassIcon className="h-5 w-5" />}
            />
              <Input
              label="Search"
              icon={<MagnifyingGlassIcon className="h-5 w-5" />}
            />
              <Input
              label="Search"
              icon={<MagnifyingGlassIcon className="h-5 w-5" />}
            />
          </div>
        </div>
      </CardHeader>
      <CardBody className="overflow-scroll px-0">
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
                    Agency Name
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
                    Address
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
                    Phone Number
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
                    Website
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
            {agencies && agencies?.map(
              ({ id,abbreviation, logoUrl, name, phoneNumber, websiteUrl, rating,address }, index) => {
                const isLast = index === agencies.length - 1;
                const classes = isLast
                  ? "p-4"
                  : "p-4 border-b border-blue-gray-50";
 
                return (
                    
                  <tr key={id} className='hover:bg-blue-gray-300 cursor-pointer'onClick={()=>handleLink(id)}>
                    <td className={classes}>
                    <div className="flex items-center gap-3">
                        <Avatar src={logoUrl} alt={abbreviation} size="sm" />
                        <div className="flex flex-col">
                          <Typography
                            variant="small"
                            color="blue-gray"
                            className="font-normal"
                          >
                            {abbreviation}
                          </Typography>
                          <Typography
                            variant="small"
                            color="blue-gray"
                            className="font-normal opacity-70"
                          >
                            {name}
                          </Typography>
                        </div>
                      </div>
                    </td>
                    <td className={classes}>
                      <Typography
                        variant="small"
                        color="blue-gray"
                        className="font-normal"
                      >
                        {address.slice(0,40)}
                      </Typography>
                    </td>
                    <td className={classes}>
                      <Typography
                        variant="small"
                        color="blue-gray"
                        className="font-normal"
                      >
                        {phoneNumber}
                      </Typography>
                    </td>
                    <td className={classes}>
                      <Typography
                        variant="small"
                        color="blue-gray"
                        className="font-normal"
                      >
                        {websiteUrl}
                      </Typography>
                    </td>
                    <td className={classes}>
                      {/* <Typography
                        variant="small"
                        color="blue-gray"
                        className="font-normal"
                      >
                        {rating}
                      </Typography> */}
                      <Rating value={parseInt(rating)} />
                    </td>
                   
                  </tr>
                 
                );
              },
            )}
          </tbody>
        </table>
      </CardBody>
      <CardFooter className="flex items-center justify-between border-t border-blue-gray-50 p-4 h-8">
        <Typography variant="small" color="blue-gray" className="font-normal">
          Page {currentPage >= 1 && currentPage} of {totalPages >= 1 && totalPages}
        </Typography>
        <div className="flex gap-2">
          <Button variant="outlined" size="sm" onClick={()=>handlePrevious}>
            Previous
          </Button>
          <Button variant="outlined" size="sm" onClick={()=>handleNext}>
            Next
          </Button>
        </div>
      </CardFooter>
    </Card>
    </Main>
  )
}
