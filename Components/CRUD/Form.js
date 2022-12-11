import { ApartmentRounded } from "@mui/icons-material";
import { useEffect } from "react";
import { Dialog, Divider, FormControl, TextField, Button } from "@mui/material";
import { Controller, useForm } from "react-hook-form";

export default function Form({ onSave, open, setOpen, data, fields }) {
  const {
    handleSubmit,
    control,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: data,
  });

  const onSubmit = async (data) => {
    await onSave(data);
    // alert(JSON.stringify(data));
  };

  useEffect(() => {
    reset(data);
  }, [data]);

  return (
    <div className="w-full h-full">
      <div className=" rounded-2xl ">
        <Dialog
          open={open}
          onClose={() => setOpen(false)}
          PaperProps={{
            style: { borderRadius: 15 },
          }}
          maxWidth="sm"
        >
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="flex flex-col p-8 space-y-6 px-10"
          >
            <div>
              <div className="flex items-center mb-2">
                <div className="bg-neutral-100 rounded-full p-2">
                  <ApartmentRounded className="text-green-400" />
                </div>
                <h2 className="text-xl font-bold ml-2">Sucursales </h2>
              </div>
              <span className="text-sm text-black text-opacity-50">
                Crea o edita tus sucursales y manten tu empresa organizada.
              </span>
              <Divider className="mt-4" />
            </div>

            {fields.map((item, index) => {
              return (
                <Controller
                  key={index}
                  control={control}
                  name={item.name}
                  rules={item.validation}
                  render={({ field, fieldState: { error } }) => (
                    <TextField
                      {...field}
                      fullWidth={field.fullWidth}
                      multiline={item.multiline}
                      minRows={item.multiline && 4}
                      label={item.label}
                      InputLabelProps={{ shrink: true }}
                      placeholder={item.placeholder}
                      className="input-rounded"
                      variant="outlined"
                      error={error}
                      helperText={error && `El campo no es valido`}
                    />
                  )}
                />
              );
            })}

            <div className="flex w-full justify-end">
              <Button
                variant="contained"
                type="button"
                color="secondary"
                onClick={() => setOpen(false)}
                size="medium"
                className=" w-28 text-green-600 bg-white hover:bg-white shadow-none hover:shadow-none "
              >
                Cancelar
              </Button>
              <Button
                variant="contained"
                type="submit"
                color="secondary"
                size="medium"
                className=" w-28 bg-green-600 text-white rounded-2xl"
              >
                Guardar
              </Button>
            </div>
          </form>
        </Dialog>
      </div>
    </div>
  );
}
