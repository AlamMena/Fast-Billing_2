import {
  Dialog,
  DialogContent,
  DialogTitle,
  Button,
  DialogActions,
} from "@mui/material";
import { useDispatch } from "react-redux";
import { addItem } from "../../Store/InvoiceSlice";

export default function SelectProducts({ data, open, setProductPop }) {
  const dispatch = useDispatch();

  const products = data.map((item, index) => {
    return (
      <div
        className="p-3 flex flex-col space-y-1 cursor-pointer hover:bg-green-100 "
        key={index}
        onClick={() => {
          dispatch(addItem(item)), setProductPop(false);
        }}
      >
        {/* Name */}
        <span className="font-bold">{item.name}</span>
        {/* Address */}
        <span className="text-sm">Precio: ${item.price}</span>
        {/* Phone */}
        <span className="text-sm">Descripcion: {item.description}</span>
      </div>
    );
  });
  return (
    <Dialog open={open} fullWidth={true} maxWidth={"sm"}>
      <DialogTitle>Selecciona un producto</DialogTitle>
      <DialogContent dividers={true}>{products}</DialogContent>
      <DialogActions>
        <Button onClick={() => setProductPop(false)}>Cerrar</Button>
      </DialogActions>
    </Dialog>
  );
}
