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
  Autocomplete,
  MenuItem,
  FormHelperText,
} from "@mui/material";
import { useEffect, useRef, useState } from "react";
import IconButton from "@mui/material/IconButton";
import { getDownloadURL, getStorage, ref, uploadBytes } from "firebase/storage";
import ImagePoster from "../Globals/ImageHandler";
import PhotoCamera from "@mui/icons-material/PhotoCamera";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import Alert from "../Globals/Alert";

export default function CategoryForm({ open, setOpen, data, onSave, setFile }) {
  const {
    handleSubmit,
    register,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: data,
  });

  const [images, setImages] = useState([]);

  const chip = [
    { name: "Ana", src: "/static/images/avatar/1.jpg" },
    { name: "TrapKing", src: "/static/images/avatar/1.jpg" },
    { name: "Eldiablo", src: "/static/images/avatar/1.jpg" },
    { name: "Yagaloski", src: "/static/images/avatar/1.jpg" },
    { name: "Pibull", src: "/static/images/avatar/1.jpg" },
    { name: "Junior", src: "/static/images/avatar/1.jpg" },
  ];

  const onSubmit = async (data) => {
    const dataParsed = {
      ...data,
    };
    await onSave(dataParsed);
    setOpen(false);
  };

  useEffect(() => {
    reset(data);
    setImages([data && data.imageUrl]);
  }, [data]);

  return (
    <>
      <div className="w-full h-full">
        <div className=" rounded-2xl">
          <Dialog
            open={open}
            onClose={() => setOpen(false)}
            fullWidth
            maxWidth={"sm"}
          >
            <form
              onSubmit={handleSubmit(onSubmit)}
              className="flex flex-col p-8 space-y-5 px-10"
            >
              <h2 className="text-xl font-bold">Formulario de Categoria </h2>

              <FormControl>
                <InputLabel size="small" htmlFor="outlined-adornment-name">
                  Nombre de la categoria
                </InputLabel>
                <OutlinedInput
                  {...register("name", {
                    required: true,
                  })}
                  id="outlined-adornment-name"
                  label="Nombre de la categoria"
                  size="small"
                  error={errors.name && "value"}
                  helperText={errors.name && `El campo 'nombre' es requerido`}
                  className="rounded-xl"
                  variant="outlined"
                  startAdornment={
                    <InputAdornment position="start">
                      <CategoryIcon />
                    </InputAdornment>
                  }
                />
              </FormControl>
              <FormControl>
                <Autocomplete
                  onChange={{ ...register("supliers") }}
                  multiple
                  options={chip}
                  freeSolo
                  getOptionLabel={(chip) => chip.name}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      variant="standard"
                      label="Proveedores"
                    />
                  )}
                />
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
                  type="button"
                  color="secondary"
                  onClick={() => setOpen(false)}
                  size="medium"
                  className=" w-28 text-green-600 bg-white hover:bg-white shadow-none hover:shadow-none "
                >
                  Cancel
                </Button>
                <Button
                  variant="contained"
                  type="submit"
                  color="secondary"
                  size="medium"
                  className=" w-28 bg-green-600 text-white rounded-2xl"
                >
                  Salvar
                </Button>
              </div>
            </form>
          </Dialog>
        </div>
      </div>
    </>
  );
}
