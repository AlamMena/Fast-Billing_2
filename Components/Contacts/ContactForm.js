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
  ArrowForward,
  ArrowForwardIos,
  Info,
  ArrowBackIos,
  Delete,
  ChevronLeft,
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
  InputLabel,
  Select,
  MenuItem,
  FormGroup,
  FormControlLabel,
  Switch,
  FormHelperText,
  Box,
  Tab,
  Tabs,
  IconButton,
  Menu,
} from "@mui/material";
import { useEffect, useRef, useState } from "react";
import { toast } from "react-toastify";

import { useForm } from "react-hook-form";
import PageHeader from "../Globals/PageHeader";
import useAxios from "../../Axios/Axios";
import { postImage } from "../Globals/ImageHandler";
import { useRouter } from "next/router";
import ContactHistory from "./ContactHistory";

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

export default function ContactForm({ contact, invoices }) {
  const {
    handleSubmit,
    register,
    reset,
    setValue,
    formState: { errors },
  } = useForm({
    defaultValues: contact
      ? contact
      : {
          allowCredit: false,
          creditdays: 0,
          allowDiscount: false,
          discount: 0,
        },
  });
  const [content, setContent] = useState(0);
  // const [invoices, setInvoices] = useState(false);

  const [contactType, setContactType] = useState(
    contact ? parseInt(contact.type) : 1
  );
  const [clientType, setClientType] = useState(contact ? contact.type : 1);
  const [fileContainer, setFileContainer] = useState();
  const [currentImage, setCurrentImage] = useState(contact && contact.imageUrl);
  const [allowCredit, setAllowCredit] = useState(false);
  const [allowDiscount, setAllowDiscount] = useState(false);
  const [clientTypes, setClientTypes] = useState();
  const [discount, setDiscount] = useState();
  const [credit, setCredit] = useState();

  const toastId = useRef(null);

  const { axiosInstance } = useAxios();
  const router = useRouter();

  useEffect(() => {
    reset(contact);
  }, [contact]);

  useEffect(() => {
    getClientsTypesAsync();
  }, []);

  const handleImageInput = (e) => {
    setCurrentImage(URL.createObjectURL(e.target.files[0]));
    setFileContainer(e.target.files[0]);
  };

  function removeEmptyFields(data) {
    Object.keys(data).forEach((key) => {
      if (data[key] === "" || data[key] == null) {
        delete data[key];
      }
    });
  }

  const upsertAsync = async (requestData) => {
    try {
      // if there is any file
      let imageUrl = requestData ? requestData.imageUrl : null;
      if (fileContainer) {
        imageUrl = await postImage(
          fileContainer,
          `clients/${requestData.name}`
        );
      }

      const parsedData = { ...requestData, imageUrl };

      // logic
      if (requestData.id !== undefined) {
        // if the item exists
        await toast.promise(axiosInstance.put("client", parsedData), {
          pending: "guardando cliente",
          success: "Genial!, tu cliente ha sido actualizado.",
          error: "Oops, algo ha ocurrido put",
        });
        console.log(parsedData);
      } else {
        // if the item doesnt exists
        await toast.promise(axiosInstance.post("client", parsedData), {
          pending: "guardando cliente",
          success: "Genial!, tu cliente ha sido creado.",
          error: "Oops, algo ha ocurrido post",
        });
      }

      setFileContainer(null);
      await router.push("/clientes");
    } catch (error) {
      // error toast
      toast.error(`Opps!, something went wrong${error}`);
    }
  };

  const getClientsTypesAsync = async () => {
    try {
      const { data } = await axiosInstance.get("clients/types");
      setClientTypes(data);
      console.log(clientTypes);
    } catch (error) {
      console.log(error);
    }
  };
  const onSubmit = async (data) => {
    removeEmptyFields(data);
    const dataParsed = {
      ...data,
    };
    // alert(JSON.stringify(dataParsed));
    await upsertAsync(dataParsed);
  };

  const handleChange = (e, newValue) => {
    setContent(newValue);
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
          {/* 
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
          /> */}
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
                        : contact?.imageUrl
                        ? contact.imageUrl
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
                        Aplica descuentos a este contacto
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
                        Permitir credito a este contacto
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
                  Informacion de contacto
                </span>
                <span className="text-sm text-neutral-500">
                  Ingresa datos especificos del contacto.
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
              <FormControl className="w-full">
                <InputLabel id="select-type-identification">
                  Tipo de Cliente
                </InputLabel>
                <Select
                  {...register("typeId")}
                  labelId="select-type-identification"
                  id="select-type-identificationr"
                  value={clientType}
                  onChange={(params) => setClientType(params.target.value)}
                  size="large"
                  className="rounded-xl text-md"
                  label="Tipo de cliente"
                >
                  {clientTypes &&
                    clientTypes.map((type, index) => {
                      return (
                        <MenuItem value={type.id} key={index}>
                          <div className="flex items-center">
                            <span className="mx-2">{type.name}</span>
                          </div>
                        </MenuItem>
                      );
                    })}
                </Select>
              </FormControl>
              <FormControl className="w-full">
                <TextField
                  {...register("email")}
                  id="outlined-adornment-phone"
                  label="E-mail"
                  size="medium"
                  className="input-rounded text-md"
                  variant="outlined"
                />
              </FormControl>
              <div className="lg:flex space-y-3 lg:space-y-0 lg:space-x-4">
                <FormControl className="w-full">
                  <TextField
                    // {...register("addresses[0].address")}
                    id="outlined-adornment-phone"
                    label="Direccion"
                    size="medium"
                    className="input-rounded text-md"
                    variant="outlined"
                  />
                </FormControl>
                <FormControl className="w-full">
                  <TextField
                    // {...register("contacts[0].number")}
                    id="outlined-adornment-phone"
                    label="Numero de Telefono"
                    size="medium"
                    className="input-rounded text-md"
                    variant="outlined"
                  />
                </FormControl>
              </div>

              {/* Credit field */}
              <div className="flex space-x-4">
                <FormControl className="w-full">
                  <TextField
                    {...register("creditDays")}
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

              {/* Save Button */}
              <div className="flex w-full justify-end space-x-4  ">
                {/* <Button
                  variant="contained"
                  size="medium"
                  className="  w-28 shadow-xl bg-neutral-200 rounded-2xl hover:bg-neutral-400 hover:text-white"
                  onClick={() => router.push("../suplidores")}
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

          {/*  
          <TabPanel value={content} index={1}>
            <div className=" col-span-12 m-2 space-y-4 shadow-md rounded-xl border p-6 ">
              
              <div className="flex flex-col mx-2 py-2">
                <span className="font-bold tracking-wider">
                  Direcciones del contacto
                </span>
                <span className="text-sm text-neutral-500">
                  Ingresa datos especificos a las direcciones del contacto.
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
              
              <FormControl className="w-full">
                <TextField
                  {...register("addresses[1].name")}
                  id="outlined-adornment-phone"
                  label="Nombre de la direccion"
                  size="medium"
                  className="input-rounded text-md"
                  variant="outlined"
                />
              </FormControl>
              <FormControl className="w-full">
                <TextField
                  {...register("addresses[1].address1")}
                  id="outlined-adornment-phone"
                  label="Direccion 2"
                  size="medium"
                  className="input-rounded text-md"
                  variant="outlined"
                />
              </FormControl>

              <FormControl className="w-full">
                <TextField
                  {...register("addresses[1].country")}
                  id="outlined-adornment-phone"
                  label="Pais"
                  size="medium"
                  className="input-rounded text-md"
                  variant="outlined"
                />
              </FormControl>
              <FormControl className="w-full">
                <TextField
                  {...register("addresses[1].postalCode")}
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
                  onClick={() => router.push("../suplidores")}
                >
                  Cancelar
                </Button> *
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
                  Ingresa datos especificos al contacto.
                </span>
              </div>
              {/* Address info supplier *
              <FormControl className="w-full">
                <TextField
                  {...register("contacts[0].name", { required: false })}
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
              {/* Address info supplier 
              <FormControl className="w-full">
                <TextField
                  {...register("Contacts[1].Name")}
                  id="outlined-adornment-phone"
                  label="Nombre de telefono"
                  size="medium"
                  className="input-rounded text-md"
                  variant="outlined"
                />
              </FormControl>
              <FormControl className="w-full">
                <TextField
                  {...register("contacts[1].phone")}
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
                  onClick={() => router.push("../suplidores")}
                >
                  Cancelar
                </Button> *
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
          </TabPanel>*/}
        </form>
      </div>
    </div>
  );
}
