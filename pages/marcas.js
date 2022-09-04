import React from "react";
import { Add } from "@mui/icons-material";
import useAxios from "../Axios/Axios";
import { Button } from "@mui/material";
import { useEffect, useState } from "react";
import PageHeader from "../components/Globals/PageHeader";
import { toast } from "react-toastify";
import BrandList from "../Components/Brands/BrandList";
import BrandForm from "../Components/Brands/BrandForm";

export default function Brand() {
  const [formOpen, setFormOpen] = useState(false);
  const [brands, setBrands] = useState({ isLoading: true, data: [] });

  const { axiosInstance } = useAxios();

  const locationRoutes = [
    {
      text: "Dashboard",
      link: "/",
    },
    {
      text: "Marcas",
      link: "/",
    },
    {
      text: "Lista",
      link: "/",
    },
  ];

  const setBrandsAsync = async () => {
    try {
      const response = await axiosInstance.get("/brands?limit=20&page=2");
      setBrands({ isLoading: false, Data: response.data });
    } catch (error) {
      //    toast.error(`Opps!, something went wrong${error}`);
    }
  };

  useEffect(() => {
    setBrandsAsync();
  }, []);

  return (
    <>
      <div className="w-full md:px-0 px-4 md:pr-8 flex flex-col">
        <div className="flex w-full justify-between items-center pr-8">
          <div>
            <PageHeader header="Marcas" locationRoutes={locationRoutes} />
          </div>
          <div className="flex">
            <Button
              className=" z-auto rounded-xl py-2 bg-green-600 hover:bg-green-800"
              variant="contained"
              onClick={() => setFormOpen(true)}
              startIcon={<Add className="text-white" />}
            >
              <span className="text-sm whitespace-nowrap text-neutral-50 capitalize font-bold">
                Nueva marca
              </span>
            </Button>
          </div>
        </div>
        <BrandList setFormOpen={setFormOpen} data={brands} />
        <BrandForm open={formOpen} setOpen={setFormOpen} />
      </div>
    </>
  );
}
