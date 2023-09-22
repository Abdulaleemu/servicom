'use client'
import Main from '../../Main'
import React, { useState, useEffect } from "react";
import jwtDecode from 'jwt-decode';
import axios from "axios";
import Image from "next/image";
import { useParams,useSearchParams } from 'next/navigation'
import {
  Button,
  Dialog,
  DialogHeader,
  DialogBody,
  DialogFooter,
  Input,
  Textarea,
} from "@material-tailwind/react";


export default function AgencyProfile() {
 
  const token = localStorage.getItem('token')
  const decodedToken = jwtDecode(token)
  const params = useParams();
  const id = params.id
  const [agency, setAgency] = useState(null);
  const [openModal, setOpenModal] = useState(false);
  const props = { openModal, setOpenModal };
  const [openUpdateModal, setUpdateOpenModal] = useState(false);
  const propsUpdate = { openUpdateModal, setUpdateOpenModal };
  const [openAddDeskModal,setOpenAddDeskModal] = useState(false)
  const propDesk = {openAddDeskModal, setOpenAddDeskModal}
  const [agencies, setAgencies] = useState([]);
  const [selectedAgencyId, setSelectedAgencyId] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [email, setEmail] = useState("");
  const [decoded, setDecoded] = useState()
  const [isAdministrator, setIsAdminisrator] = useState(false)
  const [isAgencyAdmin, setIsAgencyAdmin] = useState(false)
  const [isDeskOfficer, setIsDeskOfficer] = useState(false)
  const [agencyData, setAgencyData] = useState({
    stateId: 0,
    isHeadquarters:false,
    hqOutletStatus: '',
    name: '',

  });



  // Function to handle form submission
  const handleUpdateAgency = async () => {
    try {
      // Define the API endpoint and authorization token
      const apiUrl = `${process.env.NEXT_BASEURL}updateOutlet`;
      const authToken = `Bearer ${token}`; // Replace with your actual authorization token

      // Send a PUT request to update the agency
      const response = await axios.put(apiUrl, agencyData, {
        headers: {
          Authorization: authToken,
        },
      });

    
      console.log('Agency updated successfully:', response.data);
    } catch (error) {
      
      console.error('Error updating agency:', error);
    }
  };

  // Function to handle input field changes
  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setAgencyData({
      ...agencyData,
      [name]: value,
    });
  };

// new update 


  

  const handleOpenUpdateModal = ()=>{
    setOpenModal(!open)
  }

  const handleOpenModal = ()=>{
    setOpenModal(!open)     
  }

  const handleOpenDeskModal = ()=>{
    setOpenAddDeskModal(!open)     
  }
  const [isUpdating, setIsUpdating] = useState(false);

  const fetchAgency = async () => {
    try {
      const response = await axios.get(
        `${process.env.NEXT_BASEURL}Outlet/${id}`
      );
      setAgency(response.data.data);
      console.log(response.data.data);
    } catch (error) {
      console.error("Failed to fetch agency:", error.message);
    }
  };

  const fetchAgencies = async () => {
    try {
      const response = await axios.get(`${process.env.NEXT_BASEURL}Outlet`);
      setAgencies(response.data.data);
      console.log("from agenciesss", response.data.data);
    } catch (error) {
      console.error("Failed to fetch agency:", error.message);
    }
  };

  


  useEffect(() => {
    const decodedToken = jwtDecode(token)
    if(decodedToken.role == 'Administrator'){
      setIsAdminisrator(true)
    }else if(decodedToken.role == 'Agency Admin'){
      setIsAgencyAdmin(true)
    }else if(decodedToken.role == 'Desk Officer'){
      setIsDeskOfficer(true)
    }else{
      alert('Permission Denied')
    }
    fetchAgency();
    fetchAgencies();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  useEffect(() => {
    fetchAgencies();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleAgencySelect = (agencyId) => {
    setSelectedAgencyId(agencyId);
  };

  const filteredAgencies = agencies?.filter((agency) =>
    agency.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (!agency) {
    return (
      <Main>
        <div className='text-center'>Loading...</div>
      </Main>
    );
  }
  

  console.log('decoded', isAdministrator)
  return (
    <Main >
     <Image src={agency?.hqOutletStatus}
        height={100}
        width={100}
        alt='Outlet'/>
      <div className="flex items-center justify-between border-b border-1 border-gray-600 p-2 mb-2">
        <div className="text-3xl font-bold mb-4">{agency.name}</div>
        <div className="flex space-x-4">
          <Button
            onClick={() => propsUpdate.setUpdateOpenModal("default")}
            disabled={!isAgencyAdmin && !isAdministrator}
            color="dark"
            pill
            size="xs"
          >
            {" "}
            Update
          </Button>
       
        </div>
      </div>
      <div className="flex mb-2">
        <div className="w-1/3">Agency ID:</div>
        <div className="w-2/3">{agency.id}</div>
      </div>
      <div className="flex mb-2">
        <div className="w-1/3">Address:</div>
        <div className="w-2/3">{agency.address}</div>
      </div>
      <div className="flex mb-2">
        <div className="w-1/3">State:</div>
        <div className="w-2/3">{agency.state}</div>
      </div>
      <div className="flex mb-2">
        <div className="w-1/3">Phone Number:</div>
        <div className="w-2/3">{agency.phoneNumber}</div>
      </div>
      <div className="flex mb-2">
        <div className="w-1/3">About:</div>
        <div className="w-2/3">{agency.about}</div>
      </div>
      <div className="flex mb-2">
        <div className="w-1/3">Website:</div>
        <div className="w-2/3">{agency.websiteUrl}</div>
      </div>
      <div className="flex mb-2">
        <div className="w-1/3">Rating:</div>
        <div className="w-2/3">{agency.rating}</div>
      </div>
      <div className="mt-4">
        {agency.logoUrl && (
          <Image
            src={agency.logoUrl}
            alt={agency.name}
            height={100}
            width={100}
            className="w-32 h-32 object-contain rounded-lg"
          />
        )}
      </div>
      <Dialog
        open={openModal} handler={()=>handleOpenModal(decoded.role)}
      >
        <DialogHeader>Generate Agency Admin Link</DialogHeader>
        <DialogBody>
          <div className="space-y-6">
            <div>
              <div className="flex gap-2 items-center">
                <Input
                  label="Search Agency"
                  type="text"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
                <Input
                  label="Email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>

              <ul>
                {filteredAgencies?.map((agency) => (
                  <li
                    className="cursor-pointer border-b p-2 font-semibold"
                    key={agency.id}
                    onClick={() => handleAgencySelect(agency.id)}
                  >
                    {agency.name}
                  </li>
                ))}
              </ul>
              {selectedAgencyId && (
                <p>Selected Agency ID: {selectedAgencyId}</p>
              )}
            </div>
          </div>
        </DialogBody>
        <DialogFooter className='flex space-x-2'>
          <Button onClick={() => props.setOpenModal(undefined)}>
            Send Link
          </Button>
          <Button color="gray" onClick={() => props.setOpenModal(undefined)}>
            Cancel
          </Button>
        </DialogFooter>
      </Dialog>

    {/* add desk modal  */}
    <Dialog
        open={openAddDeskModal} handler={()=>handleOpenDeskModal()}
      >
        <DialogHeader>Generate Agency Desk Officer</DialogHeader>
        <DialogBody>
          <div className="space-y-6">
            <div>
              <div className="flex gap-2 items-center">
                <Input
                  label="Search Agency"
                  type="text"
                  value={agency.name}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
           
              <h2>{agency.name}</h2>

          
            </div>
          </div>
          </div>
        </DialogBody>
        <DialogFooter className='flex space-x-2'>
          <Button onClick={() => props.setOpenModal(undefined)}>
            Send Link
          </Button>
          <Button color="gray" onClick={() => propDesk.setOpenAddDeskModal(undefined)}>
            Cancel
          </Button>
        </DialogFooter>
      </Dialog>
      {/* update model */}

      <Dialog
     open={openUpdateModal} handler={handleOpenUpdateModal}
      >
        <DialogHeader className='text-red-600'>Update : {agency.name}</DialogHeader>
        <DialogBody>
          <div className="space-y-6">
          <div>
      {/* Input fields for agency properties */}
      {/* <Input type="checkbox" label='isHeadquaters' name="isHeadquarters" checked={agencyData.isHeadquarters} onChange={handleInputChange} /> */}
      <Input type="text" name="hqOutletStatus" label='HQ outlet Status'  value={agencyData.hqOutletStatus} onChange={handleInputChange} />
      <Input type="text" label='Agency Name' name="name"  value={agencyData.name} onChange={handleInputChange} />
      <Input type="text" label='Abbrivation' name="abbreviation"  value={agencyData.abbreviation} onChange={handleInputChange} />
    
      </div>
          </div>
        </DialogBody>
        <DialogFooter className='flex space-x-3'>
          <Button onClick={handleUpdateAgency} disabled={isUpdating}>
            {isUpdating ? "Updating..." : "Update Outlet"}
          </Button>
          <Button color="gray" onClick={() => setUpdateOpenModal(!openUpdateModal)}>
            Cancel
          </Button>
        </DialogFooter>
      </Dialog>
     </Main>
  )
}
