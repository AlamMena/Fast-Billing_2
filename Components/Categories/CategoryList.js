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
import { useState, useEffect } from "react";
import { DataGrid, GridToolBar } from "@mui/x-data-grid";
import Alert from "../Globals/Alert";
import StatusRow from "../Globals/StatusRow.js";

export default function CategoryList({
  setFormOpen,
  data,
  setItemToDelete,
  setConfirmOpen,
  setFormData,
}) {
  const [statusTab, setStatusTab] = useState("All");
  const [dataFiltered, setDataFiltered] = useState(data);

  const columns = [
    {
      field: "Name",
      width: 460,
      headerName: "Nombre",
    },
    {
      field: "IsDeleted",
      width: "150",
      headerName: "Estatus",
      renderCell: (cells) => {
        return <StatusRow active={!cells.row.IsDeleted} />;
      },
    },

    {
      field: "Acciones",
      sortable: false,
      width: 190,
      renderCell: (cells) => {
        return (
          <div className="flex space-x-4">
            <a
              onClick={() => {
                setFormData(cells.row);
                setFormOpen(true);
              }}
              className="text-green-400 cursor-pointer"
            >
              <EditOutlined className="text-green-400 mx-2" />
              Edit
            </a>
            <a
              onClick={() => {
                setItemToDelete(cells.row);
                setConfirmOpen(true);
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

  const handleTabChange = (e, value) => {
    setStatusTab(value);
    const newData = getDataFilterdByTab(value);
    setDataFiltered(newData);
  };

  const getDataFilterdByTab = (value) => {
    let newData = { isLoading: true, data: [] };

    if (value === "All") {
      newData = data;
    } else if (value === "Active") {
      newData = {
        isLoading: false,
        data: data.data.filter((item) => !item.IsDeleted),
      };
    } else if (value === "Disable") {
      newData = {
        isLoading: false,
        data: data.data.filter((item) => item.IsDeleted),
      };
    }
    return newData;
  };

  useEffect(() => {
    const newData = getDataFilterdByTab(statusTab);
    setDataFiltered(newData);
  }, [data]);

  return (
    <>
      <div className="flex flex-col h-full  w-full shadow-lg rounded-xl my-3">
        <div className=" bg-slate-200 rounded-t-lg">
          <Tabs
            value={statusTab}
            onChange={handleTabChange}
            className="text-neutral-500"
            TabIndicatorProps={{
              style: {
                backgroundColor: "rgb(22 163 74 / var(--tw-text-opacity))",
              },
            }}
            aria-label="secondary tabs example"
          >
            <Tab className=" capitalize" value="All" label="Todos" active />
            <Tab className=" capitalize" value="Active" label="Activos" />
            <Tab className=" capitalize" value="Disable" label="Inactivos" />
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
            getRowId={(row) => row._id}
            onSelectionModelChange={(row) => {
              Alert.fire({
                title: <strong>Success!</strong>,
                html: <span>{row.map((item) => item)}</span>,
                icon: "success",
              });
            }}
            rows={dataFiltered.data}
            columns={columns}
            className="p-2"
            pageSize={5}
            loading={dataFiltered.isLoading}
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
