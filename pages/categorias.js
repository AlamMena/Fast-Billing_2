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
  const [pageState, setPageState] = useState({
    isLoading: true,
    data: [],
    pageSize: 5,
    page: 1,
    totalData: 0,
  });
  const [categoryStatus, setCategoryStatus] = useState("all");
  const [categoryType, setCategoryType] = useState("all");
  const [filter, setFilter] = useState("");

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
      text: "Inicio",
      link: "/",
    },
    {
      text: "Categorias",
      link: "/",
    },
  ];

  const setCategoriesAsync = async () => {
    try {
      setPageState({ ...pageState, isLoading: true });

      const queryFilters = `page=${pageState.page}&limit=${pageState.pageSize}&value=${filter}&isDeleted=${categoryStatus}`;

      const { data: apiResponse } = await axiosInstance.get(
        `v1/categories/filtered?${queryFilters}`
      );

      setPageState({
        ...pageState,
        isLoading: false,
        data: apiResponse.data,
        totalData: apiResponse.dataQuantity,
      });
    } catch (error) {
      toast.error(`Opps!, algo ha ocurrido ${error}`);
      setPageState({ ...pageState, isLoading: false });
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
        render: "Exito",
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
        render: "Exito",
      });
      setConfirmOpen(false);
      await setCategoriesAsync();
    } catch (error) {
      toast.error(`Opps!, something went wrong${error}`);
      setCategories({ isLoading: false, data: [] });
      console.log(error);
    }
  };

  useEffect(() => {
    setCategoriesAsync();
  }, [
    pageState.page,
    pageState.pageSize,
    filter,
    categoryStatus,
    categoryType,
  ]);

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
          pageState={pageState}
          setCategoryStatus={setCategoryStatus}
          setCategoryType={setCategoryType}
          categoryStatus={categoryStatus}
          categoryType={categoryType}
          setFilter={setFilter}
          setPageState={setPageState}
          setFormOpen={setFormOpen}
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
