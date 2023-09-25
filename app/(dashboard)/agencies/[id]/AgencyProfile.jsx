'use client'
import Main from '../../Main'
import React, { useState, useEffect } from "react";
import jwtDecode from 'jwt-decode';
import axios from "axios";
import Image from "next/image";
import { useParams, useRouter } from 'next/navigation'
import QrCodeDownload from './qr'
import {
  Button,
  Dialog,
  DialogHeader,
  DialogBody,
  DialogFooter,
  Input,
  Textarea,
} from "@material-tailwind/react";
import Loading from '../../../../components/Loading';
import Link from 'next/link';


export default function AgencyProfile() {
  const token = localStorage.getItem('token')
  const decodedToken = jwtDecode(token)
  const params = useParams();
  const router = useRouter()
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
  const [states, setStates] = useState([])
  const [stateId, setStateId] = useState();
   const authToken = `Bearer ${token}`;
  const [agencyData, setAgencyData] = useState({
    stateId: 0,
    isHeadquarters:false,
    hqOutletStatus: '',
    name: '',
    abbreviation: '',
    address: '',
    phoneNumber: '',
    about: '',
    websiteUrl: '',
    logoUrl: '',
    rating: 0,
  });
  const [openQr, setOpenQr] = useState(false);


  // Function to handle form submission
  const handleUpdateAgency = async () => {
    try {
      // Define the API endpoint and authorization token
      const apiUrl = `${process.env.NEXT_BASEURL}Agency/updateAgency`;
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
        `${process.env.NEXT_BASEURL}Agency/${id}`
      );
      setAgency(response.data.data);
      console.log(response.data.data);
    } catch (error) {
      console.error("Failed to fetch agency:", error.message);
    }
  };

  const fetchAgencies = async () => {
    try {
      const response = await axios.get(`${process.env.NEXT_BASEURL}Agency`);
      setAgencies(response.data.data);
      console.log("from agenciesss", response.data.data);
    } catch (error) {
      console.error("Failed to fetch agency:", error.message);
    }
  };
//  handle generate email
const generateAdminUrl = async () => {
  try {
    // Replace 'yourAuthToken' with the actual authentication token
  

    const response = await axios.get(
      `${process.env.NEXT_BASEURL}Auth/GenerateAdminUrl?agencyId=${agency.id}&userEmail=${email}`,
      {
        headers: {
          Authorization: authToken, // Include the Bearer token
        },
      }
    );
   
    console.log('email sent', response);
  } catch (error) {
    console.error("Failed to fetch agency:", error.message);
  }
};

//  handle generate desk email
const generateDeskUrl = async () => {
  try {
    // Replace 'yourAuthToken' with the actual authentication token
  

    const response = await axios.get(
      `${process.env.NEXT_BASEURL}Auth/GenerateDeskOfficerUrl?stateId=${stateId}&userEmail=${email}`,
      {
        headers: {
          Authorization: authToken, // Include the Bearer token
        },
      }
    );
   
    console.log('email sent', response);
  } catch (error) {
    console.error("Failed to fetch agency:", error.message);
  }
};;


  const routeToOutlets = ()=>{
    router.push('/outlets')
  }

  const fetchStates = ()=>{
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
  }


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
    fetchStates()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

 

  const handleAgencySelect = (agencyId) => {
    setSelectedAgencyId(agencyId);
  };

  const filteredAgencies = agencies?.filter((agency) =>
    agency.name.toLowerCase().includes(searchTerm.toLowerCase())
  );



  
  async function fetchQrCodeImage() {
    try {
      const response = await fetch(`${process.env.NEXT_BASEURL}QrCode/quickchart?AgencyId=${agency.id}&imageWidth=500`);
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      // console.log('from qr', response);
      return response.blob() // Get the response as a Blob (file)
        ;
    } catch (error) {
      console.error('There was a problem with the fetch operation:', error);
      throw error; // Rethrow the error to handle it elsewhere if needed
    }
  }
  
  const handleQrModel = ()=>{
    fetchQrCodeImage()
    setOpenQr(!openQr)
  }


  if(!agency){
    return <Loading />
  }

  
  return (
    <Main >
    <Image src={agency?.hqOutletStatus}
        height={100}
        width={100}
        alt='Outlet'/>
      <div className="flex items-center justify-between border-b border-1 border-gray-600 p-2 mb-2">
        <div className="text-3xl font-bold mb-4">{agency.name}</div>
        <div className="flex space-x-4">
      <Link href={
        {
          pathname: '/outlets',
          query: {
            id: agency.id
          }
        }
      }>
      <Button
            // onClick={ routeToOutlets }
            disabled={!isAdministrator}
            hidden={!isAdministrator}
            color="dark"
            pill
            size="xs"
          >
            {" "}
            Outlets
          </Button>
      </Link>

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
          <Button
            onClick={() => setOpenQr('default')}
            color="dark"
            pill
            size="xs"
          >
            {" "}
          QrCode
          </Button>
          <Button
            onClick={() => propDesk.setOpenAddDeskModal("default")}
            disabled={!isAgencyAdmin && !isAdministrator}
            hidden={!isAgencyAdmin && !isAdministrator}
            color="dark"
            pill
            size="xs"
          >
            {" "}
            Generate Desk Officer
          </Button>
          <Button
            onClick={() => props.setOpenModal('default')}
            disabled={!isAdministrator}
            hidden={!isAdministrator}
            color="dark"
            pill
            size="xs"
          >
            {" "}
            Generate Admin Url
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
        <DialogHeader>Generate Agency Admin Link For {agency.abbreviation}</DialogHeader>
        <DialogBody>
          <div className="space-y-6">
            <div>
              <div className="flex gap-2 items-center">
                {/* <Input
                  label="Search Agency"
                  type="text"
                  value={agency.name}
                  onChange={(e) => setSearchTerm(e.target.value)}
                /> */}
                
                <Input
                  label="Email"
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>

     
            </div>
          </div>
        </DialogBody>
        <DialogFooter className='flex space-x-2'>
          <Button onClick={ generateAdminUrl}>
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
        <DialogHeader>Generate Agency Desk Officer for {agency.abbreviation}</DialogHeader>
        <DialogBody>
        <div className="space-y-6">
            <div>
              <div className="flex gap-2 items-center">
                {/* <Input
                  label="Search Agency"
                  type="text"
                  value={agency.name}
                  onChange={(e) => setSearchTerm(e.target.value)}
                /> */}
                
                <Input
                  label="Email"
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
                 {/* State Dropdown */}
        <div>
          
          <select            id="stateId"
            name="stateId"
            value={stateId}
            onChange={(e)=>setStateId(e.target.value)}
          >
            <option value="" className='w-full'>Select a state</option>
            {states.map((state) => (
              <option key={state.id} value={state.id}>
                {state.name}
              </option>
            ))}
          </select>
        </div>
              </div>

     
            </div>
          </div>
        </DialogBody>
        <DialogFooter className='flex space-x-2'>
          <Button onClick={() => generateDeskUrl()}>
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
      <Input type="text" label='Address' name="address" value={agencyData.address} onChange={handleInputChange} />
      <Input type="text" label='Phone Number' name="phoneNumber"  value={agencyData.phoneNumber} onChange={handleInputChange} />
      <Input type="text" label='About' name="about"  value={agencyData.about} onChange={handleInputChange} />
      <Input type="text" label='Website Url' name="websiteUrl"  value={agencyData.websiteUrl} onChange={handleInputChange} />
      <Input type="text" label='Logo' name="logoUrl"  value={agencyData.logoUrl} onChange={handleInputChange} />
      </div>
          </div>
        </DialogBody>
        <DialogFooter className='flex space-x-3'>
          <Button onClick={handleUpdateAgency} disabled={isUpdating}>
            {isUpdating ? "Updating..." : "Update Agency"}
          </Button>
          <Button color="gray" onClick={() => setUpdateOpenModal(!openUpdateModal)}>
            Cancel
          </Button>
        </DialogFooter>
      </Dialog>
     {/* qrmodal  */}

      <Dialog open={openQr} handler={handleQrModel}>
        <DialogHeader>Agency Qr Code</DialogHeader>
        <DialogBody divider>
       < QrCodeDownload id={agency.id}/>
        </DialogBody>
        <DialogFooter>
          <Button
            variant="text"
            color="red"
            onClick={()=>setOpenQr(!openQr)}
            className="mr-1"
          >
            <span>Cancel</span>
          </Button>
          <Button variant="gradient" color="green" onClick={()=>setOpenQr(!openQr)}>
            <span>Download</span>
          </Button>
        </DialogFooter>
      </Dialog>
     </Main>
  )
}
