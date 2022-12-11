import {
  AlternateEmail,
  ArticleOutlined,
  BadgeOutlined,
  BadgeRounded,
  CameraAltRounded,
  ContactsOutlined,
  EmailOutlined,
  EmailRounded,
  PhoneOutlined,
  AddCard,
  RouteRounded,
  CalendarMonth,
  AttachMoney,
  AccountCircle,
  Receipt,
} from "@mui/icons-material";
import {
  Button,
  Dialog,
  Input,
  TextField,
  InputOutlined,
  OutlinedInput,
  InputAdornment,
  FormControl,
  Box,
  Tab,
  FormGroup,
  FormControlLabel,
  Switch,
  InputLabel,
  Select,
  MenuItem,
  AppBar,
  Tabs,
} from "@mui/material";
import { useEffect, useRef, useState } from "react";
import { toast } from "react-toastify";

import { useForm } from "react-hook-form";
import PageHeader from "../Globals/PageHeader";
import useAxios from "../../Axios/Axios";
import { postImage } from "../Globals/ImageHandler";
import { useRouter } from "next/router";

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box className="p-5 grid-cols-12 grid">{children}</Box>
      )}
    </div>
  );
}
function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

export default function SuppliersForm({ supplier }) {
  const {
    handleSubmit,
    register,
    reset,
    setValue,
    formState: { errors },
  } = useForm({
    defaultValues: supplier
      ? supplier
      : {
          allowCredit: false,
          creditdays: 0,
          allowDiscount: false,
          discount: 0,
        },
  });

  const [fileContainer, setFileContainer] = useState();
  const [currentImage, setCurrentImage] = useState(
    supplier && supplier.imageUrl
  );
  const [allowCredit, setAllowCredit] = useState(false);
  const [allowDiscount, setAllowDiscount] = useState(false);
  const [discount, setDiscount] = useState();
  const [credit, setCredit] = useState();
  const [content, setContent] = useState(0);

  const toastId = useRef(null);

  const { axiosInstance } = useAxios();
  const router = useRouter();

  const handleChange = (e, newValue) => {
    setContent(newValue);
  };

  useEffect(() => {
    reset(supplier);
  }, [supplier]);
  const handleImageInput = (e) => {
    setCurrentImage(URL.createObjectURL(e.target.files[0]));
    setFileContainer(e.target.files[0]);
  };

  const upsertAsync = async (requestData) => {
    try {
      // if there is any file
      let imageUrl = requestData ? requestData.imageUrl : null;
      if (fileContainer) {
        imageUrl = await postImage(
          fileContainer,
          `suppliers/${requestData.name}`
        );
      }

      const parsedData = { ...requestData, imageUrl };

      // logic
      if (requestData._id !== undefined) {
        // if the item exists
        await toast.promise(axiosInstance.put("/supplier", parsedData), {
          pending: "guardando proveedor",
          success: "Genial!, tu proveedor ha sido actualizado.",
          error: "Oops, algo ha ocurrido",
        });
      } else {
        // if the item dosent exists
        await toast.promise(axiosInstance.post("/supplier", parsedData), {
          pending: "guardando proveedor",
          success: "Genial!, tu proovedor ha sido creado.",
          error: "Oops, algo ha ocurrido",
        });
      }

      setFileContainer(null);
      await router.push("/proveedores");
    } catch (error) {
      // error toast
      toast.error(`Opps!, something went wrong${error}`);
    }
  };
  const onSubmit = async (data) => {
    const dataParsed = {
      address: "none",
      isDeleted: false,
      ...data,
    };
    await upsertAsync(dataParsed);
  };

  return (
    <div>
      <Box
        sx={{
          borderBottom: 1,
          borderColor: "divider",
          overflow: "auto",
        }}
      >
        <Tabs
          aria-label="basic tabs example"
          value={content}
          onChange={handleChange}
          sx={{ overflow: "visible" }}
          variant="scrollable"
          allowScrollButtonsMobile
        >
          <Tab
            icon={<AccountCircle />}
            style={{
              minHeight: "10px",
              fontSize: "14px",
              textTransform: "none",
            }}
            iconPosition="start"
            label="Informacion general"
            {...a11yProps(0)}
          />

          <Tab
            icon={<Receipt />}
            {...a11yProps(1)}
            style={{
              minHeight: "10px",
              fontSize: "14px",
              textTransform: "none",
            }}
            iconPosition="start"
            label="Datos personales"
          />
          <Tab
            icon={<Receipt />}
            {...a11yProps(2)}
            style={{
              minHeight: "10px",
              fontSize: "14px",
              textTransform: "none",
            }}
            iconPosition="start"
            label="Contacto"
          />
        </Tabs>
      </Box>

      <div className=" md:mx-6">
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="flex flex-col  space-y-4 rounded-2xl"
        >
          <TabPanel value={content} index={0}>
            {/* Image handeler */}
            <div className="flex w-full justify-center col-span-12 lg:col-span-4">
              <div className="rounded-2xl shadow-md  px-8 py-12 flex flex-col  border mb-10">
                <figure className="relative m-auto w-40 h-40 outline-dashed outline-2 outline-neutral-200  p-2 rounded-full">
                  <Button
                    component="label"
                    className=" button-image absolute inset-0 m-2"
                  >
                    <div className="w-full flex flex-col justify-center space-y-2 items-center">
                      <CameraAltRounded />
                      <span className="text-xs capitalize">
                        Actualizar imagen
                      </span>
                    </div>

                    <input
                      onChange={handleImageInput}
                      hidden
                      accept="image/*"
                      multiple
                      type="file"
                    />
                  </Button>
                  <img
                    src={
                      currentImage
                        ? currentImage
                        : supplier?.imageUrl
                        ? supplier.imageUrl
                        : "/dashboard_welcome.png"
                    }
                    alt=""
                    className=" w-36 h-36 rounded-full transition-all  "
                  />
                </figure>
                <span className="text-xs px-8 m-5 text-center max-w-sm  text-neutral-500">
                  Allowed *.jpeg, *.jpg, *.png, *.gif max size of 3.1 MB
                </span>
                <FormGroup>
                  <div className="flex items-center justify-between w-full">
                    <div className="text-xs flex flex-col">
                      <span className="font-bold">Descuento</span>
                      <span className="text-neutral-500">
                        Aplica descuentos a este proveedor
                      </span>
                    </div>
                    <FormControlLabel
                      control={
                        <Switch
                          checked={allowDiscount}
                          onClick={() => setAllowDiscount(!allowDiscount)}
                        />
                      }
                      size="small"
                    />
                  </div>
                  <div className="flex items-center justify-between w-full">
                    <div className="text-xs flex flex-col">
                      <span className="font-bold">Credito</span>
                      <span className="text-neutral-500">
                        Permitir credito a este proveedor
                      </span>
                    </div>
                    <FormControlLabel
                      control={
                        <Switch
                          checked={allowCredit}
                          onClick={() => setAllowCredit(!allowCredit)}
                        />
                      }
                      size="small"
                    />
                  </div>
                </FormGroup>
              </div>
            </div>

            {/* Personal info client */}
            <div className="flex flex-col justify-around lg:mx-5 space-y-3 col-span-12 lg:col-span-8 shadow-md border p-6 rounded-xl">
              <div className="flex flex-col mx-2 py-2">
                <span className="font-bold tracking-wider">
                  Informacion de proveedor
                </span>
                <span className="text-sm text-neutral-500">
                  Ingresa datos especificos del proveedor.
                </span>
              </div>
              <div className="lg:flex w-full space-y-3 lg:space-y-0 lg:space-x-4">
                <FormControl className="w-full">
                  <TextField
                    {...register("name", {
                      required: true,
                    })}
                    id="outlined-adornment-name"
                    label="Nombre"
                    size="medium"
                    error={errors.name && "value"}
                    className="input-rounded"
                    helperText={errors.name && `El campo no es valido`}
                    variant="outlined"
                    // InputProps={{
                    //   startAdornment: (
                    //     <InputAdornment position="start">
                    //       <BadgeOutlined
                    //         className={`${errors.name && "text-red-500"} `}
                    //       />
                    //     </InputAdornment>
                    //   ),
                    // }}
                    fullWidth
                  />
                </FormControl>
                <FormControl className="w-full">
                  <TextField
                    {...register("noIdentification", {
                      required: true,
                    })}
                    id="outlined-adornment-name"
                    label="Numero de Identificacion"
                    size="large"
                    error={errors.noIdentification && "value"}
                    className="input-rounded"
                    helperText={
                      errors.noIdentification && `El campo no es valido`
                    }
                    variant="outlined"
                    // InputProps={{
                    //   startAdornment: (
                    //     <InputAdornment position="start">
                    //       <EmailOutlined
                    //         className={`${errors.website && "text-red-500"} `}
                    //       />
                    //     </InputAdornment>
                    //   ),
                    // }}
                    fullWidth
                  />
                </FormControl>
              </div>

              {/* Credit field */}
              <div className="flex space-x-4">
                <FormControl className="w-full">
                  <TextField
                    {...register("creditdays")}
                    id="outlined-adornment-phone"
                    label="Dias de credito"
                    size="medium"
                    type="number"
                    className="input-rounded text-md"
                    variant="outlined"
                    value={credit}
                    disabled={!allowCredit}
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <CalendarMonth />
                        </InputAdornment>
                      ),
                    }}
                  />
                </FormControl>
                <FormControl className="w-full">
                  <TextField
                    {...register("discount")}
                    id="outlined-adornment-phone"
                    label="Descuento"
                    size="medium"
                    type="number"
                    className="input-rounded text-md"
                    variant="outlined"
                    value={discount}
                    disabled={!allowDiscount}
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <AttachMoney />
                        </InputAdornment>
                      ),
                    }}
                  />
                </FormControl>
              </div>
              <FormControl className="w-full">
                <TextField
                  {...register("description")}
                  label="Descripcion"
                  variant="outlined"
                  multiline
                  minRows={3}
                  size="medium"
                  error={errors.description && "value"}
                  className="input-rounded"
                  helperText={errors.description && `El campo no es valido`}
                  startAdornment={<BadgeOutlined />}
                  fullWidth
                />
              </FormControl>
              {/* Save Button */}
              <div className="flex w-full justify-end space-x-4  ">
                {/* <Button
                  variant="contained"
                  size="medium"
                  className="  w-28 shadow-xl bg-neutral-200 rounded-2xl hover:bg-neutral-400 hover:text-white"
                  onClick={() => router.push("../proveedores")}
                >
                  Cancelar
                </Button> */}
                <Button
                  variant="contained"
                  type="submit"
                  color="secondary"
                  size="medium"
                  className="font-semibold w-28 shadow-xl bg-green-600 text-white rounded-2xl"
                >
                  Guardar
                </Button>
              </div>
            </div>
          </TabPanel>
          <TabPanel value={content} index={1}>
            <div className=" col-span-12 m-2 space-y-4 shadow-md rounded-xl border p-6 ">
              {/* Address info supplier */}
              <div className="flex flex-col mx-2 py-2">
                <span className="font-bold tracking-wider">
                  Direcciones del proveedor
                </span>
                <span className="text-sm text-neutral-500">
                  Ingresa datos especificos a las direcciones del proveedor.
                </span>
              </div>
              <FormControl className="w-full">
                <TextField
                  {...register("addresses[0].name")}
                  id="outlined-adornment-phone"
                  label="Nombre de la direccion"
                  size="medium"
                  className="input-rounded text-md"
                  variant="outlined"
                />
              </FormControl>
              <FormControl className="w-full">
                <TextField
                  {...register("addresses[0].address")}
                  id="outlined-adornment-phone"
                  label="Direccion 1"
                  size="medium"
                  className="input-rounded text-md"
                  variant="outlined"
                />
              </FormControl>
              <FormControl className="w-full">
                <TextField
                  {...register("addresses[0].country")}
                  id="outlined-adornment-phone"
                  label="Pais"
                  size="medium"
                  className="input-rounded text-md"
                  variant="outlined"
                />
              </FormControl>
              <FormControl className="w-full">
                <TextField
                  {...register("addresses[0].postalCode")}
                  id="outlined-adornment-phone"
                  label="Codigo postal"
                  size="medium"
                  className="input-rounded text-md"
                  variant="outlined"
                />
              </FormControl>
            </div>
            <div className="col-span-12 m-2  space-y-4 shadow-md border p-6 rounded-xl ">
              {/* Address info supplier */}
              <FormControl className="w-full">
                <TextField
                  {...register("addresses[0].name")}
                  id="outlined-adornment-phone"
                  label="Nombre de la direccion"
                  size="medium"
                  className="input-rounded text-md"
                  variant="outlined"
                />
              </FormControl>
              <FormControl className="w-full">
                <TextField
                  {...register("addresses[0].address")}
                  id="outlined-adornment-phone"
                  label="Direccion 2"
                  size="medium"
                  className="input-rounded text-md"
                  variant="outlined"
                />
              </FormControl>

              <FormControl className="w-full">
                <TextField
                  {...register("addresses[0].country")}
                  id="outlined-adornment-phone"
                  label="Pais"
                  size="medium"
                  className="input-rounded text-md"
                  variant="outlined"
                  // InputProps={{
                  //   startAdornment: (
                  //     <InputAdornment position="start">
                  //       <RouteRounded
                  //         className={`${errors.phone && "text-red-500"} `}
                  //       />
                  //     </InputAdornment>
                  //   ),
                  // }}
                />
              </FormControl>
              <FormControl className="w-full">
                <TextField
                  {...register("addresses[0].postalCode")}
                  id="outlined-adornment-phone"
                  label="Codigo postal"
                  size="medium"
                  className="input-rounded text-md"
                  variant="outlined"
                />
              </FormControl>
              <div className="flex w-full justify-end space-x-4  ">
                {/* <Button
                  variant="contained"
                  size="medium"
                  className="  w-28 shadow-xl bg-neutral-200 rounded-2xl hover:bg-neutral-400 hover:text-white"
                  onClick={() => router.push("../proveedores")}
                >
                  Cancelar
                </Button> */}
                <Button
                  variant="contained"
                  type="submit"
                  color="secondary"
                  size="medium"
                  className="font-semibold w-28 shadow-xl bg-green-600 text-white rounded-2xl"
                >
                  Guardar
                </Button>
              </div>
            </div>
          </TabPanel>
          <TabPanel value={content} index={2}>
            <div className=" col-span-12 m-2 space-y-4 shadow-md rounded-xl lg:border p-6 ">
              <div className="flex flex-col mx-2 py-2">
                <span className="font-bold tracking-wider">Contacto</span>
                <span className="text-sm text-neutral-500">
                  Ingresa datos especificos al contacto del proveedor.
                </span>
              </div>
              {/* Address info supplier */}
              <FormControl className="w-full">
                <TextField
                  {...register("contacts[0].name")}
                  id="outlined-adornment-phone"
                  label="Nombre del telefono"
                  size="medium"
                  className="input-rounded text-md"
                  variant="outlined"
                />
              </FormControl>
              <FormControl className="w-full">
                <TextField
                  {...register("contacts[0].phone")}
                  id="outlined-adornment-phone"
                  label="Telefono 1"
                  size="medium"
                  className="input-rounded text-md"
                  variant="outlined"
                />
              </FormControl>
            </div>
            <div className="col-span-12 m-2  space-y-4 shadow-md border p-6 rounded-xl ">
              {/* Address info supplier */}
              <FormControl className="w-full">
                <TextField
                  {...register("addresses[0].name")}
                  id="outlined-adornment-phone"
                  label="Nombre de telefono"
                  size="medium"
                  className="input-rounded text-md"
                  variant="outlined"
                />
              </FormControl>
              <FormControl className="w-full">
                <TextField
                  {...register("addresses[0].address")}
                  id="outlined-adornment-phone"
                  label="Telefono 2"
                  size="medium"
                  className="input-rounded text-md"
                  variant="outlined"
                />
              </FormControl>
              <div className="flex w-full justify-end space-x-4  ">
                {/* <Button
                  variant="contained"
                  size="medium"
                  className="  w-28 shadow-xl bg-neutral-200 rounded-2xl hover:bg-neutral-400 hover:text-white"
                  onClick={() => router.push("../proveedores")}
                >
                  Cancelar
                </Button> */}
                <Button
                  variant="contained"
                  type="submit"
                  color="secondary"
                  size="medium"
                  className="font-semibold w-28 shadow-xl bg-green-600 text-white rounded-2xl"
                >
                  Guardar
                </Button>
              </div>
            </div>
          </TabPanel>
        </form>
      </div>
    </div>
  );
}
