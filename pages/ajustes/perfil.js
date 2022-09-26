import React from "react";
import { Button, FormControl, TextField, InputAdornment } from "@mui/material";
import {
  CameraAltRounded,
  PhoneOutlined,
  RouteRounded,
  BadgeOutlined,
  EmailOutlined,
} from "@mui/icons-material";
import { useForm } from "react-hook-form";

export default function ProfileSettings() {
  const {
    handleSubmit,
    register,
    reset,
    setValue,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    // const dataParsed = {
    //   address: "none",
    //   isDeleted: false,
    //   ...data,
    // };
    // await upsertAsync(dataParsed);
    console.log(data);
  };

  return (
    <div className="w-full h-full grid grid-cols-12 gap-x-2">
      {/* Image Setting Container */}
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
                // onChange={handleImageInput}
                hidden
                accept="image/*"
                multiple
                type="file"
              />
            </Button>
            <img
              // src={
              //   currentImage
              //     ? currentImage
              //     : contact?.imageUrl
              //     ? contact.imageUrl
              //     : "/dashboard_welcome.png"
              // }
              alt=""
              className=" w-36 h-36 rounded-full transition-all  "
            />
          </figure>
          <span className="text-xs px-8 m-4 text-center max-w-sm  text-neutral-500">
            Permitidos *.jpeg, *.jpg, *.png, *.gif max size of 3.1 MB
          </span>
        </div>
      </div>
      {/* Form */}
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
