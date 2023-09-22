'use client'
import {
  Card,
  Input,
  Checkbox,
  Button,
  Stepper, 
  Step,
  Typography,
} from "@material-tailwind/react";
import { useRouter } from "next/navigation";
import Main from '../../../components/Main'
import Image from "next/image";
import { useState } from "react";
import axios from "axios";
import { useParams } from "next/navigation";
import { toast } from "react-toastify";
import Link from "next/link";
 
export default function SuperAdminReg() {
  const router = useRouter()
  const [registrationData, setRegistrationData] = useState({
    email: "",
    firstName: "",
    lastName: "",
    phoneNumber: "",
    password: "",
    confirmPassword: "",
    role : [
        'Administrator'
    ]
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setRegistrationData({
      ...registrationData,
      [name]: value,
    });
  };
  const [isRegistering, setIsRegistering] = useState(false);
  const [isRegistered, setIsRegistered] = useState(false)

  console.log('from env',process.env.NEXT_BASEURL)
  const handleRegistration = async () => {
    setIsRegistering(true);
  
    if (registrationData.password === registrationData.confirmPassword) {
      try {
        // Define the authorization token (replace with your actual token)
        // const authToken = 'eyJhbGciOiJIUzUxMiIsInR5cCI6IkpXVCJ9.eyJVc2VySWQiOiIyIiwiRnVsbE5hbWUiOiJJYnJhaGltIElicmFoaW0iLCJBZ2VuY3lJRCI6IjIiLCJBZ2VuY3kiOiJGSVJTIiwiU3RhdGVJRCI6IjM3IiwiU3RhdGUiOiJGQ1QiLCJ1bmlxdWVfbmFtZSI6ImlicmFoZWVtLnVtYW5AZ21haWwuY29tIiwiRW1haWwiOiJpYnJhaGVlbS51bWFuQGdtYWlsLmNvbSIsIlBob25lTnVtYmVyIjoiMDgwNTg1ODQ2MzAiLCJyb2xlIjoiQWdlbmN5IEFkbWluIiwibmJmIjoxNjk1MDMzNjE3LCJleHAiOjE2OTU2Mzg0MTcsImlhdCI6MTY5NTAzMzYxN30.OG2tiZosePdZ0HElDPJG-Q8rMyoLRDoy-QV4220XLeo6_R-eBexVlGqjjso_P4046Eqzk66T6I86Wai-CIwhpw';
  
        // Define the request options with the Authorization header
        const requestOptions = {
          method: 'POST',
          headers: {
            'Accept' :'*/*',
            'Content-Type': 'application/json',
            // 'Authorization': `Bearer ${authToken}`,
          },
          body: registrationData,
        };
  
        // Send a POST request to register the user
        await axios.post(
          `${process.env.NEXT_BASEURL}Auth/register`,
          registrationData,
          requestOptions
        )
        .then((response) => {
          // Log the response data
          console.log("Response Data:", response);
  
          setIsRegistering(false);
          setIsRegistered(true)
         
          toast.success("Registration successful!", {
            position: "top-center",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
          });
         if (!isRegistering){
          // router.replace('/confirmotp')
         }
          
        })
      } catch (error) {
        console.error("Error registering user:", error);
        setIsRegistering(false);
        toast.error("Registration failed please try again", {
          position: "top-center",
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
        });
      }
    } else {
      alert('Passwords did not match');
      setIsRegistering(false);
    }
  };
  // console.log('from guid',guid)


  return (
  
    <div className="flex flex-col items-center justify-center p-5  "> 
    <Card color="transparent" shadow={false} className={isRegistered ? 'hidden' : 'block'}>
      <Typography variant="h4" color="blue-gray">
        Sign Up as Super Admin
      </Typography>
      <Typography color="gray" className="mt-1 font-normal">
         
      </Typography>
      <form className="mt-8 mb-2 w-80 max-w-screen-lg sm:w-96">
        <div className="mb-4 flex flex-col gap-6">
          <Input size="lg" name='firstName' label="First Name" value={registrationData.firstName} onChange={handleInputChange} />
          <Input size="lg" name="lastName" label="Last Name" value={registrationData.lastName} onChange={handleInputChange} />
          <Input size="lg" name="email" label="Email" value={registrationData.email} onChange={handleInputChange}/>
          <Input size="lg" name="phoneNumber" label="Phone Number" value={registrationData.phoneNumber} onChange={handleInputChange} />
          <Input type="password" name="password" size="lg" label="Password" value={registrationData.password} onChange={handleInputChange} />
          <Input type="password" name="confirmPassword" size="lg" label="Confirm Password" value={registrationData.confirmPassword}  onChange={handleInputChange} />
        </div>
      
        <Button className="mt-6" fullWidth onClick={handleRegistration }>
          Register
        </Button>
        <Typography color="gray" className="mt-4 text-center font-normal">
          Already have an account?{" "}
          <a href="#" className="font-medium text-gray-900">
            Sign In
          </a>
        </Typography>
      </form>
    </Card>
   <Link
   href={{
    pathname:'/confirmotp',
    query:{
     email : registrationData.email
    }
   }}
   
   > <Button disabled={!isRegistered} hidden={!isRegistered}>Verify Email</Button></Link>

    </div>
  );
}


