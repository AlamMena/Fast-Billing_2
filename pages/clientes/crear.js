import { useEffect, useState } from "react";
import useAxios from "../../Axios/Axios";
import ContactForm from "../../Components/Contacts/ContactForm";
import PageHeader from "../../Components/Globals/PageHeader";

export default function CreateContact() {
  const locationRoutes = [
    {
      text: "Inicio",
      link: "/",
    },
    {
      text: "Clientes",
      link: "/clientes",
    },
    {
      text: "Crear",
      link: "/clientes/crear",
    },
  ];

  return (
    <>
      <div className="col-span-12 flex w-full justify-between items-center pr-8">
        <div>
          <PageHeader header="Crear cliente" locationRoutes={locationRoutes} />
        </div>
      </div>
      <ContactForm></ContactForm>
    </>
  );
}
