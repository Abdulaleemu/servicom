"use client";
import React, { useState, useEffect } from "react";
import axios from "axios";
import Link from "next/link";
import Main from '../../Main'
import { toast } from "react-toastify";
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
import { useRouter, useParams } from "next/navigation";
import jwtDecode from "jwt-decode";
import { MagnifyingGlassIcon } from "@heroicons/react/24/solid";
import Loading from "../../../../components/Loading";
import Image from "next/image";

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


const SingleComplaint = () => {
  const token = localStorage.getItem("token");
  const decodedToken = jwtDecode(token);
  const params = useParams();
  const id = params.id;
  const [agency, setAgency] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const router = useRouter();
  const [complaintId, setComplaintId] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const [message, setMessage] = useState("");
  const [filters, setFilters] = useState({
    id: "",
    status: "",
    agencyName: "",
    name: "",
  });
  const [isLoading, setIsLoading] = useState(false);
  const openModal = () => {
    setIsOpen(true);
  };

  const closeModal = () => {
    setIsOpen(false);
    setMessage("");
  };
  

  
  const fetchAgencies = async (page) => {
    try {
      setIsLoading(true);
      const { status, agencyName, name, id } = filters;
      const response = await axios.get(`${process.env.NEXT_BASEURL}Complaint/${params.id}`, {
        params: {
          PageNumber: page,
          PageSize: 10,
          status,
          name,
          agencyName,
        },
      });
      setAgency(response.data.data);
      setTotalPages(response.data.data.totalPages);
      setIsLoading(false);
    } catch (error) {
      console.error("Failed to fetch agencies:", error.message);
      setIsLoading(false);
    }
  };

  

  useEffect(() => {
    fetchAgencies(currentPage);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentPage, filters]);


  

  const handleFilterChange = (event, filterKey) => {
    setFilters((prevFilters) => ({
      ...prevFilters,
      [filterKey]: event.target.value,
    }));
  };

  const handleMessageInputChange = (e) => {
    setMessage(e.target.value);
    setComplaintId(agency?.id)
  };

  const handleSubmitResolve = (e) => {
    e.preventDefault();
    setIsLoading(true);

    axios
      .post(`${process.env.NEXT_BASEURL}Complaint/resolve`, {
        message,
        complaintId,
      })
      .then((response) => {
        console.log("Response:", response.data);
        if ((response.data.isSuccessful = true)) {
          toast.success(response.data.message);
          setIsLoading(false);
        }
        closeModal();
        router.push('/complaints')
      })
      .catch((error) => {
        console.error("Error:", error);
        toast.error("Failed to resolve complaint. Please try again.");
      });
  };

  if(!agency){
    return <Loading/>
  }

  return (
    <Main heading='Complaints'>
   
   <Card className="h-full w-full">
      
      <CardBody className="overflow-scroll px-0">
      <div className="flex flex-col md:flex-row iems-center justify-between">
        {/* complain */}
        <div className="font-semibold flex-1 p-5">
          <div className="text-3xl font-bold mb-4">{agency?.agencyName}</div>
          <div className="flex mb-2">
            <div className="w-1/3">Agency Name:</div>
            <div className="w-2/3">{agency.agencyid}</div>
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
            <div className="w-1/3">comment:</div>
            {!agency.comment && <div className="w-2/3">No Commens yet</div>}
            {agency.comment && <div className="w-2/3">{agency.comment}</div>}
          </div>
          <div className="flex mb-2">
            <div className="w-1/3">Complaint:</div>
            <div className="w-2/3">{agency.body}</div>
          </div>
          <div className="flex mb-2">
            <div className="w-1/3">Status:</div>
            <div className="w-2/3">{agency.status}</div>
          </div>
          <div className="flex mb-2">
            <div className="w-1/3">Date:</div>
            <div className="w-2/3">{agency.timeStamp}</div>
          </div>
          <div className="flex mb-2">
            <div className="w-1/3">Last Updated:</div>
            {agency.dateUpdated && (
              <div className="w-2/3">{agency.dateUpdated}</div>
            )}
            {!agency.dateUpdated && <div className="w-2/3">No update yet</div>}
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
                className="w-32 h-32 object-contain rounded-lg"
              />
            )}
          </div>
        </div>

        {/* complainer */}
        <div className=" flex flex-col justify-evenly p-5">
          <div>
            <h1 className="text-3xl font-bold mb-4">{agency.name}</h1>
            <h1 className="font-semibold">
              Phone Number: {agency.phoneNumber}
            </h1>
            <h1 className="font-semibold">Email: {agency.email}</h1>
          </div>
          <div className="flex flex-col gap-2 ">
            <Button onClick={openModal}>Resolve</Button>
          </div>
        </div>
      </div>
      {isOpen && (
        <div className="fixed inset-0 flex items-center justify-center z-50">
          <div
            className="fixed inset-0 bg-black opacity-50"
            onClick={closeModal}
          ></div>
          <div className="modal-container">
            <div className="modal-content bg-white p-6 rounded-lg relative z-10">
              <h2 className="text-xl font-bold mb-4">Resolve Complaint</h2>
              <form onSubmit={handleSubmitResolve}>
                <div className="mb-4">
                  <label
                    htmlFor="message"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Message:
                  </label>
                  <input
                    type="text"
                    id="message"
                    name="message"
                    value={message}
                    onChange={handleMessageInputChange}
                    className="mt-1 p-2 w-full border rounded-md"
                    required
                  />
                </div>
                <input type="hidden" name="complaintId" value={agency?.id} />
                <div className="mt-4">
                  <button
                    type="submit"
                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                  >
                    Resolve
                  </button>
                </div>
              </form>
              <button
                onClick={closeModal}
                className="mt-4 bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
      </CardBody>
    </Card>
    </Main>
  );
};

export default SingleComplaint;
