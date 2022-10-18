import { useEffect, useState } from "react";
import useAxios from "../../Axios/Axios";
import ContactForm from "../../Components/Contacts/ContactForm";
import PageHeader from "../../Components/Globals/PageHeader";
import SuplierForm from "../../Components/Supliers/SupliersForm";

export default function CreateSuplier() {
  const locationRoutes = [
    {
      text: "Inicio",
      link: "/",
    },
    {
      text: "Suplidores",
      link: "/suplidores",
    },
    {
      text: "Crear",
      link: "/suplidores/crear",
    },
  ];

  return (
    <>
      <div className="col-span-12 flex w-full justify-between items-center pr-8">
        <div>
          <PageHeader header="Crear suplidor" locationRoutes={locationRoutes} />
        </div>
      </div>
      <SuplierForm />
    </>
  );
}
