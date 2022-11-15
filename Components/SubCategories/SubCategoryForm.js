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
import useAxios from "../../Axios/Axios";
import { CategoryRounded } from "@mui/icons-material";

export default function SubCategoryForm({
  open,
  setOpen,
  data,
  onSave,
  setFile,
}) {
  const {
    handleSubmit,
    register,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: data,
  });

  const { axiosInstance } = useAxios();
  const [categories, setCategories] = useState([""]);

  const [images, setImages] = useState([]);

  const setCategoriesAsync = async () => {
    try {
      const response = await axiosInstance.get("/categories?page=1&limit=20");
      //   setCategoriesId = response.categoryId;
      setCategories(response.data.data);
    } catch (error) {
      toast.error(`Opps!, algo ha ocurrido ${error} cateogires id `);
    }
  };
  useEffect(() => {
    setCategoriesAsync();
  }, [data]);

  const onSubmit = async (data) => {
    const dataParsed = {
      ...data,
    };
    await onSave(dataParsed);
    setOpen(false);
  };

  useEffect(() => {
    reset(data);
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
              className="flex flex-col p-8 space-y-5 px-10"
            >
              <div>
                <div className="flex items-center mb-2">
                  <div className="bg-neutral-100 rounded-full p-2">
                    <CategoryRounded className="text-green-400" />
                  </div>
                  <h2 className="text-xl font-bold ml-2">Subcategorias </h2>
                </div>
                <span className="text-sm text-black text-opacity-50">
                  Crea o edita tus subcategorias y manten tu empresa organizada.
                </span>
                <Divider className="mt-4" />
              </div>
              <FormControl fullWidth>
                <TextField
                  {...register("name", { required: true })}
                  label="Nombre"
                  InputLabelProps={{ shrink: true }}
                  placeholder="subcategoria"
                  className="input-rounded"
                  variant="outlined"
                  error={errors.name}
                  helperText={errors.name && `El campo no es valido`}
                />
              </FormControl>

              <FormControl fullWidth>
                <TextField
                  select
                  {...register("categoryId", { required: true })}
                  label="Categoria"
                  placeholder="selecciona una categoria ..."
                  className="input-rounded"
                  variant="outlined"
                  error={errors.categoryId}
                  helperText={errors.categoryId && `El campo no es valido`}
                >
                  {categories.map((item, index) => (
                    <MenuItem key={index} value={item.id}>
                      {item.name}
                    </MenuItem>
                  ))}
                </TextField>
              </FormControl>
              <TextField
                {...register("description")}
                className="input-rounded"
                minRows={4}
                multiline
                label="Descripcion"
                placeholder="subcategoria con una nueva descripcion"
                InputLabelProps={{
                  shrink: true,
                }}
                error={errors.description}
                helpertext={errors.description && "La descripcion es requerida"}
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
