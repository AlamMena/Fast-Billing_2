import React, { useState, useEffect } from "react";
import {
  Grid,
  FormControl,
  InputLabel,
  OutlinedInput,
  InputAdornment,
  Divider,
  Select,
  MenuItem,
  Button,
  IconButton,
} from "@mui/material";
import { useForm } from "react-hook-form";
import { Delete } from "@mui/icons-material";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import {
  removeItem,
  calculateTotal,
  calculateSubTotal,
  setPrice,
  updateItemPrice,
  updateItemQuantity,
} from "../../Store/InvoiceSlice";

export default function InvoiceDetail({ products }) {
  const { details, discountAmount, taxesAmount, subTotal } = useSelector(
    (state) => state.invoice
  );
  const dispatch = useDispatch();

  const handlePrice = (obj) => {
    dispatch(updateItemPrice(obj));
  };

  const handleQuantity = (obj) => {
    dispatch(updateItemQuantity(obj));
  };

  useEffect(() => {
    dispatch(calculateSubTotal());
  }, [details]);
  useEffect(() => {
    dispatch(calculateTotal());
  }, [taxesAmount, discountAmount, subTotal]);

  return (
    <>
      {details.map((item) => {
        return (
          <div key={item._id} className="py-2 odd:bg-neutral-100 rounded-lg">
            {/* Inputs */}
            <Grid container spacing={1} className="flex p-2">
              {/* Articulo */}
              <Grid item xs={12} md={3}>
                {" "}
                <FormControl className="w-full">
                  <InputLabel size="small" htmlFor="outlined-adornment-name">
                    Articulo
                  </InputLabel>
                  <OutlinedInput
                    label="Articulo"
                    id="outlined-adornment-name"
                    size="small"
                    disabled
                    defaultValue={item.name}
                    className="rounded-xl"
                    variant="outlined"
                  ></OutlinedInput>
                </FormControl>
              </Grid>
              {/* Descripcion */}
              <Grid item xs={12} md={4}>
                <FormControl className="w-full">
                  <InputLabel size="small" htmlFor="outlined-adornment-name">
                    Descripcion
                  </InputLabel>
                  <OutlinedInput
                    id="outlined-adornment-name"
                    label="descripcion"
                    disabled
                    defaultValue={item.description}
                    size="small"
                    className="rounded-xl"
                    variant="outlined"
                  />
                </FormControl>
              </Grid>
              {/* Cantidad */}
              <Grid item xs={12} md={1}>
                {" "}
                <FormControl className="w-full">
                  <InputLabel size="small" htmlFor="outlined-adornment-name">
                    Cantidad
                  </InputLabel>
                  <OutlinedInput
                    id="outlined-adornment-name"
                    label="Cantidad"
                    type="number"
                    onChange={(e) =>
                      handleQuantity({
                        quantity: e.target.value,
                        _id: item._id,
                      })
                    }
                    value={item.quantity}
                    size="small"
                    className="rounded-xl"
                    variant="outlined"
                  />
                </FormControl>
              </Grid>
              {/* Precio */}
              <Grid item xs={12} md={2}>
                {" "}
                <FormControl className="w-full">
                  <InputLabel size="small" htmlFor="outlined-adornment-name">
                    Precio
                  </InputLabel>
                  <OutlinedInput
                    id="outlined-adornment-name"
                    label="Precio"
                    type="number"
                    onChange={(e) =>
                      handlePrice({ value: e.target.value, _id: item._id })
                    }
                    value={item.price}
                    size="small"
                    className="rounded-xl"
                    variant="outlined"
                  />
                </FormControl>
              </Grid>
              {/* Total */}
              <Grid item xs={12} md={1}>
                <FormControl className="w-full">
                  <InputLabel size="small" htmlFor="outlined-adornment-name">
                    Total
                  </InputLabel>
                  <OutlinedInput
                    id="outlined-adornment-name"
                    label="Total"
                    type="number"
                    disabled
                    value={item.total}
                    size="small"
                    className="rounded-xl"
                    variant="outlined"
                  />
                </FormControl>
              </Grid>
              <Grid item xs={12} md={1}>
                <IconButton
                  size="small"
                  className=" text-red-600 hover:bg-red-100"
                  onClick={() => {
                    dispatch(removeItem(item._id));
                  }}
                >
                  <Delete />
                </IconButton>
              </Grid>
            </Grid>
            {/* Delete Icon */}
            {/* <div className="flex justify-end py-5">
              <Button
                startIcon={<Delete />}
                size="small"
                className=" text-red-600 hover:bg-red-100"
                onClick={() => {
                  dispatch(removeItem(item._id));
                }}
              >
                Eliminar
              </Button>
            </div> */}
            {/* <Divider
              orientation="horizontal"
              variant="middle"
              flexItem
            ></Divider> */}
          </div>
        );
      })}
    </>
  );
}
