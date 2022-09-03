import {
  ArticleOutlined,
  BadgeOutlined,
  BadgeRounded,
  ContactsOutlined,
  ContactsRounded,
  PermIdentityRounded,
  PermIdentitySharp,
  PhoneOutlined,
  RampRightOutlined,
  RouteOutlined,
} from "@mui/icons-material";
import {
  Button,
  Dialog,
  Input,
  TextField,
  InputOutlined,
  OutlinedInput,
  InputAdornment,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  FormHelperText,
} from "@mui/material";
import { useEffect, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import Alert from "../Globals/Alert";

export default function ContactForm({ onSave, open, setOpen, data }) {
  const { handleSubmit, register, reset } = useForm({ defaultValues: data });
  const toastId = useRef(null);

  const onSubmit = async (data) => {
    // await onSave(data);
    // Alert.fire({
    //   title: <strong>Success!</strong>,
    //   html: <span>Contact successfully saved</span>,
    //   icon: "success",
    // });
    // setTimeout(() => {
    //   Alert.fire({
    //     title: <strong>Ops, something went wrong!</strong>,
    //     icon: "error",
    //   });
    // }, 1000);

    toastId.current = toast("Please wait...", {
      type: toast.TYPE.LOADING,
    });

    setTimeout(() => {
      toast.update(toastId.current, {
        type: toast.TYPE.SUCCESS,
        autoClose: 5000,
        render: "Success",
      });
    }, 2000);

    setOpen(false);
  };

  useEffect(() => {
    reset(data);
  }, [data]);

  return (
    <div className="w-full h-full">
      <div className=" rounded-2xl">
        <Dialog open={open} onClose={() => setOpen(false)}>
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="flex flex-col p-8 space-y-6 px-10"
          >
            <h2 className="text-xl font-bold">Contact Form </h2>

            <FormControl>
              <InputLabel size="small" htmlFor="outlined-adornment-name">
                Full Name
              </InputLabel>
              <OutlinedInput
                {...register("name")}
                id="outlined-adornment-name"
                label="Full Name"
                size="small"
                className="rounded-xl"
                variant="outlined"
                startAdornment={
                  <InputAdornment position="start">
                    <BadgeOutlined />
                  </InputAdornment>
                }
              />
            </FormControl>
            <div className="flex w-full items-center space-x-4">
              {/* <FormControl>
                <InputLabel htmlFor="outlined-adornment-identification'type">
                  Identification Type
                </InputLabel>
                <OutlinedInput
                  {...register("name")}
                  id="outlined-adornment-identification'type"
                  label="Identification Type"
                  size="small"
                  className="rounded-xl"
                  variant="outlined"
                  startAdornment={
                    <InputAdornment position="start">
                      <ArticleOutlined />
                    </InputAdornment>
                  }
                />
              </FormControl> */}
              <FormControl className=" w-52">
                <InputLabel id="select-type-identification">
                  Identification type
                </InputLabel>
                <Select
                  {...register("notificationType")}
                  labelId="select-type-identification"
                  id="select-type-identificationr"
                  value={10}
                  size="small"
                  className="rounded-xl text-md"
                  label="Identification type"
                  startAdornment={
                    <InputAdornment position="start">
                      <ArticleOutlined />
                    </InputAdornment>
                  }
                  // onChange={handleChange}
                >
                  <MenuItem className="text-sm" value={10}>
                    Cedula
                  </MenuItem>
                  <MenuItem value={20}>Pasaporte</MenuItem>
                  <MenuItem value={30}>RNC</MenuItem>
                </Select>
                {/* <FormHelperText>With label + helper text</FormHelperText> */}
              </FormControl>
              <FormControl>
                <InputLabel htmlFor="outlined-adornment-identification">
                  No. Identification
                </InputLabel>
                <OutlinedInput
                  {...register("name")}
                  id="outlined-adornment-identification"
                  label=" No. Identification"
                  size="small"
                  className="rounded-xl text-md"
                  variant="outlined"
                  startAdornment={
                    <InputAdornment position="start">
                      <ArticleOutlined />
                    </InputAdornment>
                  }
                />
              </FormControl>
            </div>
            <FormControl>
              <InputLabel size="small" htmlFor="outlined-adornment-phone">
                Phone Number
              </InputLabel>
              <OutlinedInput
                {...register("name")}
                id="outlined-adornment-phone"
                label="Phone number"
                size="small"
                className="rounded-xl text-md"
                variant="outlined"
                startAdornment={
                  <InputAdornment position="start">
                    <PhoneOutlined />
                  </InputAdornment>
                }
              />
            </FormControl>
            <FormControl className="w-full">
              <InputLabel id="select-type-contact">Contact type</InputLabel>
              <Select
                {...register("notificationType")}
                labelId="select-type-contact"
                id="select-type-contact"
                value={10}
                size="small"
                className="rounded-xl text-md"
                label="Contact type"
                startAdornment={
                  <InputAdornment position="start">
                    <ContactsOutlined />
                  </InputAdornment>
                }
                // onChange={handleChange}
              >
                <MenuItem value={20}>Proveedor</MenuItem>
                <MenuItem value={30}>Cliente</MenuItem>
              </Select>
              {/* <FormHelperText>With label + helper text</FormHelperText> */}
            </FormControl>
            <FormControl>
              <InputLabel size="small" htmlFor="outlined-adornment-phone">
                Address
              </InputLabel>
              <OutlinedInput
                {...register("name")}
                id="outlined-adornment-address"
                label="Address"
                multiline
                size="small"
                className="rounded-xl text-md h-24"
                variant="outlined"
                startAdornment={
                  <InputAdornment position="start">
                    <RampRightOutlined />
                  </InputAdornment>
                }
              />
            </FormControl>
            <div className="flex w-full justify-end space-x-4">
              <Button
                variant="contained"
                type="submit"
                color="secondary"
                size="medium"
                className=" w-28 bg-green-600 text-white rounded-2xl"
              >
                Save
              </Button>
              {/* <Button
                variant="contained"
                type="submit"
                color="secondary"
                size="medium"
                className="w-28 bg-red-600 text-white rounded-2xl"
              >
                Cancel
              </Button> */}
            </div>
          </form>
        </Dialog>
      </div>
    </div>
  );
}
