import React from "react";
import { Add } from "@mui/icons-material";
import useAxios from "../Axios/Axios";
import { Button } from "@mui/material";
import { useEffect, useState } from "react";
import PageHeader from "../Components/Globals/PageHeader";
import { toast } from "react-toastify";
import CategoryList from "../Components/Categories/CategoryList";
import CategoryForm from "../Components/Categories/CategoryForm";

export default function Categories() {
  const [formOpen, setFormOpen] = useState(false);
  const [categories, setCategories] = useState({ isLoading: true, data: [] });

  const { axiosInstance } = useAxios();

  const locationRoutes = [
    {
      text: "Dashboard",
      link: "/",
    },
    {
      text: "Categorias",
      link: "/",
    },
    {
      text: "Lista",
      link: "/",
    },
  ];

  const setCategoriesAsync = async () => {
    try {
      const response = await axiosInstance.get(
        "/v1/categories?limit=20&page=1"
      );
      setCategories({ isLoading: false, data: response.data });
    } catch (error) {
      //    toast.error(`Opps!, something went wrong${error}`);
    }
  };

  useEffect(() => {
    setCategoriesAsync();
  }, []);

  return (
    <>
      <div className="w-full md:px-0 px-4 md:pr-8 flex flex-col">
        <div className="flex w-full justify-between items-center pr-8">
          <div>
            <PageHeader header="Categorias" locationRoutes={locationRoutes} />
          </div>
          <div className="flex">
            <Button
              className=" z-auto rounded-xl py-2 bg-green-600 hover:bg-green-800"
              variant="contained"
              onClick={() => setFormOpen(true)}
              startIcon={<Add className="text-white" />}
            >
              <span className="text-sm whitespace-nowrap text-neutral-50 capitalize font-bold">
                Nueva categoria
              </span>
            </Button>
          </div>
        </div>
        <CategoryList setFormOpen={setFormOpen} data={categories} />
        <CategoryForm open={formOpen} setOpen={setFormOpen} />
      </div>
    </>
  );
}
