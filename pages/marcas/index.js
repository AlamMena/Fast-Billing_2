import { MuseumOutlined } from "@mui/icons-material";
import React from "react";
import CPage from "../../Components/CRUD/CPage";

export default function Branch() {
  const locationRoutes = [
    {
      text: "Inicio",
      link: "/",
    },
    {
      text: "Categorias",
      link: "/marcas",
    },
  ];
  const cols = [
    {
      field: "name",
      headerName: "Marca",
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
      placeholder: "marca - 001",
      label: "Nombre",
      validation: {
        required: true,
      },
      fullWidth: false,
    },
    {
      name: "description",
      placeholder: "marca para productos x ...",
      label: "Descripcion",
      multiline: true,
      fullWidth: false,
    },
  ];
  return (
    <CPage
      cols={cols}
      fields={fields}
      getUrl={"brands"}
      updateUrl={"brand"}
      postUrl={"brand"}
      deleteUrl={"brand"}
      createButtonMessage={"Nueva marca"}
      deleteConfirmMessage="¿Estas seguro que deseas eliminar esta marca?"
      headerMessage="Cada vez que un negocio se expande trae mayores desafíos para todos los niveles de operación. Maneja tus marca y cada uno de sus niveles operativos."
      succesUpsertMessage={"Marca guardada exitosamente!"}
      successDeleteMessage={"Marca eliminada exitosamente!"}
      headerText={"Marcas"}
      icon={<MuseumOutlined />}
      locationRoutes={locationRoutes}
    />
  );
}
