import { ApartmentRounded } from "@mui/icons-material";
import { useEffect } from "react";
import { Dialog, Divider, FormControl, TextField, Button } from "@mui/material";
import { useForm } from "react-hook-form";

export default function BranchForm({ onSave, open, setOpen, data }) {
  const {
    handleSubmit,
    register,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: data,
  });

  const onSubmit = async (data) => {
    await onSave(data);
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

            <FormControl fullWidth>
              <TextField
                {...register("name", { required: true })}
                id="outlined-adornment-phone"
                label="Nombre"
                InputLabelProps={{ shrink: true }}
                placeholder="Sucursal 001-000"
                className="input-rounded"
                variant="outlined"
                error={errors.name}
                helperText={errors.name && `El campo no es valido`}
              />
            </FormControl>
            <FormControl fullWidth>
              <TextField
                {...register("phoneNumber", { required: true })}
                id="outlined-adornment-phone"
                label="Phone"
                InputLabelProps={{ shrink: true }}
                placeholder="(809)-000-0000"
                className="input-rounded"
                variant="outlined"
                error={errors.phone}
                helperText={errors.phone && `El campo no es valido`}
              />
            </FormControl>
            <FormControl fullWidth>
              <TextField
                {...register("location", { required: true })}
                id="outlined-adornment-phone"
                label="Ubicacion"
                InputLabelProps={{ shrink: true }}
                placeholder="St Nw 001-2220"
                className="input-rounded"
                variant="outlined"
                error={errors.location}
                helperText={errors.location && `El campo no es valido`}
              />
            </FormControl>
            <FormControl fullWidth>
              <TextField
                {...register("description", { required: true })}
                multiline
                minRows={4}
                id="outlined-adornment-phone"
                label="Descripcion"
                InputLabelProps={{ shrink: true }}
                placeholder="Sucursal administrativa"
                className="input-rounded"
                variant="outlined"
                error={errors.description}
                helperText={errors.description && `El campo no es valido`}
              />
            </FormControl>
            <div className="flex w-full justify-end">
              <Button
                variant="contained"
                type="button"
                color="secondary"
                onClick={() => setOpen(false)}
                size="medium"
                className=" w-28 text-green-600 bg-white hover:bg-white shadow-none hover:shadow-none "
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
                Guardar
              </Button>
            </div>
          </form>
        </Dialog>
      </div>
    </div>
  );
}
