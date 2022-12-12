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
  Inventory2Rounded,
  MoneyRounded,
  PercentOutlined,
  RemoveCircleOutline,
} from "@mui/icons-material";
import { TransitionGroup } from "react-transition-group";
import useAxios from "../../Axios/Axios";
import { useRouter } from "next/router";
import { debounce } from "../../utils/methods";
import PageHeader from "../Globals/PageHeader";
export default function ProductsForm({ product }) {
  const {
    handleSubmit,
    register,
    setValue,
    reset,
    getValues,
    control,
    formState: { errors },
  } = useForm({
    defaultValues: {
      ...product,
      category: { id: 0, name: "" },
      subcategory: { id: 0, name: "" },
      brand: { id: 0, name: "" },
      warehouse: { id: 0, name: "" },
    },
  });

  const [isLoading, setIsLoading] = useState(false);
  const [categories, setCategories] = useState([]);
  const [subCategories, setSubcategories] = useState([]);
  const [warehouses, setWarehouses] = useState([]);
  const [brands, setBrands] = useState([]);
  const [images, setImages] = useState([]);

  // selected categories

  const { axiosInstance } = useAxios();
  const toastId = useRef(null);

  useEffect(() => {
    if (product) {
      reset({
        ...product,
        category: {
          id: product.categoryId,
          name: product.categoryName ?? "",
        },
        subcategory: {
          id: product.subcategoryId,
          name: product.subCategoryName ?? "",
        },
        brand: { id: product.brandId, name: product.brandName ?? "" },
        warehouse: {
          id: product.warehouseId,
          name: product.warehouseName ?? "",
        },
      });
    }
  }, [product]);

  const router = useRouter();

  const handlePriceChange = (e) => {
    const currentProduct = getValues();
    const { price, cost } = currentProduct;
    let marginBenefit;
    if (e.target.id === "input-price") {
      marginBenefit = parseFloat(
        ((e.target.value - cost) / e.target.value) * 100
      ).toFixed(2);
      reset({
        ...currentProduct,
        price: e.target.value,
        marginBenefit,
      });
    }
    if (e.target.id === "input-cost") {
      marginBenefit = parseFloat(
        ((price - e.target.value) / price) * 100
      ).toFixed(2);
      reset({
        ...currentProduct,
        cost: e.target.value,
        marginBenefit,
      });
    }
  };

  const formatData = (data) => {
    return {
      ...data,
      categoryId: data.category.id,
      subcategoryId: data.subcategory.id,
      warehouseId: data.warehouse.id === 0 ? 1 : data.warehouse.id,
      brandId: data.brand.id,
      images: [],
      abName: "",
    };
  };
  const onSubmit = async (data) => {
    setIsLoading(true);
    try {
      toastId.current = toast("Cargando ...", {
        type: toast.TYPE.LOADING,
      });
      const formatedData = formatData(data);
      data.id
        ? await axiosInstance.put("/product", formatedData)
        : await axiosInstance.post("/product", formatedData);

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

  const getCategoriesAsync = async (filter) => {
    const queryFilters = `page=${1}&limit=${100}&value=${filter}`;
    const { data: apiResponse } = await axiosInstance.get(
      `categories?${queryFilters}`
    );
    setCategories(apiResponse.data);
  };
  const handleSearchCategories = debounce((e) =>
    getCategoriesAsync(e.target.value)
  );
  const getBrandsAsync = async (filter) => {
    const queryFilters = `page=${1}&limit=${100}&value=${filter}`;
    const { data: apiResponse } = await axiosInstance.get(
      `brands?${queryFilters}`
    );
    setBrands(apiResponse.data);
  };
  const handleSearchBrands = debounce((e) => getBrandsAsync(e.target.value));

  const getSubcategoriesAsync = async (filter) => {
    const queryFilters = `page=${1}&limit=${100}&value=${filter}`;
    const { data: apiResponse } = await axiosInstance.get(
      `subcategories?${queryFilters}`
    );
    setSubcategories(apiResponse.data);
  };
  const handleSearchSubcategories = debounce((e) =>
    getSubcategoriesAsync(e.target.value)
  );
  const getWarehousesAsync = async (filter) => {
    const queryFilters = `page=${1}&limit=${100}&value=${filter}`;
    const { data: apiResponse } = await axiosInstance.get(
      `warehouses?${queryFilters}`
    );
    setWarehouses(apiResponse.data);
  };
  const handleSearchWarehouses = debounce((e) =>
    getWarehousesAsync(e.target.value)
  );
  const locationRoutes = [
    {
      text: "Inicio",
      link: "/",
    },
    {
      text: "Productos",
      link: "/productos",
    },
  ];
  return (
    <form className="flex" onSubmit={handleSubmit(onSubmit)}>
      <div className="flex flex-col">
        <div>
          <PageHeader
            header="Productos"
            locationRoutes={locationRoutes}
            Icon={<Inventory2Rounded className="text-green-400" />}
          />
        </div>
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
                  Ingresa los datos monetarios y los beneficios que desea para
                  su producto.
                </span>
              </div>

              <TextField
                {...register("cost", { required: true })}
                className="input-rounded"
                type="number"
                id="input-cost"
                disabled={product && true}
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
                disabled={product && true}
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
                {...register("marginBenefit")}
                className="input-rounded"
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
                InputLabelProps={{ shrink: true }}
                placeholder="P001-C001"
                fullWidth
              />
              <FormControl fullWidth>
                <Controller
                  rules={{ require: true }}
                  render={({
                    field: { ref, onChange, ...field },
                    fieldState: { error },
                  }) => (
                    <Autocomplete
                      {...field}
                      options={categories}
                      disableClearable
                      onChange={(_, data) => {
                        onChange(data);
                      }}
                      getOptionLabel={(option) => option.name}
                      renderInput={(params) => (
                        <TextField
                          {...params}
                          className="input-rounded"
                          error={error != undefined}
                          onChange={handleSearchCategories}
                          inputRef={ref}
                          helperText={error && "Campo requerido"}
                          label="Categoria"
                          variant="outlined"
                        />
                      )}
                    />
                  )}
                  name="category"
                  control={control}
                />
              </FormControl>
              <FormControl fullWidth>
                <Controller
                  rules={{ require: true }}
                  render={({
                    field: { ref, onChange, ...field },
                    fieldState: { error },
                  }) => (
                    <Autocomplete
                      {...field}
                      options={subCategories}
                      disableClearable
                      onChange={(_, data) => {
                        onChange(data);
                      }}
                      getOptionLabel={(option) => option.name}
                      renderInput={(params) => (
                        <TextField
                          {...params}
                          className="input-rounded"
                          error={error != undefined}
                          onChange={handleSearchSubcategories}
                          inputRef={ref}
                          helperText={error && "campo requerido"}
                          label="Subcategoria"
                          variant="outlined"
                        />
                      )}
                    />
                  )}
                  name="subcategory"
                  control={control}
                />
              </FormControl>{" "}
              <FormControl fullWidth>
                <Controller
                  rules={{ require: true }}
                  render={({
                    field: { ref, onChange, ...field },
                    fieldState: { error },
                  }) => (
                    <Autocomplete
                      {...field}
                      options={brands}
                      disableClearable
                      onChange={(_, data) => {
                        onChange(data);
                      }}
                      getOptionLabel={(option) => option.name}
                      renderInput={(params) => (
                        <TextField
                          {...params}
                          className="input-rounded"
                          error={error != undefined}
                          onChange={handleSearchBrands}
                          inputRef={ref}
                          helperText={error && "Campo requerido"}
                          label="Marcas"
                          variant="outlined"
                        />
                      )}
                    />
                  )}
                  name="brand"
                  control={control}
                />
              </FormControl>
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
              {!product && (
                <FormControl fullWidth>
                  <Controller
                    rules={{ require: true }}
                    render={({
                      field: { ref, onChange, ...field },
                      fieldState: { error },
                    }) => (
                      <Autocomplete
                        {...field}
                        options={warehouses}
                        disableClearable
                        onChange={(_, data) => {
                          onChange(data);
                        }}
                        getOptionLabel={(option) => option.name}
                        renderInput={(params) => (
                          <TextField
                            {...params}
                            className="input-rounded"
                            error={error != undefined}
                            onChange={handleSearchWarehouses}
                            inputRef={ref}
                            helperText={error && "Campo requerido"}
                            label="Almacen"
                            variant="outlined"
                          />
                        )}
                      />
                    )}
                    name="warehouse"
                    control={control}
                  />
                </FormControl>
              )}

              <TextField
                {...register("stock")}
                disabled={product && true}
                className="input-rounded"
                label="Cantidad de productos"
                placeholder="120"
                InputLabelProps={{
                  shrink: true,
                }}
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
      </div>
    </form>
  );
}
