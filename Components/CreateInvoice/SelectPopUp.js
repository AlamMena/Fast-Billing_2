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

export default function SelectPopUp({ open, setOpenSelect, type, contactos }) {
<<<<<<< HEAD
  const [contactsInfo, setContactsInfo] = useState([]);
=======
  const [contactsInfo, setContactsInfo] = useState(contactos);
>>>>>>> main
  const dispatch = useDispatch();

  const handleContact = (item) => {
    if (type === "beneficiente") {
      dispatch(updateBeneficiary(item));
    } else if (type === "recipiente") {
      dispatch(updateRecipient(item));
    }
  };
  useEffect(() => {
    console.log(contactos);
  }, []);

  const contacts = contactos.map((item, index) => {
    return (
      <div
        className="p-3 flex items-center space-x-4 space-y-1 cursor-pointer hover:bg-green-100 w-full "
        key={index}
        onClick={() => {
          handleContact(item), setOpenSelect(false);
        }}
      >
        <div className="h-14 w-14">
          <img src={item.imageUrl} className="rounded-full" />
        </div>
        <div className="flex flex-col">
          {/* Name */}
          <span className="font-bold">{item.name}</span>
          {/* Address */}
          <span className="text-sm">Direccion: {item.address}</span>
          {/* Phone */}
          <span className="text-sm">Tel: {item.phone}</span>
        </div>
      </div>
    );
  });
  return (
    <Dialog open={open} fullWidth={true} maxWidth={"sm"}>
      <DialogTitle>Selecciona un {type}</DialogTitle>
      <DialogContent dividers={true}>{contacts}</DialogContent>
      <DialogActions>
        <Button onClick={() => setOpenSelect(false)}>Cerrar</Button>
      </DialogActions>
    </Dialog>
  );
}
