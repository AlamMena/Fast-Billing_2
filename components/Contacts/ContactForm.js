import {
  ArticleOutlined,
  BadgeOutlined,
  BadgeRounded,
  PermIdentityRounded,
  PermIdentitySharp,
  PhoneOutlined,
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
} from "@mui/material";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import Alert from "../Globals/Alert";

export default function ContactForm({ onSave, open, setOpen, data }) {
  const { handleSubmit, register, reset } = useForm({ defaultValues: data });
  const onSubmit = async (data) => {
    // await onSave(data);
    Alert.fire({
      title: <strong>Success!</strong>,
      html: <span>Contact successfully saved</span>,
      icon: "success",
    });
    setTimeout(() => {
      Alert.fire({
        title: <strong>Ops, something went wrong!</strong>,
        icon: "error",
      });
    }, 1000);

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
              <InputLabel
                className="text-sm"
                size="small"
                htmlFor="outlined-adornment-name"
              >
                Full Name
              </InputLabel>
              <OutlinedInput
                {...register("name")}
                id="outlined-adornment-name"
                label="Full Name"
                size="small"
                className="rounded-xl text-sm"
                variant="outlined"
                startAdornment={
                  <InputAdornment position="start">
                    <BadgeOutlined className="text-sm" />
                  </InputAdornment>
                }
              />
            </FormControl>
            <div className="flex w-full space-x-4">
              <FormControl>
                <InputLabel
                  className="text-sm"
                  htmlFor="outlined-adornment-identification"
                >
                  Identification Type
                </InputLabel>
                <OutlinedInput
                  {...register("name")}
                  id="outlined-adornment-identification"
                  label="Identification Type"
                  size="small"
                  className="rounded-xl text-sm"
                  variant="outlined"
                  startAdornment={
                    <InputAdornment position="start">
                      <ArticleOutlined className="text-sm" />
                    </InputAdornment>
                  }
                />
              </FormControl>
              <FormControl>
                <InputLabel
                  className="text-sm"
                  htmlFor="outlined-adornment-identification"
                >
                  No. Identification
                </InputLabel>
                <OutlinedInput
                  {...register("name")}
                  id="standard-basic"
                  label=" No. Identification"
                  size="small"
                  className="rounded-xl text-sm"
                  variant="outlined"
                  startAdornment={
                    <InputAdornment position="start">
                      <ArticleOutlined className="text-sm" />
                    </InputAdornment>
                  }
                />
              </FormControl>
            </div>
            <FormControl>
              <InputLabel
                className="text-sm"
                size="small"
                htmlFor="outlined-adornment-phone"
              >
                Phone Number
              </InputLabel>
              <OutlinedInput
                {...register("name")}
                id="outlined-adornment-phone"
                label="Phone number"
                size="small"
                className="rounded-xl text-sm"
                variant="outlined"
                startAdornment={
                  <InputAdornment position="start">
                    <PhoneOutlined className="text-sm" />
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
