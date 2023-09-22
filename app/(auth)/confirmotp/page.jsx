'use client'

import { Input, Button, Spinner,Typography } from "@material-tailwind/react";
import { toast, ToastContainer } from "react-toastify";
import Image from "next/image";
import React, { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";

export default function ConfirmOTP() {

    const [isVisible, setIsVisible] = useState(false);
    const toggleVisibility = () => setIsVisible(!isVisible);
  
    const [otp, setOtp] = useState("");
    const [email, setEmail] = useState("");

    const [loading, setLoading] = useState(false);
    const router = useRouter();
    const searchParams = useSearchParams()
    console.log('registered email address',searchParams.get('email'))
  
    const handleOtpChange = (e) => {
      setOtp(e.target.value);
      setEmail(searchParams.get('email'))
    };
         

      const handleVerification = async () => {
        try {
          const response = await fetch(
            `${process.env.NEXT_BASEURL}Auth/VerifyEmail?Email=${email}&Otp=${otp}`
          );
    
          if (response.ok) {
            // Successful verification
            toast.success("Email verification successful!");
            router.replace('/login')
          } else {
            // Failed verification
            toast.error("Email verification failed. Please check your OTP.");
          }
        } catch (error) {
          console.error("Error during email verification:", error);
          toast.error("An error occurred during email verification. Please try again.");
        }
      };


  return (
    <div className="h-full w-full md:w-1/2 flex justify-center items-center">
    {/* //OTP */}
    <div className="w-[415px] h-[408px] flex flex-col gap-16">
      <h1 className="text-[34px] text-center font-semibold">Verify Your Account</h1>
    <p className="text-center font-sm text-red-500">To complete the verification process, please find the OTP in your email</p>
      <div>
        <div className="flex flex-col w-full flex-wrap md:flex-nowrap gap-4 light mt-">

        {/* <Input
            type="email"
            label="Email"
            variant="bordered"
            size="md"
            isRequired="true"
            onChange={handleEmailChange}
            className="cursor-pointer"
          /> */}
          <Input
            type="otp"
            label="OTP"
            variant="bordered"
            size="md"
            isRequired="true"
            onChange={handleOtpChange}
            className="cursor-pointer"
          />
          
        </div>
        <p className="text-sm text-right p-4">resend</p>
        <Button
          onClick={handleVerification}
          disabled={loading}
          size="md"
          className="dark w-full"
        >
          {loading ? <Spinner className="h-8 w-8" /> : "Verify"}
        </Button>
     
      </div>
    </div>
  </div>
  )
}
