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
} from "@mui/material";
import PhotoCamera from "@mui/icons-material/PhotoCamera";
import { getDownloadURL, getStorage, ref, uploadBytes } from "firebase/storage";
import ImagePoster from "../Globals/ImagePoster";
import { useEffect, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import Alert from "../Globals/Alert";

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
    { name: "TrapKing", src: "/static/images/avatar/1.jpg" },
    { name: "Eldiablo", src: "/static/images/avatar/1.jpg" },
    { name: "Yagaloski", src: "/static/images/avatar/1.jpg" },
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
      <div className=" rounded-2xl">
        <Dialog open={open} onClose={() => setOpen(false)}>
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="flex flex-col p-8 space-y-6 px-10"
          >
            <h2 className="text-xl font-bold">Formulario de Marca </h2>

            <FormControl>
              <InputLabel size="normal" htmlFor="outlined-adornment-name">
                Nombre de la marca
              </InputLabel>
              <OutlinedInput
                {...register("name", {
                  required: true,
                })}
                id="outlined-adornment-name"
                label="Nombre de la marca"
                size="small"
                className="rounded-xl"
                error={errors.name && "value"}
                helperText={errors.name && `El campo 'nombre' es requerido`}
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
            <FormControl className="w-full">
              <Autocomplete
                onChange={(event, newValue) => {
                  setSuplierValue(newValue);
                  handleSuplier();
                }}
                ref={ref}
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
  );
}
