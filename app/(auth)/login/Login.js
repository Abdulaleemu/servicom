"use client";

import { Input, Button, Spinner } from "@material-tailwind/react";
import { toast, ToastContainer } from "react-toastify";
import Image from "next/image";
import React, { useState } from "react";
import { EyeFilledIcon } from "./EyeFilledIcon";
import { EyeSlashFilledIcon } from "./EyeSlashFilledIcon";
import { useRouter } from "next/navigation";

export default function Login() {
  const [isVisible, setIsVisible] = useState(false);
  const toggleVisibility = () => setIsVisible(!isVisible);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleLogin = async () => {
    setLoading(true);

    try {
      const response = await fetch(`${process.env.NEXT_BASEURL}Auth/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      if (response.ok) {
        const data = await response.json();
        localStorage.setItem("token", data.token);

        // setToken(data.token);
        console.log("Login sucess");
        toast.success("Login successful!", {
          position: "top-center",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
        });
        router.push("/home");
      } else {
        toast.error("Login failed. Please check your credentials.", {
          position: "top-center",
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
        });
      }
    } catch (error) {
      console.error("Error logging in:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="h-screen w-screen flex flex-cols md:flex-row  ">
      <div className="hidden lg:block md:h-screen  md:w-[50vw] relative ">
        <Image src="/img/left.png" fill={true} objectFit="cover" alt="Logo" />
      </div>
      <div className="h-full w-full md:w-1/2 flex justify-center items-center">
        {/* //Login Box */}
        <div className="w-[415px] h-[408px] flex flex-col gap-16">
          <h1 className="text-[34px] text-center font-semibold">Login</h1>
          <div>
            <div className="flex flex-col w-full flex-wrap md:flex-nowrap gap-4 light mt-">
              <Input
                type="email"
                label="Email"
                variant="bordered"
                size="md"
                isRequired="true"
                onChange={handleEmailChange}
                className="cursor-pointer"
              />
              <Input
                label="Password"
                variant="bordered"
                isRequired="true"
                size="md"
                onChange={handlePasswordChange}
                endContent={
                  <button
                    className="focus:outline-none"
                    type="button"
                    onClick={toggleVisibility}
                  >
                    {isVisible ? (
                      <EyeSlashFilledIcon className="text-2xl text-default-400 pointer-events-none" />
                    ) : (
                      <EyeFilledIcon className="text-2xl text-default-400 pointer-events-none" />
                    )}
                  </button>
                }
                type={isVisible ? "text" : "password"}
              />
            </div>
            <p className="text-sm text-right p-4">forgot password?</p>
            <Button
              onClick={handleLogin}
              disabled={loading}
              size="md"
              className="dark w-full"
            >
              {loading ? <Spinner className="h-8 w-8" /> : "Login"}
            </Button>
            <p className="text-sm text-center p-4">
              Dont have an account?
              <span className="font-semibold"> Sign Up</span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
