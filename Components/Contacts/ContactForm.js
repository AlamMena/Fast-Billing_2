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
    defaultValues: contact
      ? contact
      : {
          allowCredit: false,
          creditdays: 0,
          allowDiscount: false,
          discount: 0,
        },
  });

  const [contactType, setContactType] = useState(
    contact ? parseInt(contact.type) : 1
  );
  const [clientType, setClientType] = useState(1);
  const [fileContainer, setFileContainer] = useState();
  const [currentImage, setCurrentImage] = useState(contact && contact.imageUrl);
  const [allowCredit, setAllowCredit] = useState(false);
  const [allowDiscount, setAllowDiscount] = useState(false);
  const [clientTypes, setClientTypes] = useState();

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
      } else {
        // if the item doesnt exists
        await toast.promise(axiosInstance.post("client", parsedData), {
          pending: "guardando cliente",
          success: "Genial!, tu cliente ha sido creado.",
          error: "Oops, algo ha ocurrido post",
        });
      }

      setFileContainer(null);
      await router.push("/contactos");
    } catch (error) {
      // error toast
      toast.error(`Opps!, something went wrong${error}`);
    }
  };

  const getClientsTypesAsync = async () => {
    try {
      const { data } = await axiosInstance.get("clients/types");
      setClientTypes(data);
    } catch (error) {
      console.log(error);
    }
  };
  const onSubmit = async (data) => {
    const dataParsed = {
      ...data,
    };
    await upsertAsync(dataParsed);
  };

  return (
    <div className="w-full h-full grid grid-cols-12 gap-x-2">
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
          className="flex flex-col p-8 space-y-4 px-6"
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
                          {/* <img
                      src="https://cdn-icons-png.flaticon.com/128/1726/1726620.png"
                      className="w-8 h-8"
                    ></img> */}
                          <span className="mx-2">{type.name}</span>
                        </div>
                      </MenuItem>
                    );
                  })}
              </Select>
            </FormControl>
          </div>
          <FormControl className="w-full">
            <TextField
              {...register("email", {
                required: true,
              })}
              id="outlined-adornment-name"
              label="Correo"
              size="large"
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
          <div className="flex space-x-4">
            <FormControl className="w-full">
              <TextField
                {...register("contacts[0].number", { required: true })}
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
                {...register("contacts[0].name", { required: true })}
                id="outlined-adornment-phone"
                label="Nombre de telefono"
                size="medium"
                className="input-rounded text-md"
                variant="outlined"
                // error={errors.phone}
                // helperText={errors.phone && `El campo no es valido`}
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
          </div>
          {/* Addresses */}
          <FormControl className="w-full">
            <TextField
              {...register("addresses[0].address", { required: true })}
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
          <div className="flex space-x-4">
            <FormControl className="w-full">
              <TextField
                {...register("addresses[0].country", { required: true })}
                id="outlined-adornment-phone"
                label="Pais"
                size="medium"
                className="input-rounded text-md"
                variant="outlined"
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
            <FormControl className="w-full">
              <TextField
                {...register("addresses[0].name", { required: true })}
                id="outlined-adornment-phone"
                label="Nombre de la direccion"
                size="medium"
                className="input-rounded text-md"
                variant="outlined"
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
          {/* Credit field */}
          <div className="flex space-x-4">
            <FormControl className="w-full">
              <InputLabel id="select-type-identification">
                Permitir credito?
              </InputLabel>
              <Select
                {...register("allowCredit")}
                className="rounded-xl text-md"
                label="Permitir credito?"
                value={allowCredit}
              >
                <MenuItem value={true} onClick={() => setAllowCredit(true)}>
                  Permitir
                </MenuItem>
                <MenuItem value={false} onClick={() => setAllowCredit(false)}>
                  No Permitir
                </MenuItem>
              </Select>
            </FormControl>
            <FormControl className="w-full">
              <TextField
                {...register("creditdays")}
                id="outlined-adornment-phone"
                label="Dias de credito"
                size="medium"
                type="number"
                className="input-rounded text-md"
                variant="outlined"
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
          </div>
          <div className="flex space-x-4">
            <FormControl className="w-full">
              <InputLabel id="select-type-identification">
                Permitir descuento?
              </InputLabel>
              <Select
                {...register("allowdiscount")}
                className="rounded-xl text-md"
                label="Permitir descuento?"
                value={allowDiscount}
              >
                <MenuItem value={true} onClick={() => setAllowDiscount(true)}>
                  Permitir
                </MenuItem>
                <MenuItem value={false} onClick={() => setAllowDiscount(false)}>
                  No Permitir
                </MenuItem>
              </Select>
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
          <div className="flex w-full justify-end space-x-4 ">
            <Button
              variant="contained"
              size="medium"
              className=" w-28 shadow-xl bg-neutral-200 rounded-2xl hover:bg-neutral-400 hover:text-white"
              onClick={() => router.push("../contactos")}
            >
              Cancelar
            </Button>
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
