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
import useAxios from "../../Axios/Axios";

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
  const [categories, setCategories] = useState([]);

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
  }, [categories]);

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
              <h2 className="text-xl font-bold">Formulario de SubCategoria </h2>

              <FormControl>
                <InputLabel size="small" htmlFor="outlined-adornment-name">
                  Nombre de la subcategoria
                </InputLabel>
                <OutlinedInput
                  {...register("name", {
                    required: true,
                  })}
                  id="outlined-adornment-name"
                  label="Nombre de la subcategoria"
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
                <FormControl className="w-full">
                  <TextField
                    select
                    label="Tipo de categoria"
                    id="trinity"
                    {...register("categoryId", { required: true })}
                    error={errors.categoryId && "value"}
                    helperText={
                      errors.categoryId &&
                      `El campo 'Tipo de categoria' es requerido`
                    }
                  >
                    {categories.map((item) => (
                      <MenuItem key={item.id} value={item.id}>
                        {item.name}
                      </MenuItem>
                    ))}
                  </TextField>
                </FormControl>
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
