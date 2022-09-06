import { Add } from "@mui/icons-material";
import useAxios from "../Axios/Axios";
import { Button } from "@mui/material";
import { useEffect, useRef, useState } from "react";
import ContactForm from "../components/Contacts/ContactForm";
import ContactList from "../components/Contacts/ContactList";
import PageHeader from "../components/Globals/PageHeader";
import { toast } from "react-toastify";
import axios from "axios";
import ConfirmationForm from "../Components/Globals/ConfirmationForm";

export default function Contacts() {
  // list data
  const [data, setData] = useState({ isLoading: true, data: [] });

  // upsert states
  const [formOpen, setFormOpen] = useState(false);
  const [formData, setFormData] = useState();

  // confirmation form states
  const [confirmOpen, setConfirmOpen] = useState(false);
  const [itemToDelete, setItemToDelete] = useState();

  const toastId = useRef(null);

  const { axiosInstance } = useAxios();
  const locationRoutes = [
    {
      text: "Dashboard",
      link: "/",
    },
    {
      text: "User",
      link: "/User",
    },
    {
      text: "List",
      link: "/User/list",
    },
  ];

  const setDataAsync = async () => {
    try {
      const response = await axiosInstance.get("v1/contacts?page=1&limit=200");
      setData({ isLoading: false, data: response.data });
    } catch (error) {
      toast.error(`Opps!, something went wrong${error}`);
      setData({ isLoading: false, data: [] });
    }
  };

  const upsertAsync = async (data) => {
    try {
      toastId.current = toast("Please wait...", {
        type: toast.TYPE.LOADING,
      });
      if (data._id !== undefined) {
        await axiosInstance.put("v1/contact", data);
        console.log(data);
      } else {
        await axiosInstance.post("v1/contact", data);
      }
      await setDataAsync();

      toast.update(toastId.current, {
        type: toast.TYPE.SUCCESS,
        autoClose: 5000,
        render: "Success",
      });
    } catch (error) {
      toast.error(`Opps!, something went wrong${error}`);
      setData({ isLoading: false, data: [] });
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
      toast.error(`Opps!, something went wrong${error}`);
      setData({ isLoading: false, data: [] });
    }
  };

  useEffect(() => {
    setDataAsync();
  }, []);
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
              setFormOpen(true);
              setFormData({});
            }}
            startIcon={<Add className="text-white" />}
          >
            <span className="text-sm whitespace-nowrap text-neutral-50 capitalize font-bold">
              New contact
            </span>
          </Button>
        </div>
      </div>
      <ContactList
        setFormOpen={setFormOpen}
        data={data}
        setFormData={setFormData}
        setItemToDelete={setItemToDelete}
        setConfirmOpen={setConfirmOpen}
      />
      <ContactForm open={formOpen} setOpen={setFormOpen} onSave={upsertAsync} />
      <ConfirmationForm
        open={confirmOpen}
        setOpen={setConfirmOpen}
        onConfirm={deleteAsync}
      />
    </div>
  );
}
