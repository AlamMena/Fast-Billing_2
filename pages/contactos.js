import { Add } from "@mui/icons-material";
import useAxios from "../Axios/Axios";
import { Button } from "@mui/material";
import { useEffect, useState } from "react";
import ContactForm from "../components/Contacts/ContactForm";
import ContactList from "../components/Contacts/ContactList";
import PageHeader from "../components/Globals/PageHeader";
import { toast } from "react-toastify";
import axios from "axios";

export default function Contacts() {
  const [formOpen, setFormOpen] = useState(false);
  const [data, setData] = useState({ isLoading: true, data: [] });

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
      const response = await axiosInstance.get("v1/contacts?page=1&limit=2");
      setData({ isLoading: false, data: response.data });
    } catch (error) {
      toast.error(`Opps!, something went wrong${error}`);
      setData({ isLoading: false, data: [] });
    }
  };

  const upsertAsync = async (data) => {
    try {
      if (data._id) {
        await axiosInstance.put("v1/contact", data);
      } else {
        await axiosInstance.put("v1/contact", data);
      }
      await setDataAsync();
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
            onClick={() => setFormOpen(true)}
            startIcon={<Add className="text-white" />}
          >
            <span className="text-sm whitespace-nowrap text-neutral-50 capitalize font-bold">
              New contact
            </span>
          </Button>
        </div>
      </div>
      <ContactList setFormOpen={setFormOpen} data={data} />
      <ContactForm open={formOpen} setOpen={setFormOpen} />
    </div>
  );
}
