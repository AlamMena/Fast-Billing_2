import React from "react";
import {
  Grid,
  FormControl,
  InputLabel,
  OutlinedInput,
  InputAdornment,
  Divider,
  Button,
} from "@mui/material";
import { useForm } from "react-hook-form";
import { Delete } from "@mui/icons-material";

export default function InvoiceDetail() {
  const { handleSubmit, register, reset } = useForm({});

  return (
    <div className="py-4">
      {/* Inputs */}
      <Grid container spacing={1} className="flex space-x-0">
        <Grid item xs={12} md={4}>
          {" "}
          <FormControl className="w-full">
            <InputLabel size="small" htmlFor="outlined-adornment-name">
              Articulo
            </InputLabel>
            <OutlinedInput
              {...register("name")}
              id="outlined-adornment-name"
              label="Articulo"
              size="small"
              className="rounded-xl"
              variant="outlined"
            />
          </FormControl>
        </Grid>
        <Grid item xs={12} md={4}>
          <FormControl className="w-full">
            <InputLabel size="small" htmlFor="outlined-adornment-name">
              Descripcion
            </InputLabel>
            <OutlinedInput
              {...register("description")}
              id="outlined-adornment-name"
              label="descripcion"
              size="small"
              className="rounded-xl"
              variant="outlined"
            />
          </FormControl>
        </Grid>
        <Grid item xs={12} md={2}>
          {" "}
          <FormControl className="w-full">
            <InputLabel size="small" htmlFor="outlined-adornment-name">
              Cantidad
            </InputLabel>
            <OutlinedInput
              {...register("quantity")}
              id="outlined-adornment-name"
              label="Cantidad"
              type="number"
              size="small"
              className="rounded-xl"
              variant="outlined"
            />
          </FormControl>
        </Grid>
        <Grid item xs={12} md={1}>
          {" "}
          <FormControl className="w-full">
            <InputLabel size="small" htmlFor="outlined-adornment-name">
              Precio
            </InputLabel>
            <OutlinedInput
              {...register("price")}
              id="outlined-adornment-name"
              label="Precion"
              type="number"
              size="small"
              className="rounded-xl"
              variant="outlined"
            />
          </FormControl>
        </Grid>
        <Grid item xs={12} md={1}>
          {" "}
          <FormControl className="w-full">
            <InputLabel size="small" htmlFor="outlined-adornment-name">
              Total
            </InputLabel>
            <OutlinedInput
              {...register("total")}
              id="outlined-adornment-name"
              label="Total"
              type="number"
              size="small"
              className="rounded-xl"
              variant="outlined"
            />
          </FormControl>
        </Grid>
      </Grid>
      {/* Delete Icon */}
      <div className="flex justify-end py-5">
        <Button startIcon={<Delete />} size="small" className=" text-red-600">
          Eliminar
        </Button>
      </div>
      <Divider orientation="horizontal" variant="middle" flexItem></Divider>
    </div>
  );
}
