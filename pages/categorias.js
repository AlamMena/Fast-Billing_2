import React from "react";
import { Add } from "@mui/icons-material";
import useAxios from "../Axios/Axios";
import { Button } from "@mui/material";
import { useEffect, useState, useRef } from "react";
import PageHeader from "../Components/Globals/PageHeader";
import { toast } from "react-toastify";
import { postImage } from "../Components/Globals/ImagePoster";

import CategoryList from "../Components/Categories/CategoryList";
import CategoryForm from "../Components/Categories/CategoryForm";
import ConfirmationForm from "../Components/Globals/ConfirmationForm";

export default function Categories() {
  const [categories, setCategories] = useState({ isLoading: true, data: [] });
  const [imageFile, setImageFile] = useState();

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
        "/v1/categories?limit=200&page=1"
      );
      setCategories({ isLoading: false, data: response.data });
      console.log(response.data);
    } catch (error) {
      //    toast.error(`Opps!, something went wrong${error}`);
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
        await axiosInstance.put("v1/category", parsedData);
      } else {
        // if the item doesnt exists
        await axiosInstance.post("v1/category", parsedData);
      }

      // getting data back
      await setCategoriesAsync();

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
      setCategories({ isLoading: false, data: [] });
    }
  };

  const deleteAsync = async () => {
    try {
      toastId.current = toast("Please wait...", {
        type: toast.TYPE.LOADING,
      });
      await axiosInstance.delete(`v1/category?id=${itemToDelete._id}`);
      toast.update(toastId.current, {
        type: toast.TYPE.SUCCESS,
        autoClose: 5000,
        render: "Success",
      });
      setConfirmOpen(false);
      await setCategoriesAsync();
      console.log(categories);
    } catch (error) {
      toast.error(`Opps!, something went wrong${error}`);
      setCategories({ isLoading: false, data: [] });
      console.log(error);
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
              onClick={() => {
                setFormOpen(true);
                setFormData({});
              }}
              startIcon={<Add className="text-white" />}
            >
              <span className="text-sm whitespace-nowrap text-neutral-50 capitalize font-bold">
                Nueva categoria
              </span>
            </Button>
          </div>
        </div>
        <CategoryList
          setFormOpen={setFormOpen}
          data={categories}
          setFormData={setFormData}
          setItemToDelete={setItemToDelete}
          setConfirmOpen={setConfirmOpen}
        />
        <CategoryForm
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
