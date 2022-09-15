import { Add } from "@mui/icons-material";
import useAxios from "../../Axios/Axios";
import { Button } from "@mui/material";
import { useEffect, useRef, useState } from "react";
import ContactForm from "../../Components/Contacts/ContactForm";
import ContactList from "../../Components/Contacts/ContactList";
import PageHeader from "../../Components/Globals/PageHeader";
import { toast } from "react-toastify";
import { postImage } from "../../Components/Globals/ImagePoster";
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
  const [filter, setFilter] = useState("Al");
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
      text: "Contactos",
      link: "/contactos",
    },
  ];

  const setDataAsync = async () => {
    console.log(pageState);
    try {
      setPageState({ ...pageState, isLoading: true });

      let apiResponse;

      if (filter !== "") {
        const response = await axiosInstance.get(
          `v1/contact/filtered?page=${pageState.page}&limit=${pageState.pageSize}&value=${filter}`
        );
        apiResponse = response.data;
      } else {
        const response = await axiosInstance.get(
          `v1/contactspage=${pageState.page}&limit=${pageState.pageSize}`
        );

        apiResponse = response.data;
      }
      setPageState({
        ...pageState,
        isLoading: false,
        data: apiResponse.data,
        totalData: apiResponse.dataQuantity,
      });
    } catch (error) {
      toast.error(`Opps!, something went wrong${error}`);
      setPageState({ ...pageState, isLoading: false });
    }
  };

  const deleteAsync = async () => {
    try {
      toastId.current = toast("Please wait...", {
        type: toast.TYPE.LOADING,
      });
      await axiosInstance.delete(`v1/contact?id=${itemToDelete._id}`);
      toast.update(toastId.current, {
        type: toast.TYPE.SUCCESS,
        autoClose: 5000,
        render: "Success",
      });
      setConfirmOpen(false);
      await setDataAsync();
      console.log(data);
    } catch (error) {
      toast.error(`Opps!, Algo ocurriÓ`);
      setData({ isLoading: false, contacts: [] });
    }
  };

  useEffect(() => {
    setDataAsync();
  }, [pageState.page, pageState.pageSize]);
  return (
    <div className="w-full md:px-0 px-4 md:pr-8 flex flex-col">
      <div className="flex w-full justify-between items-center pr-8">
        <div>
          <PageHeader header="Contacts" locationRoutes={locationRoutes} />
        </div>
        <div className="flex">
          <Button
            className=" z-auto rounded-xl py-2 bg-green-600 hover:bg-green-800"
            variant="contained"
            onClick={() => {
              router.push("/contactos/crear");
            }}
            startIcon={<Add className="text-white" />}
          >
            <span
              className="text-sm whitespace-nowrap text-neutral-50 capitalize font-bold"
              onClick={() => Router.push("./contactos/crear")}
            >
              Nuevo contacto
            </span>
          </Button>
        </div>
      </div>
      <ContactList
        pageState={pageState}
        setFilter={setFilter}
        setPageState={setPageState}
        setItemToDelete={setItemToDelete}
        setConfirmOpen={setConfirmOpen}
      />
    </div>
  );
}
