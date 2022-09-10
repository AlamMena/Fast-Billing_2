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
} from "../../Store/InvoiceSlice";

export default function InvoiceDetail({ products }) {
  const { handleSubmit, register, reset } = useForm({});
  const [productItem, setProductItem] = useState("");

  const { details, discountAmount, taxesAmount, subTotal } = useSelector(
    (state) => state.invoice
  );
  const dispatch = useDispatch();

  const handlePrice = (e, id) => {
    const obj = { value: e, id: id };
    dispatch(updateItemPrice(obj));
  };

  // useEffect(() => {
  //   dispatch(calculateSubTotal());
  // }, [details]);
  // useEffect(() => {
  //   dispatch(calculateTotal());
  // }, [taxesAmount, discountAmount, subTotal]);

  return (
    <>
      {details.map((item, index) => {
        return (
          <div key={index} className="py-4">
            {/* Inputs */}
            <Grid container spacing={1} className="flex space-x-0">
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
                  >
                    {/* {products.data.map((item, index) => {
                      return (
                        <MenuItem
                          key={index}
                          value={index}
                          className="w-full"
                          onClick={() => {
                            setProductItem(index);
                          }}
                        >
                          {item.name}
                        </MenuItem>
                      );
                        })} */}
                  </OutlinedInput>
                </FormControl>
              </Grid>
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
              <Grid item xs={12} md={1}>
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
                    defaultValue={item.quantity}
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
                    Precio
                  </InputLabel>
                  <OutlinedInput
                    id="outlined-adornment-name"
                    label="Precio"
                    type="number"
                    onChange={(e) => handlePrice(e.target.value, item._id)}
                    defaultValue={item.price}
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
                    Total
                  </InputLabel>
                  <OutlinedInput
                    {...register("total")}
                    id="outlined-adornment-name"
                    label="Total"
                    type="number"
                    disabled
                    defaultValue={item.total}
                    size="small"
                    className="rounded-xl"
                    variant="outlined"
                  />
                </FormControl>
              </Grid>
            </Grid>
            {/* Delete Icon */}
            <div className="flex justify-end py-5">
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
            </div>
            <Divider
              orientation="horizontal"
              variant="middle"
              flexItem
            ></Divider>
          </div>
        );
      })}
    </>
  );
}
