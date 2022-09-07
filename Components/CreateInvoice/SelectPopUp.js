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

export default function SelectPopUp({ open, setOpenSelect, type, contactos }) {
  const dispatch = useDispatch();

  const handleContact = (item) => {
    if (type === "beneficiente") {
      dispatch(updateBeneficiary(item));
    } else if (type === "recipiente") {
      dispatch(updateRecipient(item));
    }
  };

  const contacts = contactos.map((item, index) => {
    return (
      <div
        className="p-3 flex flex-col space-y-1 cursor-pointer hover:bg-green-100 "
        key={index}
        onClick={() => {
          handleContact(item), setOpenSelect(false);
        }}
      >
        {/* Name */}
        <span className="font-bold">{item.name}</span>
        {/* Address */}
        <span className="text-sm">Direccion: {item.address}</span>
        {/* Phone */}
        <span className="text-sm">Tel: {item.phone}</span>
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
