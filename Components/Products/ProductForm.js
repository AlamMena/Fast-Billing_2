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
import { Controller, useForm } from "react-hook-form";
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
    control,
    formState: { errors },
  } = useForm({
    defaultValues: product,
  });

  const [isLoading, setIsLoading] = useState(false);
  const [categories, setCategories] = useState([]);
  const [subCategories, setSubcategories] = useState([]);
  const [warehouses, setWarehouses] = useState([]);
  const [brands, setBrands] = useState([]);
  const [images, setImages] = useState([]);

  const { axiosInstance } = useAxios();
  const toastId = useRef(null);

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
    alert(JSON.stringify(data));
    try {
      toastId.current = toast("Cargando ...", {
        type: toast.TYPE.LOADING,
      });

      data.id
        ? await axiosInstance.put("/product", {
            ...data,
            images: [],
            abName: "",
          })
        : await axiosInstance.post("/product", {
            ...data,
            images: [],
            abName: "",
          });

      toast.update(toastId.current, {
        type: toast.TYPE.SUCCESS,
        autoClose: 5000,
        render: "Producto creado exitosamente!",
      });

      router.push("/productos");
    } catch (error) {
      toast.update(toastId.current, {
        type: toast.TYPE.ERROR,
        autoClose: 5000,
        render:
          error.response.data.status === 400
            ? error.response.data.message
            : "Opps, Ha ocurrido un error!",
      });
    }
    setIsLoading(false);
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

  const getCategoriesAsync = async () => {
    const queryFilters = `page=${1}&limit=${100}&value=${""}`;
    const { data: apiResponse } = await axiosInstance.get(
      `categories?${queryFilters}`
    );
    setCategories(apiResponse.data);
  };
  const getBrandsAsync = async () => {
    const queryFilters = `page=${1}&limit=${100}&value=${""}`;
    const { data: apiResponse } = await axiosInstance.get(
      `brands?${queryFilters}`
    );
    setBrands(apiResponse.data);
  };
  const getSubcategoriesAsync = async () => {
    const queryFilters = `page=${1}&limit=${100}&value=${""}`;
    const { data: apiResponse } = await axiosInstance.get(
      `subcategories?${queryFilters}`
    );
    setSubcategories(apiResponse.data);
  };
  const getWarehousesAsync = async () => {
    const queryFilters = `page=${1}&limit=${100}&value=${""}`;
    const { data: apiResponse } = await axiosInstance.get(
      `warehouses?${queryFilters}`
    );
    setWarehouses(apiResponse.data);
  };

  useEffect(() => {
    getCategoriesAsync();
    getSubcategoriesAsync();
    getBrandsAsync();
    getWarehousesAsync();
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
            placeholder="Producto - 001"
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
            placeholder="Descripcion producto 001"
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
          <div className="space-y-6 rounded-xl h-min">
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
        </div>

        <div className="col-span-12 lg:col-span-4 space-y-4">
          <div className=" p-8 space-y-6 shadow-md rounded-xl h-min">
            <div className="flex flex-col mx-2 space-y-1">
              <span className="font-bold tracking-wider">
                Informacion detallada
              </span>
              <span className="text-sm text-neutral-500">
                Ingresa datos especificos de almacen.
              </span>
            </div>
            <FormControlLabel
              className="text-xs"
              control={<Switch defaultChecked />}
              label="disponible"
            />
            <TextField
              {...register("barCode")}
              className="input-rounded"
              label="Codigo"
              placeholder="P001-C001"
              fullWidth
            />
            <Controller
              control={control}
              name="categoryId"
              render={({ field }) => (
                <FormControl fullWidth>
                  <InputLabel id="categories-label-id">Categorias</InputLabel>
                  <Select
                    {...field}
                    fullWidth
                    className="rounded-xl text-md"
                    labelId="categories-label-id"
                    label="Categorias"
                  >
                    {categories.length > 0 &&
                      categories.map((cat) => {
                        return <MenuItem value={cat.id}>{cat.name}</MenuItem>;
                      })}
                  </Select>
                </FormControl>
              )}
            />
            <Controller
              control={control}
              name="subCategoryId"
              render={({ field }) => (
                <FormControl fullWidth>
                  <InputLabel id="subcategories-label-id">
                    Subcategorias
                  </InputLabel>
                  <Select
                    {...field}
                    fullWidth
                    className="rounded-xl text-md"
                    labelId="subcategories-label-id"
                    label="Subcategorias"
                  >
                    {subCategories.length > 0 &&
                      subCategories.map((sub) => {
                        return <MenuItem value={sub.id}>{sub.name}</MenuItem>;
                      })}
                  </Select>
                </FormControl>
              )}
            />
            <Controller
              control={control}
              name="brandId"
              render={({ field }) => (
                <FormControl fullWidth>
                  <InputLabel id="brands-label-id">Marcas</InputLabel>
                  <Select
                    {...field}
                    labelId="brands-label-id"
                    label="Marcas"
                    fullWidth
                    className="rounded-xl text-md"
                  >
                    {brands.length > 0 &&
                      brands.map((bra) => {
                        return <MenuItem value={bra.id}>{bra.name}</MenuItem>;
                      })}
                  </Select>
                </FormControl>
              )}
            />
            {/* <FormControl className="w-full">
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
            </FormControl> */}
            {/* <Autocomplete
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
            /> */}
          </div>
          <div className=" p-8 space-y-6 shadow-md rounded-xl h-min">
            <div className="flex flex-col mx-2 space-y-1">
              <span className="font-bold tracking-wider">
                Informacion detallada
              </span>
              <span className="text-sm text-neutral-500">
                Ingresa datos especificos de tus productos.
              </span>
            </div>

            <Controller
              control={control}
              name="warehouseId"
              render={({ field }) => (
                <FormControl fullWidth>
                  <InputLabel id="warehouse-label-id">Almacenes</InputLabel>
                  <Select
                    {...field}
                    fullWidth
                    className="rounded-xl text-md"
                    labelId="warehouse-label-id"
                    label="Almacenes"
                  >
                    {warehouses.length > 0 &&
                      warehouses.map((war) => {
                        return <MenuItem value={war.id}>{war.name}</MenuItem>;
                      })}
                  </Select>
                </FormControl>
              )}
            />

            <TextField
              {...register("stock")}
              className="input-rounded"
              label="Cantidad de productos"
              placeholder="120"
              InputLabelProps={{
                shrink: true,
              }}
              fullWidth
            />
            {/* <FormControl className="w-full">
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
            </FormControl> */}
            {/* <Autocomplete
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
            /> */}
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
