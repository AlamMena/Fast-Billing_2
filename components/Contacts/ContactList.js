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
import { DataGrid, GridToolBar } from "@mui/x-data-grid";
import { useEffect, useState } from "react";

import Alert from "../Globals/Alert.js";
import StatusRow from "../Globals/StatusRow.js";

export default function ContactList({
  setFormOpen,
  setFormData,
  data,
  setItemToDelete,
  setConfirmOpen,
}) {
  const [statusTab, setStatusTab] = useState("All");
  const [dataFiltered, setDataFiltered] = useState(data);
  const [typeFilter, setTypeFilter] = useState({ label: "Todos", id: 0 });

  useEffect(() => {
    const newData = getDataFilterdByTab(statusTab);
    setDataFiltered(newData);
  }, [data]);

  const columns = [
    {
      field: "_id",
      width: 120,
      headerName: "Id",
    },
    {
      field: "name",
      width: "300",
      headerName: "Contacto",
      renderCell: (cells) => {
        return (
          <div className="flex space-x-4 items-center">
            <img
              className=" rounded-xl w-10 h-10"
              src={
                cells.row.imageUrl
                  ? cells.row.imageUrl
                  : "https://cdn-icons-png.flaticon.com/128/3135/3135768.png"
              }
            />
            <span className="font-semibold ">{cells.row.name}</span>
          </div>
        );
      },
    },

    {
      field: "phone",
      width: 190,
      headerName: "Telefono",
    },
    {
      field: "type",
      width: "150",
      headerName: "Tipo",
      renderCell: (cells) => {
        return (
          <StatusRow
            color={cells.row.type == 1 ? "bg-yellow-400" : "bg-orange-400"}
            textColor={
              cells.row.type == 1 ? "text-yellow-900" : "text-bg-yellow-900"
            }
            text={cells.row.type == 1 ? "Cliente" : "Proveedor"}
          />
        );
      },
    },
    {
      field: "isDeleted",
      width: "150",
      headerName: "Estatus",
      renderCell: (cells) => {
        return <StatusRow active={!cells.row.IsDeleted} />;
      },
    },

    {
      field: "Acciones",
      sortable: false,
      width: 200,
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
  const handleTabChange = (e, value) => {
    setStatusTab(value);
    const newData = getDataFilterdByTab(value);
    setDataFiltered(newData);
    setTypeFilter({ label: "Todos", id: 0 });
  };

  const handleTypeChange = (event, newValue) => {
    setTypeFilter(newValue);

    const dataResult = getDataFilterdByTab(statusTab);
    if (newValue.id === 0) {
      alert(newValue.id);
      setDataFiltered({
        isLoading: false,
        data: dataResult.data,
      });
    } else {
      setDataFiltered({
        isLoading: false,
        data: dataResult.data.filter(
          (item) => item.type == newValue.id.toString()
        ),
      });
    }
  };

  return (
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
          <Tab className=" capitalize" value="All" label="Todos" />
          <Tab className=" capitalize" value="Active" label="Activos" />
          <Tab className=" capitalize" value="Disable" label="Inactivos" />
        </Tabs>
      </div>
      <div className="flex items-center space-x-4 px-4">
        <Autocomplete
          disablePortal
          id="combo-box-demo"
          className="my-4 "
          value={typeFilter.label}
          onChange={handleTypeChange}
          options={[
            { label: "Todos", id: 0 },
            { label: "Clientes", id: 1 },
            { label: "Proveedores", id: 2 },
          ]}
          sx={{ width: 300 }}
          renderInput={(params) => (
            <TextField
              className="text-sm input-rounded"
              size="small"
              {...params}
              label="Tipos"
            />
          )}
        />
        <OutlinedInput
          id="input-with-icon-adornment"
          className="input-rounded rounded-xl"
          placeholder="Buscar contactos..."
          fullWidth
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
  );
}
