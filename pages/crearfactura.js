import React from "react";
import PageHeader from "../components/Globals/PageHeader";
import dayjs from "dayjs";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import {
  Button,
  Divider,
  FormControl,
  Grid,
  InputLabel,
  OutlinedInput,
  InputAdornment,
  Select,
  MenuItem,
  TextField,
} from "@mui/material";
import { useState, useEffect } from "react";
import { Add, DateRangeRounded, Edit } from "@mui/icons-material";
import { MobileDatePicker } from "@mui/x-date-pickers";
import { useForm } from "react-hook-form";
import InvoiceDetail from "../Components/CreateInvoice/InvoiceDetails";
import { toast } from "react-toastify";
import useAxios from "../Axios/Axios";
import {
  InvoiceRecipient,
  InvoiceBeneficiary,
} from "../Components/CreateInvoice/InvoiceContact";
import SelectPopUp from "../Components/CreateInvoice/SelectPopUp";
import { useDispatch } from "react-redux";
import { updateDiscount } from "../Store/InvoiceSlice";
import { useSelector } from "react-redux";

export default function CreateInvoice() {
  const { handleSubmit, register, reset } = useForm({});
  const [creationDate, setCreationDate] = useState(dayjs(undefined));
  const [dueDate, setDueDate] = useState(dayjs(undefined));
  const [openSelect, setOpenSelect] = useState(false);
  const [type, setType] = useState("");
  const [data, setData] = useState({ isLoading: true, data: [] });
  const invoice = useSelector((state) => state.invoice);
  const { discountAmount, subTotal, total } = invoice;

  const { axiosInstance } = useAxios();
  const dispatch = useDispatch();

  const setDataAsync = async () => {
    try {
      const response = await axiosInstance.get("v1/contacts?page=1&limit=200");
      setData({ isLoading: false, data: response.data });
    } catch (error) {
      toast.error(`Opps!, something went wrong${error}`);
      setData({ isLoading: false, data: [] });
    }
  };

  const handleDiscount = (e) => {
    dispatch(updateDiscount(e));
  };

  // Handle Creation and Due date of Invoice

  const handleCreationDateChange = (value) => {
    setCreationDate(value);
  };

  const handleDueDateChange = (value) => {
    setDueDate(value);
  };

  // Location Routes

  const locationRoutes = [
    {
      text: "Dashboard",
      link: "/",
    },
    {
      text: "Facturas",
      link: "/User",
    },
    {
      text: "Nueva Factura",
      link: "/User/list",
    },
  ];

  useEffect(() => {
    setDataAsync();
  }, []);
  return (
    <div className="w-full md:px-0 px-4 md:pr-8 flex flex-col pb-5">
      <div className="flex w-full justify-between items-center pr-8 ">
        <div>
          <PageHeader header="Crear Factura" locationRoutes={locationRoutes} />
        </div>
      </div>
      <SelectPopUp
        open={openSelect}
        setOpenSelect={setOpenSelect}
        type={type}
        contactos={data.data}
      />
      {/* Invoice  */}
      <div className="flex flex-col h-full w-full shadow-lg rounded-xl my-3">
        {/* Sender and Receiver */}
        <Grid container className="flex justify-between  px-8 py-3">
          <Grid item className="w-full" xs={12} md={6}>
            <div className=" flex items-center justify-between">
              <span className="text-neutral-500 text-lg">De:</span>
              <Button
                startIcon={<Edit />}
                className="h-10 font-bold"
                size="small"
                onClick={() => {
                  setOpenSelect(true), setType("beneficiente");
                }}
              >
                Cambiar
              </Button>
            </div>
            <InvoiceBeneficiary />
          </Grid>
          <Divider
            orientation="vertical"
            variant="middle"
            flexItem
            md={1}
            sx={{ display: { xs: "none", md: "block", lg: "block" } }}
          ></Divider>

          <Grid item className="w-full" xs={12} md={5}>
            <Divider
              light
              orientation="horizontal"
              sx={{
                width: "100%",
                display: { xs: "flex", md: "none", lg: "none" },
              }}
            ></Divider>
            <div className=" flex items-center justify-between">
              <span className="text-neutral-500 text-lg">Para:</span>
              <Button
                startIcon={<Add />}
                className="h-10 font-bold"
                size="small"
                onClick={() => {
                  setOpenSelect(true), setType("recipiente");
                }}
              >
                Anadir
              </Button>
            </div>
            <InvoiceRecipient />
          </Grid>
        </Grid>
        {/* Invoice settings Inputs */}
        <div className=" w-full bg-neutral-100 flex items-center">
          <Grid container spacing={{ xs: 3 }} sx={{ padding: 3 }}>
            <Grid item xs={12} md={3}>
              <FormControl className="w-full">
                <InputLabel size="normal" htmlFor="outlined-adornment-name">
                  Invoice Number
                </InputLabel>
                <OutlinedInput
                  {...register("invoiceNo")}
                  id="outlined-adornment-name"
                  label="Invoice Number"
                  size="large"
                  type="number"
                  className="rounded-xl"
                  variant="outlined"
                  startAdornment={
                    <InputAdornment position="start">
                      {/* <AttachMoney /> */}
                    </InputAdornment>
                  }
                />
              </FormControl>
            </Grid>
            <Grid item xs={12} md={3}>
              <FormControl className="w-full">
                <InputLabel size="normal" htmlFor="outlined-adornment-name">
                  Estatus
                </InputLabel>
                <Select
                  {...register("Status")}
                  id="outlined-adornment-name"
                  label="Estatus"
                  size="large"
                  type="number"
                  value={10}
                  className="rounded-xl"
                  variant="outlined"
                  startAdornment={
                    <InputAdornment position="start">
                      {/* <AttachMoney /> */}
                    </InputAdornment>
                  }
                >
                  <MenuItem value={10}>Pagado</MenuItem>
                  <MenuItem value={20}>No Pagado</MenuItem>
                  <MenuItem value={30}>Overdue</MenuItem>
                  <MenuItem value={40}>Draft</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12} md={3}>
              <FormControl className="w-full">
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <InputLabel size="normal" htmlFor="outlined-adornment-name">
                    Fecha de creacion
                  </InputLabel>
                  <MobileDatePicker
                    label="Fecha de creacion"
                    inputFormat="MM/DD/YYYY"
                    value={creationDate}
                    className="rounded-xl"
                    onChange={handleCreationDateChange}
                    renderInput={(params) => (
                      <OutlinedInput
                        endAdornment={
                          <InputAdornment position="start">
                            <DateRangeRounded />
                          </InputAdornment>
                        }
                        {...params}
                      />
                    )}
                  />
                </LocalizationProvider>
              </FormControl>
            </Grid>
            <Grid item xs={12} md={3}>
              <FormControl className="w-full">
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <InputLabel size="normal" htmlFor="outlined-adornment-name">
                    Fecha de vencimiento
                  </InputLabel>
                  <MobileDatePicker
                    label="Fecha de vencimiento"
                    inputFormat="MM/DD/YYYY"
                    value={dueDate}
                    className="rounded-xl"
                    onChange={(value) => handleDueDateChange(value)}
                    renderInput={(params) => (
                      <OutlinedInput
                        endAdornment={
                          <InputAdornment position="start">
                            <DateRangeRounded />
                          </InputAdornment>
                        }
                        {...params}
                      />
                    )}
                  />
                </LocalizationProvider>
              </FormControl>
            </Grid>
          </Grid>
        </div>
        {/* Details */}
        <div className="p-5">
          <span className=" text-xl text-neutral-400">Detalles:</span>
          <InvoiceDetail />
        </div>
        <Divider orientation="horizontal" variant="middle" flexItem></Divider>
        {/* Discount and Taxes */}
        <div className="p-2 pt-4 md:flex-row flex md:justify-between w-full flex-col-reverse ">
          <Button
            startIcon={<Add />}
            className="h-12 font-bold text-xs justify-start items-center "
            size="small"
          >
            Anadir nuevo detalle
          </Button>
          <div className=" flex-col md:flex md:flex-row md:space-y-0 md:space-x-2 space-y-2">
            <FormControl className="w-full">
              <InputLabel size="small" htmlFor="outlined-adornment-name">
                Descuento
              </InputLabel>
              <OutlinedInput
                id="outlined-adornment-name"
                label="Descuento"
                size="small"
                onChange={(e) => handleDiscount(e.target.value)}
                type="number"
                className="rounded-xl"
                variant="outlined"
              />
            </FormControl>
            <FormControl className="w-full">
              <InputLabel size="small" htmlFor="outlined-adornment-name">
                Taxes
              </InputLabel>
              <OutlinedInput
                {...register("discount")}
                id="outlined-adornment-name"
                label="Taxes"
                type="number"
                size="small"
                className="rounded-xl"
                variant="outlined"
              />
            </FormControl>
          </div>
        </div>
        {/* Totals */}
        <div className=" p-4 flex flex-col">
          <div className="flex justify-end p-2">
            <span className="">Subtotal:</span>
            <span className=" w-32 text-right overflow-hidden">
              ${subTotal}
            </span>
          </div>
          <div className="flex justify-end p-2">
            <span className="">Descuento:</span>
            <span className=" w-32 text-right overflow-hidden text-red-600">
              -${discountAmount}
            </span>
          </div>
          <div className="flex justify-end p-2">
            <span className="">Taxes:</span>
            <span className=" w-32 text-right overflow-hidden">-</span>
          </div>
          <div className="flex justify-end p-2 font-bold">
            <span className="">Precio Total:</span>
            <span className=" w-32 text-right overflow-hidden">${total}</span>
          </div>
        </div>
      </div>
      {/* Buttons */}
      <div className="px-5 p-2 justify-end flex space-x-2">
        <Button
          variant="contained"
          sx={{ textTransform: "none" }}
          type="submit"
          size="large"
          className=" w-44 bg-neutral-200 hover:bg-neutral-300 font-extrabold h-12 text-sm rounded-2xl"
        >
          Salvar como Draft
        </Button>

        <Button
          variant="contained"
          sx={{ textTransform: "none" }}
          type="submit"
          color="secondary"
          size="large"
          className=" w-44 bg-green-600 text-white font-extrabold h-12 rounded-2xl"
        >
          Crear y enviar
        </Button>
      </div>
    </div>
  );
}
