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
  TextareaAutosize,
  FormControlLabel,
  Switch,
  Collapse,
  Fade,
} from "@mui/material";
import PhotoCamera from "@mui/icons-material/PhotoCamera";
import ImagePoster from "../Globals/ImagePoster";
import { useEffect, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import Alert from "../Globals/Alert";
import {
  AttachMoneyRounded,
  MoneyRounded,
  PercentOutlined,
  RemoveCircleOutline,
} from "@mui/icons-material";
import { TransitionGroup } from "react-transition-group";

export default function ProductsForm({ product }) {
  const {
    handleSubmit,
    register,
    reset,
    getValues,
    formState: { errors },
  } = useForm({
    defaultValues: product,
  });

  const [categories, setCategories] = useState();
  const [category, setCategory] = useState();
  const [images, setImages] = useState([]);
  const [file, setFile] = useState();

  const postImage = async () => {
    const storage = getStorage(app);
    const storageRef = ref(storage, "products");
    const response = await uploadBytes(storageRef, file);
    const url = await getDownloadURL(response.ref);
    return url;
  };

  const handlePriceChange = (e) => {
    const currentProduct = getValues();
    const { price, cost } = currentProduct;
    let marginBenefit;
    if (e.target.id === "input-price") {
      marginBenefit = ((e.target.value - cost) / e.target.value) * 100;
      reset({ ...currentProduct, price: e.target.value, marginBenefit });
    }
    if (e.target.id === "input-cost") {
      marginBenefit = ((price - e.target.value) / price) * 100;
      reset({ ...currentProduct, cost: e.target.value, marginBenefit });
    }
  };
  const handleImageChange = (e) => {
    if (e.target.files[0]) {
      const url = URL.createObjectURL(e.target.files[0]);
      setImages([...images, url]);
    }
  };

  const onSubmit = (data) => {
    alert(JSON.stringify(data));
  };

  useEffect(() => {
    reset(product);
  }, [product]);

  useEffect(() => {
    setCategories([
      { name: "Food", src: "/static/images/avatar/1.jpg" },
      { name: "Games", src: "/static/images/avatar/1.jpg" },
      { name: "Electronics", src: "/static/images/avatar/1.jpg" },
    ]);
  }, []);

  return (
    <form className="flex" onSubmit={handleSubmit(onSubmit)}>
      <div className="grid grid-cols-12 gap-x-8 mx-4 mb-16">
        <div className="shadow-md col-span-12 lg:col-span-8 p-8 space-y-6 rounded-xl h-min">
          <div className="flex flex-col mx-2 space-y-1">
            <span className="font-bold tracking-wider">
              Informacion general
            </span>
            <span className="text-sm text-neutral-500">
              Ingresa los datos basicos de tu producto.
            </span>
          </div>
          <TextField
            {...register("name", { required: true })}
            className="input-rounded"
            label="Nombre *"
            fullWidth
            error={errors.name}
            helperText={errors.name && "El nombre es requerido"}
          ></TextField>
          <TextField
            {...register("description")}
            className="input-rounded w-full outline-2 outline-slate-500"
            minRows={4}
            multiline
            label="Descripcion"
            error={errors.description}
            helperText={errors.description && "La descripcion es requerida"}
            fullWidth
          />
          {/* image list */}
          <div className="w-full relative h-full outline-dashed outline-1 outline-neutral-300 rounded-xl bg-neutral-50 flex justify-center flex-wrap items-center space-x-4 p-8">
            <Button className="absolute inset-0 z-50" component="label">
              <input
                onChange={handleImageChange}
                hidden
                accept="image/*"
                multiple
                type="file"
              ></input>
            </Button>
            <div className="z-0">
              <video className=" w-48 h-48 rounded-3xl" loop autoPlay>
                <source
                  src="https://cdn.dribbble.com/users/7831180/screenshots/15661340/media/84484ce85971eb2efad0f36deeae6020.mp4"
                  type="video/mp4"
                />
                Your browser does not support the video tag.
              </video>
            </div>
            <div className="flex flex-col mx-2">
              <span className="font-bold tracking-wider">
                Drop or Select file
              </span>
              <span className="text-sm text-neutral-500">
                Drop files here or click browse thorough your machine
              </span>
            </div>
          </div>
          <div className="flex">
            <TransitionGroup className="flex">
              {images.map((item) => (
                <Fade>
                  <div className="transition-all opacity-40 relative my-4 mx-2">
                    <RemoveCircleOutline
                      onClick={(e) => {
                        setImages(images.filter((url) => url !== item));
                      }}
                      className="absolute right-0 text-neutral-300 text-md hover:text-neutral-500 transition-all duration-200 cursor-pointer"
                    />
                    <img src={item} className=" w-20 h-20 rounded-2xl" />
                  </div>
                </Fade>
              ))}
            </TransitionGroup>
          </div>
          <div className="flex justify-end space-x-4">
            <Button
              onClick={() => setImages([])}
              className=" z-auto rounded-xl py-2 capitalize "
              size="small"
            >
              remove all
            </Button>
            <Button
              className=" shadow-lg text-white z-auto rounded-xl py-2 bg-green-600 hover:bg-green-800 capitalize"
              variant="contained"
              size="small"
            >
              Upload files
            </Button>
          </div>
        </div>

        <div className="col-span-12 lg:col-span-4 space-y-4">
          <div className=" p-8 space-y-6 shadow-md rounded-xl h-min">
            <div className="flex flex-col mx-2 space-y-1">
              <span className="font-bold tracking-wider">
                Informacion detallada
              </span>
              <span className="text-sm text-neutral-500">
                Ingresa datos especificos de tus productos.
              </span>
            </div>
            <FormControlLabel
              className="text-xs"
              control={<Switch defaultChecked />}
              label="disponible"
            />
            <TextField
              {...register("code")}
              className="input-rounded"
              label="Codigo"
              placeholder="P001-C001"
              fullWidth
            />
            <FormControl className="w-full">
              <InputLabel id="select-brand">Marcas</InputLabel>
              <Select
                labelId="select-brand"
                id="select-brand"
                value={1}
                // onChange={(params) => setIdentificationType(params.target.value)}
                size="medium"
                className="rounded-xl text-md"
                label="Marcas"
              >
                <MenuItem value={1}>
                  <div className="flex items-center">
                    <img
                      src="https://cdn-icons-png.flaticon.com/128/7080/7080979.png"
                      className="w-8 h-8"
                    ></img>
                    <span className="mx-2">Tesla</span>
                  </div>
                </MenuItem>
              </Select>
            </FormControl>
            <Autocomplete
              multiple
              options={categories}
              freeSolo
              getOptionLabel={(chip) => chip.name}
              renderInput={(params) => (
                <TextField
                  {...params}
                  helperText="Busca las categorias que mas se asemjan a tus productos."
                  className="input-rounded"
                  label="Categorias"
                />
              )}
            />
          </div>

          <div className=" p-8 space-y-6 shadow-md rounded-xl h-min">
            <div className="flex flex-col mx-2 space-y-1">
              <span className="font-bold tracking-wider">
                Informacion monetaria
              </span>
              <span className="text-sm text-neutral-500">
                Ingresa los datos monetarios y los beneficios que desea para su
                producto.
              </span>
            </div>

            <TextField
              {...register("cost", { required: true })}
              className="input-rounded"
              type="number"
              id="input-cost"
              error={errors.cost}
              helperText={errors.cost && "El costo no es valido"}
              onChange={handlePriceChange}
              label="Costo *"
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <AttachMoneyRounded
                      className={`${errors.cost && "text-red-500"} `}
                    />
                  </InputAdornment>
                ),
              }}
              placeholder="0.00"
              fullWidth
            />
            <TextField
              {...register("price", { required: true })}
              className="input-rounded"
              type="number"
              id="input-price"
              label="Precio *"
              error={errors.price}
              helperText={errors.price && "El precio no es valido"}
              onChange={handlePriceChange}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <AttachMoneyRounded
                      className={`${errors.price && "text-red-500"} `}
                    />
                  </InputAdornment>
                ),
              }}
              placeholder="0.00"
              fullWidth
            />
            <TextField
              {...register("marginBenefit")}
              className="input-rounded"
              type="number"
              disabled
              label="Margen de beneficio"
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <PercentOutlined />
                  </InputAdornment>
                ),
              }}
              placeholder="0.00"
              fullWidth
            />
          </div>
          <div className="flex justify-center">
            <Button
              className=" w-full max-w-xl shadow-lg text-white z-auto rounded-xl py-2 bg-green-600 hover:bg-green-700"
              size="medium"
              type="submit"
              variant="contained"
            >
              Guardar
            </Button>
          </div>
        </div>
      </div>
    </form>
  );
}
