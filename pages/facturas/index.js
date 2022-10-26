import React from "react";
import PageHeader from "../../Components/Globals/PageHeader";
import { Button } from "@mui/material";
import { Add } from "@mui/icons-material";
import Router from "next/router";
import InvoiceList from "../../Components/CreateInvoice/InvoiceList";
import useAxios from "../../Axios/Axios";
import { useState, useEffect } from "react";
import { toast } from "react-toastify";

export default function Invoices() {
  const [invoices, setInvoices] = useState({
    isLoading: true,
    data: [],
  });

  const { axiosInstance } = useAxios();

  const setInvoicesAsync = async () => {
    try {
      const response = await axiosInstance.get("v1/invoices?limit=200&page=1");
      setInvoices({ isLoading: false, data: response.data.data });
      console.log(response);
    } catch (error) {
      toast.error(`Opps!, something went wrong${error}`);
    }
  };

  const locationRoutes = [
    {
      text: "Inicio",
      link: "/",
    },
    {
      text: "Facturas",
      link: "/facturas",
    },
  ];

  useEffect(() => {
    setInvoicesAsync();
  }, []);

  return (
    <>
      <div className="w-full md:px-0 px-4 md:pr-8 flex flex-col">
        <div className="flex w-full justify-between items-center pr-8">
          <div>
            <PageHeader header="Facturas" locationRoutes={locationRoutes} />
          </div>
          <div className="flex">
            <Button
              className=" z-auto rounded-xl py-2 bg-green-600 hover:bg-green-800"
              variant="contained"
              onClick={() => Router.push("./facturas/crearfactura")}
              startIcon={<Add className="text-white" />}
            >
              <span className="text-sm whitespace-nowrap text-neutral-50 capitalize font-bold">
                Nueva factura
              </span>
            </Button>
          </div>
        </div>
        {/* <CategoryList
          setFormOpen={setFormOpen}
          data={categories}
          setFormData={setFormData}
          setItemToDelete={setItemToDelete}
          setConfirmOpen={setConfirmOpen}
        /> */}
        <InvoiceList data={invoices} />
      </div>
    </>
  );
}
