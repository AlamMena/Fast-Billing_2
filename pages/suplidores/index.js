import { Add } from "@mui/icons-material";
import useAxios from "../../Axios/Axios";
import { Button } from "@mui/material";
import { useEffect, useRef, useState } from "react";
import ContactForm from "../../Components/Contacts/ContactForm";
import ContactList from "../../Components/Contacts/ContactList";
import PageHeader from "../../Components/Globals/PageHeader";
import { toast } from "react-toastify";
import { postImage } from "../../Components/Globals/ImageHandler";
import ConfirmationForm from "../../Components/Globals/ConfirmationForm";
import { useRouter } from "next/router";
import { tr } from "date-fns/locale";

export default function Contacts() {
  // list data
  const [pageState, setPageState] = useState({
    isLoading: true,
    data: [],
    pageSize: 10,
    page: 1,
    totalData: 0,
  });

  // confirmation form states
  const [confirmOpen, setConfirmOpen] = useState(false);
  const [suplierStatus, setSuplierStatus] = useState("all");
  const [filter, setFilter] = useState("");
  const [itemToDelete, setItemToDelete] = useState();

  const toastId = useRef(null);
  const { axiosInstance } = useAxios();

  const router = useRouter();
  const locationRoutes = [
    {
      text: "Home",
      link: "/",
    },
    {
      text: "Suplidores",
      link: "/suplidores",
    },
  ];

  const setDataAsync = async () => {
    try {
      setPageState({ ...pageState, isLoading: true });

      const queryFilters = `page=${pageState.page}&limit=${pageState.pageSize}&value=${filter}&isDeleted=${suplierStatus}`;

      const { data: apiResponse } = await axiosInstance.get(
        `v1/suplier/filtered?${queryFilters}`
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

  const deleteAsync = async () => {
    try {
      await toast.promise(
        axiosInstance.delete(`v1/suplier?id=${itemToDelete._id}`),
        {
          pending: "Eliminando suplidor",
          success: "Genial!, tu suplidor ha sido eliminado.",
          error: "Oops, algo ha ocurrido",
        }
      );

      setConfirmOpen(false);
      await setDataAsync();
    } catch (error) {
      toast.error(`Opps!, Algo ha ocurrido`);
    }
  };

  useEffect(() => {
    setDataAsync();
  }, [pageState.page, pageState.pageSize, filter, contactStatus, contactType]);
  return (
    <div className="w-full md:px-0 px-4 md:pr-8 flex flex-col">
      <div className="flex w-full justify-between items-center pr-8">
        <div>
          <PageHeader header="Clientes" locationRoutes={locationRoutes} />
        </div>
        <div className="flex">
          <Button
            className=" z-auto rounded-xl py-2 bg-green-600 hover:bg-green-800"
            variant="contained"
            onClick={() => {
              router.push("/suplier/crear");
            }}
            startIcon={<Add className="text-white" />}
          >
            <span className="text-sm whitespace-nowrap text-neutral-50 capitalize font-bold">
              Nuevo suplidor
            </span>
          </Button>
        </div>
      </div>
      <ContactList
        pageState={pageState}
        setSuplierStatus={setSuplierStatus}
        suplierStatus={suplierStatus}
        setFilter={setFilter}
        setPageState={setPageState}
        setItemToDelete={setItemToDelete}
        setConfirmOpen={setConfirmOpen}
      />
      <ConfirmationForm
        open={confirmOpen}
        setOpen={setConfirmOpen}
        onConfirm={() => {
          deleteAsync(itemToDelete);
        }}
      />
    </div>
  );
}
