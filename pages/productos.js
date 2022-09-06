import React from "react";
import { Add } from "@mui/icons-material";
import useAxios from "../Axios/Axios";
import { Button } from "@mui/material";
import { useEffect, useState } from "react";
import PageHeader from "../components/Globals/PageHeader";
import { toast } from "react-toastify";
import CategoryList from "../Components/Categories/CategoryList";
import CategoryForm from "../Components/Categories/CategoryForm";
import ProductsList from "../Components/Products/ProductsList";
import ProductsForm from "../Components/Products/ProductsForm";

export default function Products() {
  const [formOpen, setFormOpen] = useState(false);
  const [products, setProducts] = useState({ isLoading: true, data: [] });

  const { axiosInstance } = useAxios();
  const locationRoutes = [
    {
      text: "Dashboard",
      link: "/",
    },
    {
      text: "Productos",
      link: "/User",
    },
    {
      text: "Lista",
      link: "/User/list",
    },
  ];

  const setProductsAsync = async () => {
    try {

      const response = await axiosInstance.get("v1/products?limit=20&page=1");
      setProducts({ isLoading: false, data: response.data });
      console.log(response);
    } catch (error) {
      toast.error(`Opps!, something went wrong${error}`);
      setProducts({ isLoading: false, data: [] });
      console.log(error);
    }
  };

  useEffect(() => {
    setProductsAsync();
  }, []);

  return (
    <>
      <div className="w-full md:px-0 px-4 md:pr-8 flex flex-col">
        <div className="flex w-full justify-between items-center pr-8">
          <div>
            <PageHeader header="Productos" locationRoutes={locationRoutes} />
          </div>
          <div className="flex">
            <Button
              className=" w-fit z-auto rounded-xl py-2 bg-green-600 hover:bg-green-800"
              variant="contained"
              onClick={() => setFormOpen(true)}
              startIcon={<Add className="text-white" />}
            >
              <span className=" hidden md:flex text-sm whitespace-nowrap text-neutral-50 capitalize font-bold">
                Nuevo producto
              </span>
            </Button>
          </div>
        </div>
        <ProductsList setFormOpen={setFormOpen} data={products} />
        <ProductsForm open={formOpen} setOpen={setFormOpen} />
      </div>
    </>
  );
}
