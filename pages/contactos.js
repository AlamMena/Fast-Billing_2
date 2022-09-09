import { Add } from "@mui/icons-material";
import useAxios from "../Axios/Axios";
import { Button } from "@mui/material";
import { useEffect, useRef, useState } from "react";
import ContactForm from "../Components/Contacts/ContactForm";
import ContactList from "../Components/Contacts/ContactList";
import PageHeader from "../Components/Globals/PageHeader";
import { toast } from "react-toastify";
import { postImage } from "../Components/Globals/ImagePoster";
import ConfirmationForm from "../Components/Globals/ConfirmationForm";

export default function Contacts() {
  // list data
  const [data, setData] = useState({ isLoading: true, data: [] });

  // upsert states
  const [formOpen, setFormOpen] = useState(false);
  const [formData, setFormData] = useState();

  const [imageFile, setImageFile] = useState();

  // confirmation form states
  const [confirmOpen, setConfirmOpen] = useState(false);
  const [itemToDelete, setItemToDelete] = useState();

  const toastId = useRef(null);

  const { axiosInstance } = useAxios();
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
    try {
      const response = await axiosInstance.get("v1/contacts?page=1&limit=200");
      setData({ isLoading: false, data: response.data });
    } catch (error) {
      toast.error(`Opps!, something went wrong${error}`);
      setData({ isLoading: false, data: [] });
    }
  };

  const upsertAsync = async (requestData) => {
    try {
      // loading toast
      toastId.current = toast("Please wait...", {
        type: toast.TYPE.LOADING,
      });

      // if there is any file

      let imageUrl = requestData ? requestData.imageUrl : null;
      if (imageFile) {
        imageUrl = await postImage(imageFile);
      }

      const parsedData = { ...requestData, imageUrl };

      // logic
      if (requestData._id !== undefined) {
        // if the item exists
        await axiosInstance.put("v1/contact", parsedData);
      } else {
        // if the item dosent exists
        await axiosInstance.post("v1/contact", parsedData);
      }
      setImageFile(null);
      // getting data back
      await setDataAsync();

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
              Nuevo contacto
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
      <ContactForm
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
  );
}
