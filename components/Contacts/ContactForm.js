import {
  AlternateEmail,
  ArticleOutlined,
  BadgeOutlined,
  BadgeRounded,
  ContactsOutlined,
  PhoneOutlined,
  RampRightOutlined,
  RouteOutlined,
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
import { getDownloadURL, getStorage, ref, uploadBytes } from "firebase/storage";

import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import Alert from "../Globals/Alert";
import ImagePoster from "../Globals/ImagePoster";

export default function ContactForm({ onSave, open, setOpen, data, setFile }) {
  const {
    handleSubmit,
    register,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: data,
  });

  const [images, setImages] = useState([]);

  const [contactType, setContactType] = useState(1);
  const [identificationType, setIdentificationType] = useState(1);

  const onSubmit = async (data) => {
    const dataParsed = {
      address: "none",
      IsDeleted: false,
      ...data,
    };
    await onSave(dataParsed);
    setOpen(false);
  };

  useEffect(() => {
    reset(data);
    setImages([data && data.imageUrl]);
  }, [data]);

  return (
    <div className="w-full h-full">
      <div className=" rounded-2xl">
        <Dialog open={open} onClose={() => setOpen(false)}>
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="flex flex-col p-8 space-y-6 px-10"
          >
            <h2 className="text-xl font-bold">Contact Form </h2>

            <FormControl>
              <TextField
                {...register("name", {
                  required: true,
                })}
                id="outlined-adornment-name"
                label="Full Name"
                size="small"
                error={errors.name && "value"}
                className="input-rounded"
                helperText={errors.name && `El campo 'nombre' es requerido`}
                variant="outlined"
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <BadgeOutlined />
                    </InputAdornment>
                  ),
                }}
              />
            </FormControl>
            <div className="flex w-full items-center space-x-4">
              <FormControl className=" w-52">
                <InputLabel id="select-type-identification">
                  Identification type
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
                  startAdornment={
                    <InputAdornment position="start">
                      <ArticleOutlined />
                    </InputAdornment>
                  }
                  // onChange={handleChange}
                >
                  <MenuItem value={1}>Cedula</MenuItem>
                  <MenuItem value={2}>Pasaporte</MenuItem>
                  <MenuItem value={3}>RNC</MenuItem>
                </Select>
                {/* <FormHelperText>With label + helper text</FormHelperText> */}
              </FormControl>
              <FormControl>
                <TextField
                  {...register("noIdentification", { required: true })}
                  id="outlined-adornment-identification"
                  label=" No. Identification"
                  size="small"
                  className="input-rounded text-md"
                  variant="outlined"
                  error={errors.noIdentification}
                  helperText={
                    errors.noIdentification &&
                    `El campo 'no.Identificaion es requerido'`
                  }
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
            <FormControl>
              <TextField
                {...register("phone")}
                id="outlined-adornment-phone"
                label="Phone number"
                size="small"
                className="input-rounded text-md"
                variant="outlined"
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <PhoneOutlined />
                    </InputAdornment>
                  ),
                }}
              />
            </FormControl>
            <FormControl className="w-full">
              <InputLabel id="select-type-contact">Contact type</InputLabel>
              <Select
                {...register("type")}
                labelId="select-type-contact"
                id="select-type-contact"
                value={contactType}
                onChange={(params) => setContactType(params.target.value)}
                size="small"
                className="rounded-xl text-md"
                label="Contact type"
                startAdornment={
                  <InputAdornment position="start">
                    <ContactsOutlined />
                  </InputAdornment>
                }
                // onChange={handleChange}
              >
                <MenuItem value={1}>Cliente</MenuItem>
                <MenuItem value={2}>Proveedor</MenuItem>
              </Select>
              {/* <FormHelperText>With label + helper text</FormHelperText> */}
            </FormControl>
            <FormControl>
              <ImagePoster
                images={images}
                setImages={setImages}
                setFile={setFile}
              />
            </FormControl>

            <div className="flex w-full justify-end space-x-4">
              <Button
                variant="contained"
                type="button"
                color="secondary"
                onClick={() => setOpen(false)}
                size="medium"
                className=" w-28 text-green-600 bg-white shadow-none hover:bg-transparent "
              >
                Cancel
              </Button>
              <Button
                variant="contained"
                type="submit"
                color="secondary"
                size="medium"
                className=" w-28 bg-green-600 text-white rounded-2xl"
              >
                Save
              </Button>
              {/* <Button
                variant="contained"
                type="submit"
                color="secondary"
                size="medium"
                className="w-28 bg-red-600 text-white rounded-2xl"
              >
                Cancel
              </Button> */}
            </div>
          </form>
        </Dialog>
      </div>
    </div>
  );
}
