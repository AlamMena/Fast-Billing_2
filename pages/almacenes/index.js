import React from "react";
import CPage from "../../components/CRUD/CPage";

export default function Branch() {
  const locationRoutes = [
    {
      text: "Inicio",
      link: "/",
    },
    {
      text: "Almacenes",
      link: "/alamcenes",
    },
  ];
  const cols = [
    {
      field: "name",
      headerName: "Almacen",
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
      placeholder: "Almacen - 001",
      label: "Nombre",
      validation: {
        required: true,
      },
      fullWidth: false,
    },
    {
      name: "description",
      placeholder: "Almacen para productos de tipo - x ...",
      label: "Descripcion",
      multiline: true,
      fullWidth: false,
    },
  ];
  return (
    <CPage
      cols={cols}
      fields={fields}
      getUrl={"warehouses"}
      updateUrl={"warehouse"}
      postUrl={"warehouse"}
      deleteUrl={"warehouse"}
      createButtonMessage={"Nuevo almacen"}
      deleteConfirmMessage="¿Estas seguro que deseas eliminar este almacen?"
      headerMessage="Cada vez que un negocio se expande trae mayores desafíos para todos los niveles de operación. Maneja tus almacenes y cada uno de sus niveles operativos."
      succesUpsertMessage={"Almacen guardado exitosamente!"}
      successDeleteMessage={"Almacen eliminado exitosamente!"}
      headerText={"Almacenes"}
      locationRoutes={locationRoutes}
    />
  );
}
