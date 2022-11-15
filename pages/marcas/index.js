import React from "react";
import { Add, MuseumRounded } from "@mui/icons-material";
import useAxios from "../../Axios/Axios";
import { Button } from "@mui/material";
import { useEffect, useState, useRef } from "react";
import PageHeader from "../../Components/Globals/PageHeader";
import { toast } from "react-toastify";
import BrandList from "../../Components/Brands/BrandList";
import BrandForm from "../../Components/Brands/BrandForm";
import { postImage } from "../../Components/Globals/ImageHandler";
import ConfirmationForm from "../../Components/Globals/ConfirmationForm";

export default function Brand() {
  const [pageState, setPageState] = useState({
    isLoading: true,
    data: [],
    pageSize: 5,
    page: 1,
    totalData: 0,
  });
  const [brandStatus, setBrandStatus] = useState("all");
  const [filter, setFilter] = useState("");
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
      text: "Inicio",
      link: "/",
    },
    {
      text: "Marcas",
      link: "/Marcas",
    },
    // {
    //   text: "Lista",
    //   link: "/",
    // },
  ];

  const setBrandsAsync = async () => {
    try {
      setPageState({ ...pageState, isLoading: true });

      const queryFilters = `page=${pageState.page}&limit=${pageState.pageSize}&value=${filter}`;

      const { data: apiResponse } = await axiosInstance.get(
        `brands?${queryFilters}`
      );

      setPageState({
        ...pageState,
        isLoading: false,
        data: apiResponse.data,
        totalData: apiResponse.dataQuantity,
      });
    } catch (error) {
      toast.error(`Opps!, algo ha ocurrido `);
      setPageState({ ...pageState, isLoading: false });
    }
  };

  const upsertAsync = async (data) => {
    try {
      // loading toast
      toastId.current = toast("Guardando marca...", {
        type: toast.TYPE.LOADING,
      });

      // if there is any file
      let imageUrl = "";
      if (imageFile) {
        imageUrl = await postImage(imageFile);
      }
      const parsedData = { ...data, imageUrl };

      // logic
      if (data.id !== undefined) {
        // if the item exists
        await axiosInstance.put("brand", parsedData);
      } else {
        // if the item doesnt exists
        await axiosInstance.post("brand", parsedData);
      }

      // getting data back
      await setBrandsAsync();

      // success toast
      toast.update(toastId.current, {
        type: toast.TYPE.SUCCESS,
        autoClose: 5000,
        render: "Marca guardada exitosamente",
      });
    } catch (error) {
      // error toast
      toast.error(`Opps!, algo ha ocurrido`);
    }
  };

  const deleteAsync = async () => {
    try {
      toastId.current = toast("Cargando ...", {
        type: toast.TYPE.LOADING,
      });
      await axiosInstance.delete(`brand/${itemToDelete.id}`);
      toast.update(toastId.current, {
        type: toast.TYPE.SUCCESS,
        autoClose: 5000,
        render: "Marca eliminada exitosamente",
      });
      setConfirmOpen(false);
      await setBrandsAsync();
    } catch (error) {
      toast.error(`Opps!, something went wrong${error}`);
      // setBrands({ isLoading: false, data: [] });
      console.log(error);
    }
  };

  useEffect(() => {
    setBrandsAsync();
  }, [pageState.page, pageState.pageSize, filter]);

  return (
    <>
      <div className="w-full md:px-0 px-4 md:pr-8 flex flex-col">
        <div className="flex w-full justify-between items-center pr-8">
          <PageHeader
            header="Marcas"
            locationRoutes={locationRoutes}
            Icon={<MuseumRounded />}
          />
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
          pageState={pageState}
          setBrandStatus={setBrandStatus}
          brandStatus={brandStatus}
          setFilter={setFilter}
          setPageState={setPageState}
          setFormOpen={setFormOpen}
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
          message={"¿Esta seguro que deseas eliminar esta marca?"}
        />
      </div>
    </>
  );
}
