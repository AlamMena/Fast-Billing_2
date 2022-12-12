import React from "react";
import PageHeader from "../../Components/Globals/PageHeader";
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
import { Add, DateRangeRounded, Edit, SellOutlined } from "@mui/icons-material";
import { MobileDatePicker } from "@mui/x-date-pickers";
import { useForm } from "react-hook-form";
import InvoiceDetail from "../../Components/CreateInvoice/InvoiceDetails";
import { toast } from "react-toastify";
import useAxios from "../../Axios/Axios";
import {
  InvoiceRecipient,
  InvoiceBeneficiary,
} from "../../Components/CreateInvoice/InvoiceContact";
import SelectPopUp from "../../Components/CreateInvoice/SelectPopUp";
import { useDispatch } from "react-redux";
import {
  updateDiscount,
  updateTaxes,
  addItem,
  updateStatus,
  updateCreationDate,
  resetState,
  updateDueDate,
  updateInvoiceType,
  updateWarehouse,
  updateNCFType,
} from "../../Store/InvoiceSlice";
import { useSelector } from "react-redux";
import SelectProducts from "../../Components/CreateInvoice/SelectProducts";
import ConfirmationForm from "../../Components/Globals/ConfirmationForm";
import Router from "next/router";
import PaymentPopUp from "../../Components/CreateInvoice/PaymentPopUp";

export default function CreateInvoice() {
  const [creationDate, setCreationDate] = useState(dayjs());
  const [dueDate, setDueDate] = useState(dayjs().add(1, "day"));
  const [openSelect, setOpenSelect] = useState(false);
  const [openProductPop, setProductPopUp] = useState(false);
  const [paymentPopUpOpen, setPaymentPopUp] = useState(false);

  const [type, setType] = useState("");
  const [confirmOpen, setConfirmOpen] = useState(false);
  const [data, setData] = useState({ isLoading: true, data: [] });
  const [status, setStatus] = useState("Pagado");
  const [ncfstypes, setNCFstypes] = useState([]);
  const [ncftype, setNCFtype] = useState();
  const [warehouse, setWarehouse] = useState([]);
  const [warehouseid, setWarehouseId] = useState();

  const [invoicetypes, setInvoicetypes] = useState([]);
  const [invoicetype, setInvoicetype] = useState();

  const [products, setProducts] = useState({ isLoading: true, data: [] });
  const invoice = useSelector((state) => state.invoice);
  const {
    discountAmount,
    subTotal,
    total,
    taxAmount,
    invoiceNo,
    details,
    recipient,
    typeId,
    ncfTypeId,
    totalPayed,
    warehouseId,
    payments,
  } = invoice;

  const { axiosInstance } = useAxios();
  const dispatch = useDispatch();
  const router = Router;

  const getNCFType = async () => {
    const queryFilters = `page=${1}&limit=${100}&value=${""}`;
    const { data: apiResponse } = await axiosInstance.get(
      `ncf/types?${queryFilters}`
    );
    setNCFstypes(apiResponse);
  };

  const getInvoiceType = async () => {
    const queryFilters = `page=${1}&limit=${100}&value=${""}`;
    const { data: apiResponse } = await axiosInstance.post(
      `invoice/types?${queryFilters}`
    );
    setInvoicetypes(apiResponse);
  };

  const getWarehouse = async () => {
    const queryFilters = `page=${1}&limit=${100}&value=${""}`;
    const { data: apiResponse } = await axiosInstance.get(
      `warehouses?${queryFilters}`
    );
    setWarehouse(apiResponse.data);
  };

  // handles

  const handleInvoiceError = (error) => {
    console.log(error);
    if (
      error.response.data.status === 400 &&
      error.response.data.message ===
        "The client does not have permission to this type of invoice"
    ) {
      setConfirmOpen(false);
      return "Este cliente no tiene permiso a este tipo de factura";
    }
    return "Oops, algo ha ocurrido";
  };

  const handleDiscount = (e) => {
    dispatch(updateDiscount(e));
  };

  const handleStatus = (value) => {
    setStatus(value);
    dispatch(updateStatus(value));
  };

  const handleNCFtype = (value, id) => {
    setNCFtype(value);
    dispatch(updateNCFType(id));
  };

  const handleWarehouse = (value, id) => {
    setWarehouseId(value);
    dispatch(updateWarehouse(id));
  };

  const handleInvoicetype = (value, id) => {
    setInvoicetype(value);
    dispatch(updateInvoiceType(id));
  };

  // Handle Creation and Due date of Invoice

  const handleCreationDateChange = (value) => {
    setCreationDate(value);
    dispatch(updateCreationDate(value.toString()));
  };

  const handleDueDateChange = (value) => {
    setDueDate(value);
    dispatch(updateDueDate(value.toString()));
  };

  // Location Routes

  const locationRoutes = [
    {
      text: "Inicio",
      link: "/",
    },
    {
      text: "Facturas",
      link: "/facturas",
    },
    {
      text: "Nueva Factura",
      link: "/facturas/crearfactura",
    },
  ];

  useEffect(() => {
    // setDataAsync();
    // setProductsAsync();
    getNCFType();
    getWarehouse();
    getInvoiceType();
    dispatch(updateCreationDate(creationDate.toString()));
    dispatch(updateDueDate(dueDate.toString()));
  }, []);

  const upserAsyncInvoice = async () => {
    try {
      if (
        Object.keys(recipient) <= 0 ||
        details.length <= 0 ||
        ncfTypeId === 0 ||
        warehouseId === 0 ||
        typeId === 0 ||
        payments[0].amount < total ||
        payments[0].amount === undefined
      ) {
        if (Object.keys(recipient) <= 0) {
          toast.error(`Porfavor agrega un recipiente`);
        }
        if (ncfTypeId === 0) {
          toast.error(`Porfavor agrega el tipo de NCF`);
        }
        if (typeId === 0) {
          toast.error(`Porfavor agrega el tipo de factura`);
        }
        if (warehouseId === 0) {
          toast.error(`Porfavor agrega el almacen`);
        }
        if (details.length <= 0) {
          toast.error(`Porfavor agrega al menos un detalle`);
        }
        if (payments[0].amount < total || payments[0].amount === undefined) {
          toast.error(
            `El monto a pagar tiene que ser igual o mayor al precio a pagar`
          );
        }
      } else {
        console.log(invoice);
        if (invoice.id !== undefined) {
          // logic
          // if the item exists
          await toast.promise(axiosInstance.put("/invoice", invoice), {
            pending: "Creando factura",
            success: "Genial!, tu factura ha sido actualizada.",
            error: {
              render({ data }) {
                return handleInvoiceError(data);
              },
            },
          });
          router.push("/facturas");
        } else {
          // if the item doesnt exists
          await toast.promise(axiosInstance.post("/invoice", invoice), {
            pending: "Actualizando factura",
            success: "Genial!, tu factura ha sido creada.",
            error: {
              render({ data }) {
                return handleInvoiceError(data);
              },
            },
          });
          router.push("/facturas");
        }
        // dispatch(resetState());
      }

      setConfirmOpen(false);
    } catch (error) {}
  };

  return (
    <div className="w-full md:px-0 px-4 md:pr-8 flex flex-col pb-5">
      <div className="flex w-full justify-between items-center pr-8 ">
        <div>
          <PageHeader
            header="Crear Factura"
            locationRoutes={locationRoutes}
            Icon={<SellOutlined />}
          />
        </div>
      </div>
      <SelectPopUp
        open={openSelect}
        setOpenSelect={setOpenSelect}
        type={type}
      />
      <SelectProducts
        data={products.data}
        open={openProductPop}
        setProductPop={setProductPopUp}
      />
      <ConfirmationForm
        open={confirmOpen}
        setOpen={setConfirmOpen}
        onConfirm={upserAsyncInvoice}
        message="Estas seguro que quieres crear la factura?"
      />
      <PaymentPopUp open={paymentPopUpOpen} setPaymentPopUp={setPaymentPopUp} />
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
                startIcon={<Edit />}
                className="h-10 font-bold"
                size="small"
                onClick={() => {
                  setOpenSelect(true), setType("recipiente");
                }}
              >
                Cambiar
              </Button>
            </div>
            <InvoiceRecipient />
          </Grid>
        </Grid>
        {/* Invoice settings Inputs */}
        <div className=" bg-neutral-100 flex items-center overflow-auto  ">
          <Grid container spacing={{ xs: 3 }} sx={{ padding: 3 }}>
            <Grid item xs={12} md={3}>
              <FormControl className="w-full">
                <InputLabel size="normal" htmlFor="outlined-adornment-name">
                  Numero de Factura
                </InputLabel>
                <OutlinedInput
                  defaultValue={invoiceNo}
                  disabled
                  id="outlined-adornment-name"
                  label="Numero de Factura"
                  size="large"
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
                  id="outlined-adornment-name"
                  label="Estatus"
                  size="normal"
                  type="number"
                  value={status}
                  className="rounded-xl"
                  variant="outlined"
                  startAdornment={
                    <InputAdornment position="start">
                      {/* <AttachMoney /> */}
                    </InputAdornment>
                  }
                >
                  <MenuItem
                    value={"Pagado"}
                    onClick={() => handleStatus("Pagado")}
                  >
                    Pagado
                  </MenuItem>
                  <MenuItem
                    value={"No Pagado"}
                    onClick={() => handleStatus("No Pagado")}
                  >
                    No Pagado
                  </MenuItem>
                  <MenuItem
                    value={"Overdue"}
                    onClick={() => handleStatus("Overdue")}
                  >
                    Overdue
                  </MenuItem>
                  <MenuItem
                    value={"Draft"}
                    onClick={() => handleStatus("Draft")}
                  >
                    Draft
                  </MenuItem>
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
            <Grid item xs={12} md={3}>
              <FormControl className="w-full">
                <InputLabel size="normal" htmlFor="outlined-adornment-name">
                  Tipo de NCF
                </InputLabel>
                <Select
                  id="outlined-adornment-name"
                  label="Tipo de NCF"
                  size="normal"
                  type="number"
                  value={ncftype}
                  className="rounded-xl"
                  variant="outlined"
                  startAdornment={
                    <InputAdornment position="start">
                      {/* <AttachMoney /> */}
                    </InputAdornment>
                  }
                >
                  {ncfstypes.length > 0 &&
                    ncfstypes.map((item, index) => {
                      return (
                        <MenuItem
                          key={index}
                          value={item.id}
                          onClick={() => handleNCFtype(item.name, item.id)}
                        >
                          {item.name}
                        </MenuItem>
                      );
                    })}
                  {/* <MenuItem
                    value={"Pagado"}
                    onClick={() => handleNCFtype("Pagado")}
                  >
                    Credito Fiscal
                  </MenuItem> */}
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12} md={3}>
              <FormControl className="w-full">
                <InputLabel size="normal" htmlFor="outlined-adornment-name">
                  Tipo de Factura
                </InputLabel>
                <Select
                  id="outlined-adornment-name"
                  label="Tipo de Factura"
                  size="normal"
                  type="number"
                  value={invoicetype}
                  className="rounded-xl"
                  variant="outlined"
                  startAdornment={
                    <InputAdornment position="start">
                      {/* <AttachMoney /> */}
                    </InputAdornment>
                  }
                >
                  {invoicetypes.length > 0 &&
                    invoicetypes.map((item, index) => {
                      return (
                        <MenuItem
                          key={index}
                          value={item.id}
                          onClick={() => handleInvoicetype(item.name, item.id)}
                        >
                          {item.name}
                        </MenuItem>
                      );
                    })}
                  {/* <MenuItem
                    value={"Pagado"}
                    onClick={() => handleNCFtype("Pagado")}
                  >
                    Credito Fiscal
                  </MenuItem> */}
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12} md={3}>
              <FormControl className="w-full">
                <InputLabel size="normal" htmlFor="outlined-adornment-name">
                  Almacen
                </InputLabel>
                <Select
                  id="outlined-adornment-name"
                  label="Almacen"
                  size="normal"
                  type="number"
                  value={warehouseid}
                  className="rounded-xl"
                  variant="outlined"
                  startAdornment={
                    <InputAdornment position="start">
                      {/* <AttachMoney /> */}
                    </InputAdornment>
                  }
                >
                  {warehouse.length > 0 &&
                    warehouse.map((item, index) => {
                      return (
                        <MenuItem
                          key={index}
                          value={item.id}
                          onClick={() => handleWarehouse(item.name, item.id)}
                        >
                          {item.name}
                        </MenuItem>
                      );
                    })}
                  {/* <MenuItem
                    value={"Pagado"}
                    onClick={() => handleNCFtype("Pagado")}
                  >
                    Credito Fiscal
                  </MenuItem> */}
                </Select>
              </FormControl>
            </Grid>
          </Grid>
        </div>
        {/* Details */}
        <div className="p-3">
          <span className=" text-xl text-neutral-400">Detalles:</span>
          <InvoiceDetail products={products} />
        </div>
        {details.length < 1 && (
          <span className="text-lg text-neutral-400 text-center p-2">
            No hay detalles
          </span>
        )}
        <Divider orientation="horizontal" variant="middle" flexItem></Divider>
        {/* Discount and Taxes */}
        <div className="p-2 pt-4 md:flex-row flex md:justify-between w-full flex-col-reverse ">
          <Button
            startIcon={<Add />}
            className="h-12 font-bold text-xs justify-start items-center "
            size="small"
            onClick={() => setProductPopUp(true)}
          >
            Anadir nuevo detalle
          </Button>
          <Button
            className="h-12 font-bold text-xs justify-start items-center "
            size="small"
            onClick={() => setPaymentPopUp(true)}
          >
            Informacion de pago
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
                disabled
                id="outlined-adornment-name"
                label="Taxes"
                onChange={(e) => dispatch(updateTaxes(e.target.value))}
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
              $
              {subTotal.toLocaleString("en-US", {
                minimumFractionDigits: 2,
              })}
            </span>
          </div>
          <div className="flex justify-end p-2">
            <span className="">Descuento:</span>
            <span className=" w-32 text-right overflow-hidden text-red-600">
              {(discountAmount <= 0 && <span>-</span>) || (
                <span>
                  -$
                  {discountAmount.toLocaleString("en-US", {
                    minimumFractionDigits: 2,
                  })}
                </span>
              )}
            </span>
          </div>
          <div className="flex justify-end p-2">
            <span className="">Taxes:</span>
            <span className=" w-32 text-right overflow-hidden">
              {(taxAmount <= 0 && <span>-</span>) || (
                <span>
                  $
                  {taxAmount.toLocaleString("en-US", {
                    minimumFractionDigits: 2,
                  })}{" "}
                </span>
              )}
            </span>
          </div>
          <div className="flex justify-end p-2 font-bold">
            <span className="">Precio Total:</span>
            <span className=" w-32 text-right overflow-hidden">
              $
              {total.toLocaleString("en-US", {
                minimumFractionDigits: 2,
              })}
            </span>
          </div>
          <div className="flex justify-end p-2">
            <span className="">Monto a pagar:</span>
            <span className=" w-32 text-right overflow-hidden">
              {(payments[0].amount <= 0 && <span>-</span>) || (
                <span>
                  $
                  {payments[0].amount.toLocaleString("en-US", {
                    minimumFractionDigits: 2,
                  })}
                </span>
              )}
            </span>
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
          onClick={() => dispatch(resetState())}
          className=" w-44 bg-neutral-200 hover:bg-neutral-300 font-extrabold h-12 text-xs rounded-2xl"
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
          onClick={() => setConfirmOpen(true)}
        >
          Crear y enviar
        </Button>
      </div>
    </div>
  );
}
