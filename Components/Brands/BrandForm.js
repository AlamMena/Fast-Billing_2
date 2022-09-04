import FactCheckIcon from "@mui/icons-material/FactCheck";
import DescriptionIcon from "@mui/icons-material/Description";
import IconButton from "@mui/material/IconButton";
import CoPresentIcon from "@mui/icons-material/CoPresent";
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
  Chip,
  Avatar,
  MenuItem,
  FormHelperText,
} from "@mui/material";
import PhotoCamera from "@mui/icons-material/PhotoCamera";
import { getDownloadURL, getStorage, ref, uploadBytes } from "firebase/storage";
import ImagePoster from "../Globals/ImagePoster";
import { useEffect, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import Alert from "../Globals/Alert";

export default function BrandForm({ onSave, open, setOpen, data }) {
  const { handleSubmit, register, reset } = useForm({
    defaultValues: data,
  });

  const [menuValue, setMenuValue] = useState("");

  const chip = [
    { alt: "Ana", src: "/static/images/avatar/1.jpg" },
    { alt: "TrapKing", src: "/static/images/avatar/1.jpg" },
    { alt: "Eldiablo", src: "/static/images/avatar/1.jpg" },
    { alt: "Yagaloski", src: "/static/images/avatar/1.jpg" },
    { alt: "Pibull", src: "/static/images/avatar/1.jpg" },
    { alt: "Junior", src: "/static/images/avatar/1.jpg" },
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

  const [images, setImages] = useState([]);
  const [file, setFile] = useState();

  const postImage = async () => {
    const storage = getStorage(app);
    const storageRef = ref(storage, "products");
    const response = await uploadBytes(storageRef, file);
    const url = await getDownloadURL(response.ref);
    return url;
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

              <FormControl>
                <InputLabel size="large" htmlFor="outlined-adornment-name">
                  Nombre de la marca
                </InputLabel>
                <OutlinedInput
                  {...register("name")}
                  id="outlined-adornment-name"
                  label="Nombre de la marca"
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
                  Description de la marca
                </InputLabel>
                <OutlinedInput
                  {...register("description")}
                  id="outlined-adornment-address"
                  label="Descripcion de la marca"
                  multiline
                  size="large"
                  className="rounded-xl text-md"
                  variant="outlined"
                  startAdornment={
                    <InputAdornment position="start">
                      <DescriptionIcon />
                    </InputAdornment>
                  }
                />
              </FormControl>
              <FormControl className="w-full">
                <InputLabel id="select-type-contact">Proveedores</InputLabel>
                <Select
                  {...register("provider")}
                  id="select-type-contact"
                  value={menuValue}
                  size="small"
                  className="rounded-xl text-md"
                  label="Proovedores"
                  startAdornment={
                    <InputAdornment position="start">
                      <CoPresentIcon />
                    </InputAdornment>
                  }
                  // onChange={handleChange}
                >
                  {chip.map((item, index) => {
                    return (
                      <MenuItem
                        value={index}
                        className="w-full"
                        key={index}
                        onClick={() => setMenuValue(index)}
                      >
                        <Chip
                          avatar={
                            <Avatar
                              alt="Avatar"
                              src={item.src}
                              position="start"
                            />
                          }
                          label={item.alt}
                          variant="outlined"
                        />
                      </MenuItem>
                    );
                  })}
                </Select>
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
