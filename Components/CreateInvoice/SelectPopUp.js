import {
  Dialog,
  DialogContent,
  DialogTitle,
  Button,
  DialogActions,
} from "@mui/material";
import { InvoiceRecipient } from "./InvoiceContact";
import { useDispatch } from "react-redux";
import { updateBeneficiary, updateRecipient } from "../../Store/InvoiceSlice";
import { useState, useEffect } from "react";
import useAxios from "../../Axios/Axios";
import { toast } from "react-toastify";

export default function SelectPopUp({ open, setOpenSelect, type }) {
  const [contacts, setContacts] = useState({
    isLoading: true,
    data: [],
  });
  const dispatch = useDispatch();
  const { axiosInstance } = useAxios();

  const setDataAsync = async () => {
    try {
      const response = await axiosInstance.get("clients?page=1&limit=200");
      setContacts({ isLoading: false, data: response.data.data });
    } catch (error) {
      toast.error(`Opps!, something went wrong${error}`);
      setContacts({ isLoading: false, data: [] });
    }
  };

  const handleContact = (item) => {
    item.imageUrl = "https://cdn-icons-png.flaticon.com/128/3321/3321752.png";
    if (type === "beneficiente") {
      dispatch(updateBeneficiary(item));
    } else if (type === "recipiente") {
      dispatch(updateRecipient(item));
    }
  };
  useEffect(() => {
    setDataAsync();
  }, []);

  return (
    <Dialog open={open} fullWidth={true} maxWidth={"sm"}>
      <DialogTitle>Selecciona un {type}</DialogTitle>
      <DialogContent dividers={true}>
        {contacts.data.map((item, index) => {
          return (
            <div
              className="p-3 flex items-center space-x-4 space-y-1 cursor-pointer hover:bg-green-100 w-full "
              key={index}
              onClick={() => {
                handleContact(item), setOpenSelect(false);
              }}
            >
              <div className="h-14 w-14">
                <img
                  src="https://cdn-icons-png.flaticon.com/128/3321/3321752.png"
                  className="rounded-full"
                />
              </div>
              <div className="flex flex-col">
                {/* Name */}
                <span className="font-bold">{item.name}</span>
                {/* Address */}
                <span className="text-sm">
                  Direccion: {item.addresses[0].address1}
                </span>
                {/* Phone */}
                <span className="text-sm">Tel: {item.contacts[0].number}</span>
              </div>
            </div>
          );
        })}
      </DialogContent>
      <DialogActions>
        <Button onClick={() => setOpenSelect(false)}>Cerrar</Button>
      </DialogActions>
    </Dialog>
  );
}
