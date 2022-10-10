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
import ImagePoster, { postImage } from "../Globals/ImageHandler";
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
import useAxios from "../../Axios/Axios";
import { useRouter } from "next/router";

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

  const [isLoading, setIsLoading] = useState(false);
  const [categories, setCategories] = useState();
  const [category, setCategory] = useState();
  const [images, setImages] = useState([]);

  const { axiosInstance } = useAxios();

  const router = useRouter();

  const handlePriceChange = (e) => {
    const currentProduct = getValues();
    const { price, cost } = currentProduct;
    let benefit;
    if (e.target.id === "input-price") {
      benefit = ((e.target.value - cost) / e.target.value) * 100;
      reset({
        ...currentProduct,
        price: e.target.value,
        benefit,
      });
    }
    if (e.target.id === "input-cost") {
      benefit = ((price - e.target.value) / price) * 100;
      reset({
        ...currentProduct,
        cost: e.target.value,
        benefit,
      });
    }
  };
  const handleImageChange = (e) => {
    if (e.target.files[0]) {
      const url = URL.createObjectURL(e.target.files[0]);
      setImages([
        ...images,
        { previewUrl: url, file: e.target.files[0], imageUrl: null },
      ]);
    }
  };

  const onSubmit = async (data) => {
    setIsLoading(true);

    try {
      if (images.length > 0) {
        for (let i = 0; images.length > i; i++) {
          let currentImage = images[i];
          if (currentImage.imageUrl === null) {
            currentImage.imageUrl = await postImage(
              images[i].file,
              `products/${data.name}/${currentImage.name}`
            );
          }
        }
      }
      if (data.id) {
        await toast.promise(
          axiosInstance.put("/product", {
            ...data,
            images: images.map((item) => item.imageUrl),
          }),
          {
            pending: "creando tu producto...",
            success: "Genial!, tu producto ha sido creado",
            error: "Oops!, algo ha ocurrido",
          },
          {
            onOpen: (props) => console.log(props),
          }
        );
      } else {
        await toast.promise(
          axiosInstance.post("/product", {
            ...data,
            images: productImages,
            IsDeleted: false,
          }),
          {
            pending: "Creando tu producto...",
            success: "Proucto actualizado",
            error: "Oops!, algo ha ocurrido",
          }
        );
      }

      router.push("/productos");
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    reset(product);
    setImages(
      product &&
        product.images.map((item) => {
          return { imageUrl: item };
        })
    );
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
            placeholder="my product name"
            fullWidth
            error={errors.name}
            InputLabelProps={{
              shrink: true,
            }}
            helperText={errors.name && "El nombre es requerido"}
          />
          <TextField
            {...register("description")}
            className="input-rounded w-full outline-2 outline-slate-500"
            minRows={4}
            placeholder="describiendo mi producto"
            multiline
            label="Descripcion"
            InputLabelProps={{
              shrink: true,
            }}
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
              {images &&
                images.map((item, index) => (
                  <Fade key={index}>
                    <div className="transition-all opacity-40 relative my-4 mx-2">
                      <RemoveCircleOutline
                        onClick={(e) => {
                          setImages(images.filter((url) => url !== item));
                        }}
                        className="absolute right-0 text-neutral-300 text-md hover:text-neutral-500 transition-all duration-200 cursor-pointer"
                      />
                      <img
                        src={item.imageUrl || item.previewUrl}
                        className=" w-20 h-20 rounded-2xl"
                      />
                    </div>
                  </Fade>
                ))}
            </TransitionGroup>
          </div>
          <div className="flex justify-end space-x-4">
            <Button
              onClick={() => setImagesPreview([])}
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
              InputLabelProps={{
                shrink: true,
              }}
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
              InputLabelProps={{
                shrink: true,
              }}
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
              {...register("benefit")}
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
              disabled={isLoading}
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
