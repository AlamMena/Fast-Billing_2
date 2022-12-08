import React from "react";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  Button,
  DialogActions,
  FormControl,
  InputLabel,
  Select,
  InputAdornment,
  MenuItem,
  OutlinedInput,
} from "@mui/material";
import { useState } from "react";

export default function PaymentPopUp({ open, setPaymentPopUp }) {
  const [status, setStatus] = useState("cash");

  const handleStatus = (value) => {
    setStatus(value);
    // dispatch(updateStatus(value));
  };

  return (
    <>
      <Dialog open={open} fullWidth={true} maxWidth={"sm"}>
        <DialogTitle>Selecciona un metodo de pago</DialogTitle>
        <DialogContent dividers={true}>
          <FormControl className="flex space-y-3 md:space-y-0  md:flex-row items-center md:space-x-2">
            <FormControl className="w-full">
              <InputLabel size="normal" htmlFor="outlined-adornment-name">
                Metodo de pago
              </InputLabel>
              <Select
                id="outlined-adornment-name"
                label="Metodo de pago"
                size="normal"
                type="number"
                value={status}
                className="rounded-xl"
                variant="outlined"
                startAdornment={
                  <InputAdornment position="start">
                    {/* <AttachMoney /> */}
                  </InputAdornment>
                }
              >
                <MenuItem value={"debit"} onClick={() => handleStatus("debit")}>
                  Tarjeta Debito
                </MenuItem>
                <MenuItem
                  value={"credit"}
                  onClick={() => handleStatus("credit")}
                >
                  Tarjeta Credito
                </MenuItem>
                <MenuItem value={"cash"} onClick={() => handleStatus("cash")}>
                  Efectivo
                </MenuItem>
              </Select>
            </FormControl>
            <FormControl className="w-full">
              <InputLabel size="normal" htmlFor="outlined-adornment-name">
                Monto a pagar
              </InputLabel>
              <OutlinedInput
                type="number"
                id="outlined-adornment-name"
                label="Monto a pagar"
                size="large"
                className="rounded-xl"
                variant="outlined"
                startAdornment={
                  <InputAdornment position="start">
                    {/* <AttachMoney /> */}
                  </InputAdornment>
                }
              />
            </FormControl>
          </FormControl>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setPaymentPopUp(false)}>Cerrar</Button>
          <Button onClick={() => setPaymentPopUp(false)}>Aceptar</Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
