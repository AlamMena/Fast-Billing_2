import React from "react";
import CPage from "../../components/CRUD/CPage";

export default function Branch() {
  const locationRoutes = [
    {
      text: "Inicio",
      link: "/",
    },
    {
      text: "Categorias",
      link: "/categorias",
    },
  ];
  const cols = [
    {
      field: "name",
      headerName: "Categoria",
      minWidth: 270,
      flex: 1,
    },
    {
      field: "description",
      headerName: "Descripcion",
      minWidth: 270,
      flex: 1,
    },
  ];

  const fields = [
    {
      name: "name",
      placeholder: "Categoria - 001",
      label: "Nombre",
      validation: {
        required: true,
      },
      fullWidth: false,
    },
    {
      name: "description",
      placeholder: "Categorias para productos x ...",
      label: "Descripcion",
      multiline: true,
      fullWidth: false,
    },
  ];
  return (
    <CPage
      cols={cols}
      fields={fields}
      getUrl={"categories"}
      updateUrl={"category"}
      postUrl={"category"}
      deleteUrl={"category"}
      createButtonMessage={"Nueva categoria"}
      deleteConfirmMessage="¿Estas seguro que deseas eliminar esta categoria?"
      headerMessage="Cada vez que un negocio se expande trae mayores desafíos para todos los niveles de operación. Maneja tus categorias y cada uno de sus niveles operativos."
      succesUpsertMessage={"Categoria guardada exitosamente!"}
      successDeleteMessage={"Categoria eliminada exitosamente!"}
      headerText={"Categorias"}
      locationRoutes={locationRoutes}
    />
  );
}
