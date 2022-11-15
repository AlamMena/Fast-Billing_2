import React from "react";
import { Add, CategoryRounded } from "@mui/icons-material";
import useAxios from "../../Axios/Axios";
import { Button, Tabs, Box, Tab, Typography } from "@mui/material";
import { useEffect, useState, useRef } from "react";
import PageHeader from "../../Components/Globals/PageHeader";
import { toast } from "react-toastify";
import { postImage } from "../../Components/Globals/ImageHandler";

import ConfirmationForm from "../../Components/Globals/ConfirmationForm";
import SubCategoryList from "../../Components/SubCategories/SubCategoriesList";
import SubCategoryForm from "../../Components/SubCategories/SubCategoryForm";

export default function Subcategories() {
  const [pageState, setPageState] = useState({
    isLoading: true,
    data: [],
    pageSize: 5,
    page: 1,
    totalData: 0,
  });
  // const [categoryStatus, setCategoryStatus] = useState("all");
  const [filter, setFilter] = useState("");
  const [subcategories, setSubcategories] = useState({
    isLoading: true,
    data: [],
  });

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
      link: "/categorias",
    },
  ];

  const setSubcategoriesAsync = async () => {
    try {
      setPageState({ ...pageState, isLoading: true });

      const queryFilters = `page=${pageState.page}&limit=${pageState.pageSize}&value=${filter}`;

      const { data: apiResponse } = await axiosInstance.get(
        `subcategories?${queryFilters}`
      );

      setPageState({
        ...pageState,
        isLoading: false,
        data: apiResponse.data,
        totalData: apiResponse.dataQuantity,
      });
    } catch (error) {
      toast.error(`Opps!, algo ha ocurrido ${error} `);
      setPageState({ ...pageState, isLoading: false });
    }
  };

  const upsertAsync = async (data) => {
    try {
      // loading toast
      toastId.current = toast("Cargando ...", {
        type: toast.TYPE.LOADING,
      });

      // logic
      if (data.id !== undefined) {
        // if the item exists
        await axiosInstance.put("/subcategory", data);
      } else {
        // if the item doesnt exists
        await axiosInstance.post("/subcategory", data);
      }

      // getting data back
      await setSubcategoriesAsync();

      // success toast
      toast.update(toastId.current, {
        type: toast.TYPE.SUCCESS,
        autoClose: 3000,
        render: "Subcategoria guardada exitosamente!",
      });
    } catch (error) {
      // error toast
      toast.error(`Opps!, Algo salio mal${error}`);

      // removing data from page
      setSubcategories({ isLoading: false, data: [] });
    }
  };

  const deleteAsync = async () => {
    try {
      toastId.current = toast("Please wait...", {
        type: toast.TYPE.LOADING,
      });
      await axiosInstance.delete(`/Subcategory/ ${itemToDelete.id}`);
      toast.update(toastId.current, {
        type: toast.TYPE.SUCCESS,
        autoClose: 5000,
        render: "Subcategoria eliminada exitosamente",
      });
      setConfirmOpen(false);
      await setSubcategoriesAsync();
    } catch (error) {
      toast.error(`Opps!, Algo salio mal${error}`);
    }
  };

  useEffect(() => {
    setSubcategoriesAsync();
  }, [pageState.page, pageState.pageSize, filter]);

  return (
    <>
      <div className="w-full md:px-0 px-4 md:pr-8 flex flex-col">
        <div className="flex w-full justify-between items-center pr-8">
          <div className="flex items-center justify-between w-full">
            <PageHeader
              header="Subcategorias"
              locationRoutes={locationRoutes}
              Icon={<CategoryRounded />}
            />
            {/* Category Button */}
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
                Crear Subcategoria
              </span>
            </Button>
          </div>
        </div>

        {/* <TabPanel value={value} index={0}> */}
        <SubCategoryList
          pageState={pageState}
          setFilter={setFilter}
          setPageState={setPageState}
          setFormOpen={setFormOpen}
          setFormData={setFormData}
          setItemToDelete={setItemToDelete}
          setConfirmOpen={setConfirmOpen}
        />

        <ConfirmationForm
          open={confirmOpen}
          setOpen={setConfirmOpen}
          onConfirm={deleteAsync}
          message={"¿Estas seguro que deseas eliminar esta subcategoria?"}
        />
        <SubCategoryForm
          open={formOpen}
          setOpen={setFormOpen}
          data={formData}
          onSave={upsertAsync}
        />
      </div>
    </>
  );
}
