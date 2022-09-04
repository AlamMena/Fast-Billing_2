import CategoryIcon from "@mui/icons-material/Category";
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

export default function CategoryForm({ open, setOpen, data }) {
  const { handleSubmit, register, reset } = useForm({
    defaultValues: data,
  });

  const onSubmit = async (data) => {
    await onSave(data);
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

    //  toastId.current = toast("Please wait...", {
    //    type: toast.TYPE.LOADING,
    //  });

    //  setTimeout(() => {
    //    toast.update(toastId.current, {
    //      type: toast.TYPE.SUCCESS,
    //      autoClose: 5000,
    //      render: "Success",
    //    });
    //  }, 2000);

    setOpen(false);
  };

  useEffect(() => {
    reset(data);
  }, [data]);

  return (
    <>
      <div className="w-full h-full">
        <div className=" rounded-2xl">
          <Dialog open={open} onClose={() => setOpen(false)}>
            <form
              onSubmit={handleSubmit(onSubmit)}
              className="flex flex-col p-8 space-y-6 px-10"
            >
              <h2 className="text-xl font-bold">Formulario de Marca </h2>

              <FormControl label="">
                <InputLabel size="small" htmlFor="outlined-adornment-name">
                  Nombre de la categoria
                </InputLabel>
                <OutlinedInput
                  {...register("name")}
                  id="outlined-adornment-name"
                  label="Nombre de la categoria"
                  size="large"
                  className="rounded-xl"
                  variant="outlined"
                  startAdornment={
                    <InputAdornment position="start">
                      <CategoryIcon />
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
                  Salvar
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
    </>
  );
}
