import React from "react";
import CPage from "../../components/CRUD/CPage";

export default function Branch() {
  const locationRoutes = [
    {
      text: "Inicio",
      link: "/",
    },
    {
      text: "Subcategorias",
      link: "/subcategorias",
    },
  ];
  const cols = [
    {
      field: "name",
      headerName: "Subcategoria",
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
      placeholder: "Subcategoria - 001",
      label: "Nombre",
      validation: {
        required: true,
      },
      fullWidth: false,
    },
    {
      name: "description",
      placeholder: "Subcategorias para productos x ...",
      label: "Descripcion",
      multiline: true,
      fullWidth: false,
    },
  ];
  return (
    <CPage
      cols={cols}
      fields={fields}
      getUrl={"subcategories"}
      updateUrl={"subcategory"}
      postUrl={"subcategory"}
      deleteUrl={"subcategory"}
      createButtonMessage={"Nueva subcategoria"}
      deleteConfirmMessage="¿Estas seguro que deseas eliminar esta subcategoria?"
      headerMessage="Cada vez que un negocio se expande trae mayores desafíos para todos los niveles de operación. Maneja tus subcategorias y cada uno de sus niveles operativos."
      succesUpsertMessage={"Subcategoria guardada exitosamente!"}
      successDeleteMessage={"Subcategoria eliminada exitosamente!"}
      headerText={"Subcategorias"}
      locationRoutes={locationRoutes}
    />
  );
}
