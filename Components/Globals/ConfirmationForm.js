import { Button, Dialog } from "@mui/material";

export default function ConfirmationForm({
  onConfirm,
  open,
  setOpen,
  message,
}) {
  return (
    <Dialog
      open={open}
      PaperProps={{
        style: { borderRadius: 15 },
      }}
      onClose={() => setOpen(false)}
    >
      <div className="w-96 p-8">
        <h2>{message} </h2>
        <div className="flex space-x-4 justify-end w-full mt-7">
          <Button className="text-green-600" onClick={() => setOpen(false)}>
            Cancel
          </Button>
          <Button
            onClick={() => onConfirm()}
            variant="contained"
            type="submit"
            color="secondary"
            size="medium"
            className=" w-28 bg-green-600 text-white rounded-2xl"
          >
            Confirmar
          </Button>
        </div>
      </div>
    </Dialog>
  );
}
