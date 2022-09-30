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
import PageHeader from "../../Components/Globals/PageHeader";
import useAxios from "../../Axios/Axios";
import { postImage } from "../../Components/Globals/ImagePoster";
import { useRouter } from "next/router";

export default function SuplierForm({ suplier }) {
  const {
    handleSubmit,
    register,
    reset,
    setValue,
    formState: { errors },
  } = useForm({
    defaultValues: contact,
  });

  const [fileContainer, setFileContainer] = useState();
  const [currentImage, setCurrentImage] = useState(contact && contact.imageUrl);
  const [allowCredit, setAllowCredit] = useState(false);
  const [allowDiscount, setAllowDiscount] = useState(false);

  const toastId = useRef(null);

  const { axiosInstance } = useAxios();
  const router = useRouter();

  useEffect(() => {
    reset(suplier);
  }, [suplier]);
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
          `supliers/${requestData.name}`
        );
      }

      const parsedData = { ...requestData, imageUrl };

      // logic
      if (requestData._id !== undefined) {
        // if the item exists
        await toast.promise(axiosInstance.put("v1/suplier", parsedData), {
          pending: "guardando suplidor",
          success: "Genial!, tu suplidor ha sido actualizado.",
          error: "Oops, algo ha ocurrido",
        });
      } else {
        // if the item dosent exists
        await toast.promise(axiosInstance.post("v1/suplier", parsedData), {
          pending: "guardando suplidor",
          success: "Genial!, tu sulidor ha sido creado.",
          error: "Oops, algo ha ocurrido",
        });
      }

      setFileContainer(null);
      await router.push("/supliers");
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
                  : suplier?.imageUrl
                  ? suplier.imageUrl
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
                size="small"
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
          <div className="flex w-full items-center space-x-4"></div>
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
          <div className="flex space-x-4">
            <FormControl className="w-full">
              <InputLabel id="select-type-identification">
                Permitir credito?
              </InputLabel>
              <Select
                {...register("allowcredit", { required: true })}
                className="rounded-xl text-md"
                label="Permitir credito?"
                value={allowCredit}
              >
                <MenuItem value={true} onClick={() => setAllowCredit(true)}>
                  Si
                </MenuItem>
                <MenuItem value={false} onClick={() => setAllowCredit(false)}>
                  No
                </MenuItem>
              </Select>
            </FormControl>
            <FormControl className="w-full">
              <TextField
                {...register("creditdays", { required: true })}
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
                {...register("allowdiscount", { required: true })}
                className="rounded-xl text-md"
                label="Permitir descuento?"
                value={allowDiscount}
              >
                <MenuItem value={true} onClick={() => setAllowDiscount(true)}>
                  Si
                </MenuItem>
                <MenuItem value={false} onClick={() => setAllowDiscount(false)}>
                  No
                </MenuItem>
              </Select>
            </FormControl>
            <FormControl className="w-full">
              <TextField
                {...register("discount", { required: true })}
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
