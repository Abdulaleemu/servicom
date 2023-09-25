'use client'
import Main from '../Main'
// import CreateOutlet from './createoutlet'
import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import {
  Card,
  CardHeader,
  Input,
  Typography,
  Dialog,
  DialogHeader,
  DialogBody,
  DialogFooter,
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
  Option
} from "@material-tailwind/react";
import React, { useState, useEffect } from "react";
import axios from "axios";
import Link from "next/link";
import { useRouter,useSearchParams } from "next/navigation";
import jwtDecode from "jwt-decode";
import Loading from '../../../components/Loading';
import { toast } from 'react-toastify';
 
 

export default function Outlets() {
  const [open, setOpen] = useState(false);
 const params = useSearchParams()
  const handleOpen = () => setOpen(!open);

    const [isLoading, setIsLoading] = useState(false);
    const token = localStorage.getItem("token");
  const decodedToken = jwtDecode(token);
  const role = decodedToken.role;
  const [agencies, setAgencies] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const router = useRouter();
  const agencyId = params.get('id')
  const [filters, setFilters] = useState({
    state: "",
    name: "",
    complaintId: "",
    agencyId: 0,
  });

  const [formData, setFormData] = useState({
    agencyId: agencyId, // Manually assigned
    address: '',
    phoneNumber: '',
    stateId: '',
  });

  const [states, setStates] = useState([]);


console.log(decodedToken)
const createOutlet = ()=>{
   // Define the request options
 const requestOptions = {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
  },
  body: JSON.stringify(createData),
};




// Send the POST request to the API
fetch(`${process.env.NEXT_BASEURL}Outlet`, requestOptions)
  .then((response) => {
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    return response.json();
  })
  .then((responseData) => {
    console.log('API response:', responseData);
   
  })
  .catch((error) => {
    console.error('Error:', error);
    // Handle errors here
  });

 
}


  ////create outlet end
  useEffect(() => {
    // Fetch the states from the API endpoint when the component mounts
    fetch(`${process.env.NEXT_BASEURL}State`) // Replace with your API endpoint URL
      .then((response) => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then((data) => {
        setStates(data.data);
      })
      .catch((error) => {
        console.error('Error:', error);
      });
  }, []); // The empty dependency array ensures this runs only once when the component mounts

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };
  const handleSubmit = (event) => {
    event.preventDefault();

    const apiUrl = `${process.env.NEXT_BASEURL}Outlet`; // Replace with your API endpoint URL

    const requestOptions = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData),
    };

    fetch(apiUrl, requestOptions)
      .then((response) => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
          toast.error("try again ", {
            position: "top-center",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
          });

        
        }
        return response.json();
      })
      .then((responseData) => {
        console.log('API response:', responseData);
        toast.success("Outlet Added Sucessfully ", {
          position: "top-center",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
        });
        setOpen(!open)
        router.refresh()
      })
     
      .catch((error) => {
        console.error('Error:', error);
        // Handle errors here
      });
  };

  //create outlet


  const fetchAgencies = async (page) => {
    try {
      setIsLoading(true);
      const { state, name, complaintId, agencyId } = filters;
      const response = await axios.get(`${process.env.NEXT_BASEURL}Outlet/paged?AgencyID=${params.get('id')}`, {
        params: {
          PageNumber: page,
          PageSize: 10,
          state,
          name,
          complaintId,
          agencyId,
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

  const fetchAgenciesById = async (page) => {
    try {
      setIsLoading(true);
      const { state, name, complaintId, agencyId } = filters;
      const response = await axios.get(`${process.env.NEXT_BASEURL}Outlet/paged?AgencyId=${decodedToken.AgencyID}`, {
        params: {
          PageNumber: page,
          PageSize: 10,
          state,
          name,
          complaintId,
          agencyId,
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
//   console.log(agencies);
  useEffect(() => {
 
    fetchAgencies(currentPage);
 
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentPage, filters]);

  const handleLink = (id)=>{
    router.push(`/outlets/${id}`)
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
  return<Loading />
}


  return (
    <Main >
        <Card className="h-full w-full">
      <CardHeader floated={false} shadow={false} className="rounded-none">
        <div className="flex flex-col items-center justify-between gap-4 md:flex-row md:gap-0">
     <div>
      <Button onClick={handleOpen}>
        Add Outlet
      </Button>
     </div>

          <div className="w-full md:w-[40vw] mb-4 flex space-x-2 ">
            <Input
              label="State"
              value={filters.state}
             onChange={(e) => handleFilterChange(e, "state")}
              icon={<MagnifyingGlassIcon className="h-5 w-5" />}
            />
              <Input
              label="Search"
              icon={<MagnifyingGlassIcon className="h-5 w-5" />}
            />
              <Input
              label="Address"
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
            {agencies.length >= 1 ?  agencies.map(
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
            ) : <Main><tr><td><h1 className='text-center text-2xl mt-4'>No Outlets Found</h1></td></tr></Main> }
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
    <Dialog open={open} handler={(e)=>handleOpen}>
        <DialogHeader>Update Outlet</DialogHeader>
        <DialogBody divider>
        <div>
  
      <form onSubmit={handleSubmit} className='flex flex-col space-y-2'>
        {/* Agency ID (manually assigned) */}
        <div>
         
          <Input
            type="text"
            id="agencyId"
            name="agencyId"
            value={formData.agencyId}
            onChange={handleChange}
            hidden={true}
          />
        </div>

        {/* Other input fields */}
        <div>
         
          <Input
            type="text"
            id="address"
            label='Address'
            name="address"
            value={formData.address}
            onChange={handleChange}
          />
        </div>
        <div>
         
          <Input
            type="text"
            id="phoneNumber"
            label='Phone Number'
            name="phoneNumber"
            value={formData.phoneNumber}
            onChange={handleChange}
          />
        </div>

        {/* State Dropdown */}
        <div>
          
          <select            id="stateId"
            name="stateId"
            value={formData.stateId}
            onChange={handleChange}
          >
            <option value="" className='w-full'>Select a state</option>
            {states.map((state) => (
              <option key={state.id} value={state.id}>
                {state.name}
              </option>
            ))}
          </select>
        </div>

      </form>
    </div>

       
        </DialogBody>
        <DialogFooter>
          <Button
            variant="text"
            color="red"
            onClick={handleOpen}
            className="mr-1"
          >
            <span>Cancel</span>
          </Button>
          <Button variant="gradient" color="green" onClick={handleSubmit}>
            <span>Add Outlet</span>
          </Button>
        </DialogFooter>
      </Dialog>
    
    </Main>
  )
            }
