import React from "react";
import { Add } from "@mui/icons-material";
import useAxios from "../Axios/Axios";
import { Button } from "@mui/material";
import { useEffect, useState, useRef } from "react";
import PageHeader from "../Components/Globals/PageHeader";
import { toast } from "react-toastify";
import BrandList from "../Components/Brands/BrandList";
import BrandForm from "../Components/Brands/BrandForm";
import { postImage } from "../Components/Globals/ImagePoster";
import ConfirmationForm from "../Components/Globals/ConfirmationForm";

export default function Brand() {
  const [brands, setBrands] = useState({ isLoading: true, data: [] });
  const [imageFile, setImageFile] = useState();

  // upsert states
  const [formOpen, setFormOpen] = useState(false);
  const [formData, setFormData] = useState();

  const { axiosInstance } = useAxios();

  // confirmation form states
  const [confirmOpen, setConfirmOpen] = useState(false);
  const [itemToDelete, setItemToDelete] = useState();

  const toastId = useRef(null);

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
      const response = await axiosInstance.get("v1/brands?limit=20&page=1");
      setBrands({ isLoading: false, data: response.data });
    } catch (error) {
      toast.error(`Opps!, something went wrong${error}`);
      setBrands({ isLoading: false, data: [] });
    }
  };

  const upsertAsync = async (data) => {
    try {
      // loading toast
      toastId.current = toast("Please wait...", {
        type: toast.TYPE.LOADING,
      });

      // if there is any file
      let imageUrl = "";
      if (imageFile) {
        imageUrl = await postImage(imageFile);
      }
      const parsedData = { ...data, imageUrl };

      // logic
      if (data._id !== undefined) {
        // if the item exists
        await axiosInstance.put("v1/brand", parsedData);
      } else {
        // if the item doesnt exists
        await axiosInstance.post("v1/brand", parsedData);
      }

      // getting data back
      await setBrandsAsync();

      // success toast
      toast.update(toastId.current, {
        type: toast.TYPE.SUCCESS,
        autoClose: 5000,
        render: "Success",
      });
    } catch (error) {
      // error toast
      toast.error(`Opps!, something went wrong${error}`);

      // removing data from page
      setBrands({ isLoading: false, data: [] });
    }
  };

  const deleteAsync = async () => {
    try {
      toastId.current = toast("Please wait...", {
        type: toast.TYPE.LOADING,
      });
      await axiosInstance.delete(`v1/brand?id=${itemToDelete._id}`);
      toast.update(toastId.current, {
        type: toast.TYPE.SUCCESS,
        autoClose: 5000,
        render: "Success",
      });
      setConfirmOpen(false);
      await setBrandsAsync();
      console.log(brands);
    } catch (error) {
      toast.error(`Opps!, something went wrong${error}`);
      setBrands({ isLoading: false, data: [] });
      console.log(error);
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
              onClick={() => {
                setFormOpen(true);
                setFormData({});
              }}
              startIcon={<Add className="text-white" />}
            >
              <span className="text-sm whitespace-nowrap text-neutral-50 capitalize font-bold">
                Nueva marca
              </span>
            </Button>
          </div>
        </div>
        <BrandList
          setFormOpen={setFormOpen}
          data={brands}
          setFormData={setFormData}
          setItemToDelete={setItemToDelete}
          setConfirmOpen={setConfirmOpen}
        />
        <BrandForm
          open={formOpen}
          setOpen={setFormOpen}
          data={formData}
          onSave={upsertAsync}
          setFile={setImageFile}
          file={imageFile}
        />
        <ConfirmationForm
          open={confirmOpen}
          setOpen={setConfirmOpen}
          onConfirm={deleteAsync}
        />
      </div>
    </>
  );
}
