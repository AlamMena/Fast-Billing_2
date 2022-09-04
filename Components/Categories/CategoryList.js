import React from "react";
import {
  DeleteOutline,
  EditOutlined,
  SearchRounded,
} from "@mui/icons-material";
import {
  Autocomplete,
  InputAdornment,
  OutlinedInput,
  Tab,
  Tabs,
  TextField,
} from "@mui/material";
import { useState } from "react";
import { DataGrid, GridToolBar } from "@mui/x-data-grid";
import Alert from "../Globals/Alert";
import StatusRow from "../Globals/StatusRow";

export default function CategoryList({ setFormOpen, data }) {
  const [value, setValue] = useState("one");

  const columns = [
    {
      field: "id",
      width: 90,
      headerName: "Id",
    },
    {
      field: "name",
      width: 460,
      headerName: "Nombre de Categoria",
    },
    {
      field: "isDelete",
      width: "150",
      headerName: "Estatus",
      renderCell: (cells) => {
        return <StatusRow active={cells.row.isDelete} />;
      },
    },

    {
      field: "Acciones",
      sortable: false,
      width: 150,
      renderCell: (cells) => {
        return (
          <div className="flex space-x-4">
            <a
              onClick={() => {
                setFormOpen(true);
                // setFormData(cells.row);
                // Alert.fire({
                //   title: <strong>Good job!</strong>,
                //   html: <i>You clicked the button!</i>,
                //   icon: "success",
                // });
              }}
              className="text-green-400 cursor-pointer"
            >
              <EditOutlined className="text-green-400 mx-2" />
              Edit
            </a>
            <a
              onClick={() => {
                setConfirmOpen(true);
                setItemToDelete(cells.row);
              }}
              className="text-red-500 cursor-pointer"
            >
              <DeleteOutline className="text-red-500 mx-2" /> Delete
            </a>
          </div>
        );
      },
    },
  ];

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <>
      <div className="flex flex-col h-full  w-full shadow-lg rounded-xl my-3">
        <div className=" bg-slate-200 rounded-t-lg">
          <Tabs
            value={value}
            onChange={handleChange}
            className="text-neutral-500"
            TabIndicatorProps={{
              style: {
                backgroundColor: "rgb(22 163 74 / var(--tw-text-opacity))",
              },
            }}
            aria-label="secondary tabs example"
          >
            <Tab className=" capitalize" value="one" label="Todos" active />
            <Tab className=" capitalize" value="two" label="Activos" />
            <Tab className=" capitalize" value="three" label="Desactivados" />
          </Tabs>
        </div>
        <div className="flex items-center space-x-4 px-4 my-4">
          <OutlinedInput
            id="input-with-icon-adornment"
            className="input-rounded rounded-xl"
            fullWidth
            placeholder="Buscar categorias..."
            startAdornment={
              <InputAdornment position="start">
                <SearchRounded className="text-slate-400" />
              </InputAdornment>
            }
          />
        </div>

        <div className="h-96 w-full my-2">
          <DataGrid
            components={{ Toolbar: GridToolBar }}
            onSelectionModelChange={(row) => {
              Alert.fire({
                title: <strong>Success!</strong>,
                html: <span>{row.map((item) => item)}</span>,
                icon: "success",
              });
            }}
            rows={data.data}
            columns={columns}
            className="p-2"
            pageSize={5}
            loading={data.isLoading}
            rowsPerPageOptions={[5]}
            checkboxSelection
            disableSelectionOnClick
            experimentalFeatures={{ newEditingApi: true }}
          />
        </div>
      </div>
    </>
  );
}
