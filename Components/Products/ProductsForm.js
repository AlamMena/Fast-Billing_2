import { AttachMoney, LocalOffer } from "@mui/icons-material";
import FactCheckIcon from "@mui/icons-material/FactCheck";
import DescriptionIcon from "@mui/icons-material/Description";
import IconButton from "@mui/material/IconButton";
import CoPresentIcon from "@mui/icons-material/CoPresent";
import { getDownloadURL, getStorage, ref, uploadBytes } from "firebase/storage";

import {
  Button,
  Dialog,
  Input,
  TextField,
  Autocomplete,
  InputOutlined,
  OutlinedInput,
  InputAdornment,
  FormControl,
  InputLabel,
  Select,
  Chip,
  Avatar,
  MenuItem,
  FormHelperText,
} from "@mui/material";
import PhotoCamera from "@mui/icons-material/PhotoCamera";
import ImagePoster from "../Globals/ImagePoster";
import { useEffect, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import Alert from "../Globals/Alert";

export default function ProductsForm({ open, setOpen, data }) {
  const { handleSubmit, register, reset } = useForm({
    defaultValues: data,
  });

  const [isLoading, setIsLoading] = useState(false);
  const [images, setImages] = useState([]);
  const [file, setFile] = useState();

  const postImage = async () => {
    const storage = getStorage(app);
    const storageRef = ref(storage, "products");
    const response = await uploadBytes(storageRef, file);
    const url = await getDownloadURL(response.ref);
    return url;
  };
  const chip = [
    { name: "Ana", src: "/static/images/avatar/1.jpg" },
    { name: "TrapKing", src: "/static/images/avatar/1.jpg" },
    { name: "Eldiablo", src: "/static/images/avatar/1.jpg" },
    { name: "Yagaloski", src: "/static/images/avatar/1.jpg" },
    { name: "Pibull", src: "/static/images/avatar/1.jpg" },
    { name: "Junior", src: "/static/images/avatar/1.jpg" },
  ];

  const onSubmit = async (data) => {
    console.log(data);
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
      {" "}
      <div className="w-full h-full">
        <div className=" rounded-2xl">
          <Dialog open={open} onClose={() => setOpen(false)}>
            <form
              onSubmit={handleSubmit(onSubmit)}
              className="flex flex-col p-8 space-y-6 px-10"
            >
              <h2 className="text-xl font-bold">Formulario de Productos </h2>

              <FormControl>
                <InputLabel size="normal" htmlFor="outlined-adornment-name">
                  Nombre del producto
                </InputLabel>
                <OutlinedInput
                  {...register("name")}
                  id="outlined-adornment-name"
                  label="Nombre del producto"
                  size="small"
                  className="rounded-xl"
                  variant="outlined"
                  startAdornment={
                    <InputAdornment position="start">
                      <FactCheckIcon />
                    </InputAdornment>
                  }
                />
              </FormControl>
              <FormControl>
                <InputLabel size="small" htmlFor="outlined-adornment-phone">
                  Description del producto
                </InputLabel>
                <OutlinedInput
                  {...register("description")}
                  id="outlined-adornment-address"
                  label="Descripcion del producto"
                  multiline
                  size="normal"
                  className="rounded-xl text-md"
                  variant="outlined"
                  startAdornment={
                    <InputAdornment position="start">
                      <DescriptionIcon />
                    </InputAdornment>
                  }
                />
              </FormControl>
              <div className="flex w-full space-x-4 items-center">
                <FormControl>
                  <InputLabel size="normal" htmlFor="outlined-adornment-name">
                    Precio
                  </InputLabel>
                  <OutlinedInput
                    {...register("price")}
                    id="outlined-adornment-name"
                    label="Precio"
                    size="small"
                    type="number"
                    className="rounded-xl"
                    variant="outlined"
                    startAdornment={
                      <InputAdornment position="start">
                        <AttachMoney />
                      </InputAdornment>
                    }
                  />
                </FormControl>
                <FormControl>
                  <InputLabel size="normal" htmlFor="outlined-adornment-name">
                    Costo{" "}
                  </InputLabel>
                  <OutlinedInput
                    {...register("cost")}
                    id="outlined-adornment-name"
                    label="Costo"
                    size="small"
                    type="number"
                    className="rounded-xl"
                    variant="outlined"
                    startAdornment={
                      <InputAdornment position="start">
                        <LocalOffer />
                      </InputAdornment>
                    }
                  />
                </FormControl>
              </div>
              <FormControl className="w-full">
                <Autocomplete
                  multiple
                  options={chip}
                  freeSolo
                  getOptionLabel={(chip) => chip.name}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      {...register("supliers")}
                      variant="standard"
                      label="Proveedores"
                    />
                  )}
                />

                {/* <FormHelperText>With label + helper text</FormHelperText> */}
              </FormControl>
              <FormControl>
                <ImagePoster
                  images={images}
                  setImages={setImages}
                  setFile={setFile}
                />
              </FormControl>
              <div className="flex w-full justify-end space-x-4">
                <Button
                  variant="contained"
                  type="submit"
                  color="secondary"
                  size="medium"
                  className=" w-28 bg-green-500 text-white rounded-2xl"
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
