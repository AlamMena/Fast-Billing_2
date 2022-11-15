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
  Autocomplete,
  Select,
  Chip,
  Avatar,
  MenuItem,
  FormHelperText,
  Divider,
} from "@mui/material";
import PhotoCamera from "@mui/icons-material/PhotoCamera";
import { getDownloadURL, getStorage, ref, uploadBytes } from "firebase/storage";
import ImagePoster from "../Globals/ImageHandler";
import { useEffect, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import Alert from "../Globals/Alert";
import { MuseumRounded } from "@mui/icons-material";

export default function BrandForm({ onSave, open, setOpen, data, setFile }) {
  const {
    handleSubmit,
    register,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: data,
  });

  const [images, setImages] = useState([]);

  const [suplierValue, setSuplierValue] = useState();

  const handleSuplier = () => {
    register("suplier", { value: suplierValue });
  };

  const chip = [
    { name: "Ana", src: "/static/images/avatar/1.jpg" },
    { name: "Pibull", src: "/static/images/avatar/1.jpg" },
    { name: "Junior", src: "/static/images/avatar/1.jpg" },
  ];

  const onSubmit = async (data) => {
    const dataParsed = {
      IsDeleted: false,
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
    <div className="w-full h-full">
      <div className=" rounded-2xl ">
        <Dialog
          open={open}
          onClose={() => setOpen(false)}
          maxWidth="sm"
          PaperProps={{
            style: { borderRadius: 15 },
          }}
        >
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="flex flex-col p-8 space-y-6 px-10"
          >
            <div>
              <div className="flex items-center mb-2">
                <div className="bg-neutral-100 rounded-full p-2">
                  <MuseumRounded className="text-green-400" />
                </div>
                <h2 className="text-xl font-bold ml-2">Marcas </h2>
              </div>
              <span className="text-sm text-black text-opacity-50">
                Crea o edita tus marcas y manten tus productos seccionados.
              </span>
              <Divider className="mt-4" />
            </div>

            <FormControl fullWidth>
              <TextField
                {...register("name", { required: true })}
                label="Nombre"
                InputLabelProps={{ shrink: true }}
                placeholder="Marca para productos"
                className="input-rounded"
                variant="outlined"
                error={errors.name}
                helperText={errors.name && `El campo no es valido`}
              />
            </FormControl>
            <FormControl>
              <TextField
                {...register("description", { required: true })}
                label="Descripcion"
                placeholder="marca principal de mis productos ..."
                InputLabelProps={{ shrink: true }}
                minRows={3}
                multiline
                className="input-rounded"
                variant="outlined"
                error={errors.description}
                helperText={errors.description && `El campo no es valido`}
              />
            </FormControl>

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
  );
}
