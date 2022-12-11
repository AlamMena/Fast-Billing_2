import React from "react";
import CPage from "../../Components/CRUD/CPage";

export default function Branch() {
  const locationRoutes = [
    {
      text: "Inicio",
      link: "/",
    },
    {
      text: "Sucursales",
      link: "/sucursales",
    },
  ];
  const cols = [
    {
      field: "name",
      headerName: "Sucursal",
      minWidth: 270,
      flex: 1,
    },
    {
      field: "location",
      headerName: "Ubicacion",
      minWidth: 270,
      flex: 1,
    },
    {
      field: "phoneNumber",
      headerName: "Numero de Telefono",
      minWidth: 270,
      flex: 1,
    },
  ];

  const fields = [
    {
      name: "name",
      placeholder: "sucursal - 001",
      label: "Nombre",
      validation: {
        required: true,
      },
      fullWidth: false,
    },
    {
      name: "location",
      placeholder: "Santo Domingo #0001",
      label: "Ubicacion",
      validation: {
        required: true,
      },
      fullWidth: false,
    },
    {
      name: "phoneNumber",
      placeholder: "809-001-01111",
      validation: {
        required: true,
      },
      label: "Telefono",
      fullWidth: false,
    },
    {
      name: "description",
      placeholder: "sucursal para manejar empleados ...",
      label: "Descripcion",
      multiline: true,
      fullWidth: false,
    },
  ];
  return (
    <CPage
      cols={cols}
      fields={fields}
      getUrl={"branches"}
      updateUrl={"branch"}
      postUrl={"branch"}
      deleteUrl={"branch"}
      createButtonMessage={"Nueva sucursal"}
      deleteConfirmMessage="¿Estas seguro que deseas eliminar esta sucursal?"
      headerMessage="Cada vez que un negocio se expande trae mayores desafíos para todos los niveles de operación. Maneja tus sucursales y cada uno de sus niveles operativos."
      succesUpsertMessage={"Sucursal guardada exitosamente!"}
      successDeleteMessage={"Sucursal eliminada exitosamente!"}
      headerText={"Sucursales"}
      locationRoutes={locationRoutes}
    />
  );
}
