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
  RampRightOutlined,
  RouteOutlined,
  RouteRounded,
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
  FormHelperText,
} from "@mui/material";
import { useEffect, useRef, useState } from "react";
import { toast } from "react-toastify";

import { useForm } from "react-hook-form";
import PageHeader from "../Globals/PageHeader";
import useAxios from "../../Axios/Axios";
import { postImage } from "../Globals/ImageHandler";
import { useRouter } from "next/router";

export default function ContactForm({ contact }) {
  const {
    handleSubmit,
    register,
    reset,
    setValue,
    formState: { errors },
  } = useForm({
    defaultValues: contact,
  });

  const [contactType, setContactType] = useState(
    contact ? parseInt(contact.type) : 1
  );
  const [identificationType, setIdentificationType] = useState(
    contact ? contact.identificationType ?? 1 : 1
  );
  const [fileContainer, setFileContainer] = useState();
  const [currentImage, setCurrentImage] = useState(contact && contact.imageUrl);

  const toastId = useRef(null);

  const { axiosInstance } = useAxios();
  const router = useRouter();

  useEffect(() => {
    reset(contact);
  }, [contact]);
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
          `contacts/${requestData.name}`
        );
      }

      const parsedData = { ...requestData, imageUrl };

      // logic
      if (requestData._id !== undefined) {
        // if the item exists
        await toast.promise(axiosInstance.put("v1/contact", parsedData), {
          pending: "guardando contacto",
          success: "Genial!, tu contacto ha sido actualizado.",
          error: "Oops, algo ha ocurrido",
        });
      } else {
        // if the item dosent exists
        await toast.promise(axiosInstance.post("v1/contact", parsedData), {
          pending: "guardando contacto",
          success: "Genial!, tu contacto ha sido creado.",
          error: "Oops, algo ha ocurrido",
        });
      }

      setFileContainer(null);
      await router.push("/contactos");
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

  const locationRoutes = [
    {
      text: "home",
      link: "/",
    },
    {
      text: "contactos",
      link: "/contactos",
    },
    {
      text: "crear",
      link: "/contactos/crear",
    },
  ];
  return (
    <div className="w-full h-full grid grid-cols-12 gap-x-2">
      <div className="col-span-12 flex w-full justify-between items-center pr-8">
        <div>
          <PageHeader
            header={contact ? "Modificar contacto" : "Crear contacto"}
            locationRoutes={locationRoutes}
          />
        </div>
      </div>
      <div className="flex w-full justify-center col-span-12 lg:col-span-4">
        <div className="rounded-2xl lg:shadow-md  px-8 py-12 flex flex-col items-center">
          <figure className=" relative w-40 h-40 outline-dashed outline-2 outline-neutral-200  p-2 rounded-full">
            <Button
              component="label"
              className=" button-image absolute inset-0 m-2"
            >
              <div className="w-full flex flex-col justify-center space-y-2 items-center">
                <CameraAltRounded />
                <span className="text-xs capitalize">Actualizar imagen</span>
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
          <span className="text-xs px-8 m-4 text-center max-w-sm  text-neutral-500">
            Allowed *.jpeg, *.jpg, *.png, *.gif max size of 3.1 MB
          </span>
        </div>
      </div>

      <div className=" rounded-2xl shadow-md col-span-12 lg:col-span-8 md:mx-6">
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="flex flex-col p-8 space-y-6 px-6"
        >
          <div className="flex w-full space-x-4">
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
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <BadgeOutlined
                        className={`${errors.name && "text-red-500"} `}
                      />
                    </InputAdornment>
                  ),
                }}
                fullWidth
              />
            </FormControl>
            <FormControl className="w-full">
              <TextField
                {...register("email", {
                  required: true,
                })}
                id="outlined-adornment-name"
                label="Correo"
                size="medium"
                error={errors.email && "value"}
                className="input-rounded"
                helperText={errors.email && `El campo no es valido`}
                variant="outlined"
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <EmailOutlined
                        className={`${errors.email && "text-red-500"} `}
                      />
                    </InputAdornment>
                  ),
                }}
                fullWidth
              />
            </FormControl>
          </div>

          <div className="flex w-full items-center space-x-4">
            <FormControl className="w-full">
              <InputLabel id="select-type-identification">
                Tipo Identificacion
              </InputLabel>
              <Select
                {...register("noIdentificationType")}
                labelId="select-type-identification"
                id="select-type-identificationr"
                value={identificationType}
                onChange={(params) =>
                  setIdentificationType(params.target.value)
                }
                size="medium"
                className="rounded-xl text-md"
                label="Identification type"
              >
                <MenuItem value={1}>
                  {" "}
                  <div className="flex items-center">
                    <img
                      src="https://cdn-icons-png.flaticon.com/128/1726/1726620.png"
                      className="w-8 h-8"
                    ></img>
                    <span className="mx-2">Cedula</span>
                  </div>
                </MenuItem>
                <MenuItem value={2}>
                  <div className="flex items-center">
                    <img
                      src="https://cdn-icons-png.flaticon.com/128/620/620765.png"
                      className="w-8 h-8"
                    ></img>
                    <span className="mx-2">Pasaporte</span>
                  </div>
                </MenuItem>
                <MenuItem value={3}>
                  {" "}
                  <div className="flex items-center">
                    <img
                      src="https://cdn-icons-png.flaticon.com/128/3188/3188580.png"
                      className="w-8 h-8"
                    ></img>
                    <span className="mx-2">RNC</span>
                  </div>
                </MenuItem>
              </Select>
            </FormControl>
            <FormControl className="w-full">
              <InputLabel id="select-type-contact">Tipo de contacto</InputLabel>
              <Select
                {...register("type")}
                labelId="select-type-contact"
                id="select-type-contact"
                value={contactType}
                onChange={(params) => setContactType(params.target.value)}
                size="medium"
                className="rounded-xl text-md"
                label="Tipo de contacto"
              >
                <MenuItem value={1}>
                  <div className="flex items-center">
                    <img
                      src="/contacts_clients_profile.png"
                      className="w-8 h-8"
                    ></img>
                    <span className="mx-2">Cliente</span>
                  </div>
                </MenuItem>
                <MenuItem value={2}>
                  <div className="flex items-center">
                    <img
                      src="/contacts_suppliers_profile.png"
                      className="w-8 h-8"
                    ></img>
                    <span className="mx-2">Proveedor</span>
                  </div>
                </MenuItem>
              </Select>
            </FormControl>
          </div>
          <FormControl className="w-full">
            <TextField
              {...register("noIdentification", { required: true })}
              id="outlined-adornment-identification"
              label=" No. Identification"
              size="medium"
              type="number"
              className="input-rounded text-md"
              variant="outlined"
              error={errors.noIdentification}
              helperText={errors.noIdentification && `El campo no es valido`}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <ArticleOutlined
                      className={`${
                        errors.noIdentification && "text-red-500"
                      } `}
                    />
                  </InputAdornment>
                ),
              }}
            />
          </FormControl>
          <div className="flex space-x-4">
            <FormControl className="w-full">
              <TextField
                {...register("phone", { required: true })}
                id="outlined-adornment-phone"
                label="Numero de telefono"
                size="medium"
                className="input-rounded text-md"
                variant="outlined"
                error={errors.phone}
                helperText={errors.phone && `El campo no es valido`}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <PhoneOutlined
                        className={`${errors.phone && "text-red-500"} `}
                      />
                    </InputAdornment>
                  ),
                }}
              />
            </FormControl>
            <FormControl className="w-full">
              <TextField
                {...register("address", { required: true })}
                id="outlined-adornment-phone"
                label="Direccion"
                size="medium"
                className="input-rounded text-md"
                variant="outlined"
                error={errors.phone}
                helperText={errors.phone && `El campo no es valido`}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <RouteRounded
                        className={`${errors.phone && "text-red-500"} `}
                      />
                    </InputAdornment>
                  ),
                }}
              />
            </FormControl>
          </div>

          <div className="flex w-full justify-end space-x-4 ">
            <Button
              variant="contained"
              type="submit"
              color="secondary"
              size="medium"
              className=" w-28 shadow-xl bg-green-600 text-white rounded-2xl"
            >
              Guardar
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}
