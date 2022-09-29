import { useEffect, useState } from "react";
import useAxios from "../../Axios/Axios";
import ContactForm from "../../components/Contacts/ContactForm";
import PageHeader from "../../Components/Globals/PageHeader";

export default function CreateContact() {
  const locationRoutes = [
    {
      text: "home",
      link: "/",
    },
    {
      text: "contactos",
      link: "/contactos",
    },
    {
      text: "crear",
      link: "/contactos/crear",
    },
  ];

  return (
    <>
      <div className="col-span-12 flex w-full justify-between items-center pr-8">
        <div>
          <PageHeader
            header={"Crear contacto"}
            locationRoutes={locationRoutes}
          />
        </div>
      </div>
      <ContactForm></ContactForm>
    </>
  );
}
