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
  Divider,
} from "@mui/material";
import { useEffect, useRef, useState } from "react";
import IconButton from "@mui/material/IconButton";
import { getDownloadURL, getStorage, ref, uploadBytes } from "firebase/storage";
import ImagePoster from "../Globals/ImageHandler";
import PhotoCamera from "@mui/icons-material/PhotoCamera";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import Alert from "../Globals/Alert";
import { CategoryRounded } from "@mui/icons-material";

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
            PaperProps={{
              style: { borderRadius: 15 },
            }}
            maxWidth="sm"
          >
            <form
              onSubmit={handleSubmit(onSubmit)}
              className="flex flex-col p-8 space-y-6 px-10"
            >
              <div>
                <div className="flex items-center mb-2">
                  <div className="bg-neutral-100 rounded-full p-2">
                    <CategoryRounded className="text-green-400" />
                  </div>
                  <h2 className="text-xl font-bold ml-2">Categorias </h2>
                </div>
                <span className="text-sm text-black text-opacity-50">
                  Crea o edita tus categorias y manten tus productos
                  seccionados.
                </span>
                <Divider className="mt-4" />
              </div>
              <FormControl fullWidth>
                <TextField
                  {...register("name", { required: true })}
                  label="Nombre"
                  placeholder="categoria - 001"
                  InputLabelProps={{ shrink: true }}
                  className="input-rounded"
                  variant="outlined"
                  error={errors.name}
                  helperText={errors.name && `El campo no es valido`}
                />
              </FormControl>
              <TextField
                {...register("description")}
                className="input-rounded w-full outline-2 outline-slate-500"
                minRows={4}
                placeholder="categoria para mis los productos de clase a..."
                multiline
                label="Descripcion"
                InputLabelProps={{
                  shrink: true,
                }}
                fullWidth
              />

              <div className="flex w-full justify-end">
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
                  Guardar
                </Button>
              </div>
            </form>
          </Dialog>
        </div>
      </div>
    </>
  );
}
