import React from "react";
import { Add, ApartmentRounded } from "@mui/icons-material";
import useAxios from "../Axios/Axios";
import { Button } from "@mui/material";
import { useEffect, useState, useRef } from "react";
import PageHeader from "../Components/Globals/PageHeader";
import { toast } from "react-toastify";
import BrandList from "../Components/Brands/BrandList";
import BrandForm from "../Components/Brands/BrandForm";
import BranchList from "../Components/Branches/BranchList";
import { postImage } from "../Components/Globals/ImageHandler";
import ConfirmationForm from "../Components/Globals/ConfirmationForm";
import BranchForm from "../Components/Branches/BranchForm";

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
      text: "Sucursales",
      link: "/",
    },
  ];

  const setBranchesAsync = async () => {
    try {
      setPageState({ ...pageState, isLoading: true });

      const queryFilters = `page=${pageState.page}&limit=${pageState.pageSize}&value=${filter}`;

      const { data: apiResponse } = await axiosInstance.get(
        `branches?${queryFilters}`
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
      if (data.id !== undefined) {
        // if the item exists
        await axiosInstance.put("branch", parsedData);
      } else {
        // if the item doesnt exists
        await axiosInstance.post("branch", parsedData);
      }

      // getting data back
      await setBranchesAsync();

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
      // setBrands({ isLoading: false, data: [] });
    }
  };

  const deleteAsync = async () => {
    try {
      toastId.current = toast("Please wait...", {
        type: toast.TYPE.LOADING,
      });
      await axiosInstance.delete(`branch/${itemToDelete.id}`);
      toast.update(toastId.current, {
        type: toast.TYPE.SUCCESS,
        autoClose: 5000,
        render: "Success",
      });
      setConfirmOpen(false);
      await setBranchesAsync();
    } catch (error) {
      toast.error(`Opps!, something went wrong${error}`);
      // setBrands({ isLoading: false, data: [] });
      console.log(error);
    }
  };

  useEffect(() => {
    setBranchesAsync();
  }, [pageState.page, pageState.pageSize, filter]);

  return (
    <>
      <div className="w-full md:px-0 px-4 md:pr-8 flex flex-col">
        <div className="flex w-full justify-between items-center pr-8">
          <div>
            <PageHeader
              header="Sucursales"
              locationRoutes={locationRoutes}
              Icon={<ApartmentRounded />}
            />
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
                Nueva sucursal
              </span>
            </Button>
          </div>
        </div>
        <BranchList
          pageState={pageState}
          setFilter={setFilter}
          setPageState={setPageState}
          setFormOpen={setFormOpen}
          setFormData={setFormData}
          setItemToDelete={setItemToDelete}
          setConfirmOpen={setConfirmOpen}
        />
        <BranchForm
          open={formOpen}
          setOpen={setFormOpen}
          data={formData}
          onSave={upsertAsync}
          setFile={setImageFile}
          file={imageFile}
        />
        {/* <ConfirmationForm
          open={confirmOpen}
          setOpen={setConfirmOpen}
          onConfirm={deleteAsync}
          message={"esta marca"}
        />  */}
      </div>
    </>
  );
}
