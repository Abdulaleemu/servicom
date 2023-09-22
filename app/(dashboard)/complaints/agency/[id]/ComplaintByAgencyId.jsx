"use client";
import React, { useState, useEffect } from "react";
import axios from "axios";
import Link from "next/link";
import Main from '../../../Main'
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
    Select,
    Option,
  } from "@material-tailwind/react";
import jwtDecode from "jwt-decode";
import { useParams, useRouter } from "next/navigation";
import { MagnifyingGlassIcon } from "@heroicons/react/24/solid";
import Loading from "../../../../../components/Loading";

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
  const token = localStorage.getItem("token");
  const decodedToken = jwtDecode(token);
  const role = decodedToken.role;
  const router = useRouter();
  const params = useParams();
  const id = params.id;
  const [agencies, setAgencies] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
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

  
  const fetchAgenciesByAgencies = async (page) => {
    try {
      setIsLoading(true);
      const { status, agencyName, name, id } = filters;
      const response = await axios.get(`${process.env.NEXT_BASEURL}Complaint/paged?AgencyId=${decodedToken.AgencyID}`, {
        params: {
          PageNumber: page,
          PageSize: 10,
          status,
          name,
          agencyName,
        },
      });
      setAgencies(response.data.data);
      setTotalPages(response.data.data.totalPages);
      setIsLoading(false);
    } catch (error) {
      console.error("Failed to fetch agencies:", error.message);
      setIsLoading(false);
    }
  };

  

  useEffect(() => {
   
    fetchAgencies(currentPage);
    console.log(decodedToken)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentPage, filters]);


  

  const handleFilterChange = (event, filterKey) => {
    setFilters((prevFilters) => ({
      ...prevFilters,
      [filterKey]: event.target.value,
    }));
  };

  if(!agencies){
    return <Loading/>
  }

  return (
    <Main heading='Complaints'>
   
   <Card className="h-full w-full">
      <CardHeader floated={false} shadow={false} className="rounded-none">
        <div className="flex flex-col items-center justify-between gap-4 md:flex-row md:gap-0">
          <Tabs value="all" className="w-full md:w-max flex items-center mb-4">
            <TabsHeader>
              {TABS?.map(({ label, value }) => (
                <Tab key={value} value={value}>
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
                    Complainer
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
                    Complain
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
  );
};

export default Complaints;
