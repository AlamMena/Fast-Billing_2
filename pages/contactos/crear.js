import {
  AlternateEmail,
  ArticleOutlined,
  BadgeOutlined,
  BadgeRounded,
  ContactsOutlined,
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
import PageHeader from "../../Components/Globals/PageHeader";

export default function ContactForm() {
  const {
    handleSubmit,
    register,
    reset,
    setValue,
    formState: { errors },
  } = useForm();

  const [images, setImages] = useState();
  const [contactType, setContactType] = useState(1);
  const [identificationType, setIdentificationType] = useState(1);
  const toastId = useRef(null);

  const upsertAsync = async (requestData) => {
    try {
      // loading toast
      toastId.current = toast("Please wait...", {
        type: toast.TYPE.LOADING,
      });

      // if there is any file

      let imageUrl = requestData ? requestData.imageUrl : null;
      if (imageFile) {
        imageUrl = await postImage(imageFile);
      }

      const parsedData = { ...requestData, imageUrl };

      // logic
      if (requestData._id !== undefined) {
        // if the item exists
        await axiosInstance.put("v1/contact", parsedData);
      } else {
        // if the item dosent exists
        await axiosInstance.post("v1/contact", parsedData);
      }
      setImageFile(null);

      // success toast
      toast.update(toastId.current, {
        type: toast.TYPE.SUCCESS,
        autoClose: 5000,
        render: "Success",
      });
    } catch (error) {
      // error toast
      toast.error(`Opps!, something went wrong${error}`);

      // removing data from page
      setData({ isLoading: false, contacts: [] });
    }
  };
  const onSubmit = async (data) => {
    const dataParsed = {
      address: "none",
      isDeleted: false,
      ...data,
    };
    await onSave(dataParsed);
    setOpen(false);
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
            header="Crear contactos"
            locationRoutes={locationRoutes}
          />
        </div>
      </div>
      <div className="flex w-full col-span-4">
        <div className="rounded-2xl shadow-md px-8 py-12 flex flex-col items-center">
          <figure className=" w-40 h-40 outline-dashed outline-2 outline-neutral-200  p-2 rounded-full">
            <img
              src="/dashboard_welcome.png"
              className=" w-36 h-36 rounded-full hover:bg-neutral-700 "
            />
          </figure>
          <span className="text-xs px-8 m-4 text-center max-w-sm  text-neutral-500">
            Allowed *.jpeg, *.jpg, *.png, *.gif max size of 3.1 MB
          </span>
        </div>
      </div>

      <div className=" rounded-2xl shadow-md col-span-8 mx-6">
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="flex flex-col p-8 space-y-6 px-6"
        >
          <h2>Formulario de contactos</h2>
          <div className="flex w-full space-x-4">
            <FormControl className="w-full">
              <TextField
                {...register("fullName", {
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
                error={errors.name && "value"}
                className="input-rounded"
                helperText={errors.name && `El campo no es valido`}
                variant="outlined"
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <EmailRounded
                        className={`${errors.name && "text-red-500"} `}
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
                startAdornment={
                  <InputAdornment position="start">
                    <ArticleOutlined />
                  </InputAdornment>
                }
              >
                <MenuItem value={1}>Cedula</MenuItem>
                <MenuItem value={2}>Pasaporte</MenuItem>
                <MenuItem value={3}>RNC</MenuItem>
              </Select>
            </FormControl>
            <FormControl className="w-full">
              <TextField
                {...register("noIdentification", { required: true })}
                id="outlined-adornment-identification"
                label=" No. Identification"
                size="medium"
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
          </div>
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
              startAdornment={
                <InputAdornment position="start">
                  <ContactsOutlined />
                </InputAdornment>
              }
            >
              <MenuItem value={1}>Cliente</MenuItem>
              <MenuItem value={2}>Proveedor</MenuItem>
            </Select>
          </FormControl>
          <FormControl>
            {/* <ImagePoster
                images={images}
                setImages={setImages}
                setFile={setFile}
                removeImage={() => setValue("imageUrl", null)}
              /> */}
          </FormControl>

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
