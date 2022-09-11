import {
  ArticleRounded,
  DeleteOutline,
  EditOutlined,
  SearchRounded,
} from "@mui/icons-material";
import {
  FormControl,
  InputAdornment,
  InputLabel,
  MenuItem,
  OutlinedInput,
  Select,
  Tab,
  Tabs,
} from "@mui/material";
import { DataGrid, GridToolBar } from "@mui/x-data-grid";
import { useRouter } from "next/router.js";
import { useEffect, useState } from "react";
import StatusRow from "../Globals/StatusRow.js";

export default function ContactList({
  setFormOpen,
  setFormData,
  data,
  setItemToDelete,
  setConfirmOpen,
}) {
  // states
  const [statusTabValue, setStatusTabValue] = useState("All");
  const [filteredData, setFilteredData] = useState(data);
  const [typeFilter, setTypeFilter] = useState(0);

  // router

  const router = useRouter();
  // methods
  const getFilteredContactsByStatus = (value) => {
    // response variable
    let filteredContactsByStatus;

    // filtering contacts from tab value
    if (value === "All") {
      filteredContactsByStatus = data.contacts;
    } else if (value === "Active") {
      filteredContactsByStatus = data.contacts.filter(
        (item) => !item.IsDeleted
      );
    } else if (value === "Disable") {
      filteredContactsByStatus = data.contacts.filter((item) => item.IsDeleted);
    }

    // response
    return filteredContactsByStatus;
  };

  const handleTabChange = (event, value) => {
    // setting new value to the tab
    setStatusTabValue(value);

    // start loading
    setFilteredData({ isLoading: true, contacts: [] });

    // filtering contacts by the new tab value
    const filteredContactsByStatus = getFilteredContactsByStatus(value);

    // setting contacts to the state and stoping the loading
    setFilteredData({ isLoading: false, contacts: filteredContactsByStatus });

    // setting the type filter as all(0)
    setTypeFilter(0);
  };

  const handleTypeChange = (newContactTypeValue) => {
    // setting the new value
    setTypeFilter(newContactTypeValue);

    // start loading
    setFilteredData({ ...filteredData, isLoading: true });

    // filtering the data by the tab value
    const filteredContactsByStatus =
      getFilteredContactsByStatus(statusTabValue);

    // filtering by the new contact type filter
    let filteredContactsByTypeAndStatus;

    if (newContactTypeValue === 0) {
      filteredContactsByTypeAndStatus = filteredContactsByStatus;
    } else {
      filteredContactsByTypeAndStatus = filteredContactsByStatus.filter(
        (contact) => contact.type == newContactTypeValue.toString()
      );
    }

    // setting the data
    setFilteredData({
      isLoading: false,
      contacts: filteredContactsByTypeAndStatus,
    });
  };

  // effects
  useEffect(() => {
    // start loading
    setFilteredData({ isLoading: true, contacts: [] });

    // filtering contacts
    const filteredContactsByStatus =
      getFilteredContactsByStatus(statusTabValue);

    // setting data
    setFilteredData({ isLoading: false, contacts: filteredContactsByStatus });
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
                router.push(`/contactos/${cells.row._id}`);
                alert(cells.row.imageUrl);
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

  return (
    <div className="flex flex-col h-full  w-full shadow-lg rounded-xl my-3">
      <div className=" bg-slate-200 rounded-t-lg">
        <Tabs
          value={statusTabValue}
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
      <div className="flex items-center space-x-4 px-4 mt-4">
        <FormControl className="w-44">
          <InputLabel id="select-type-label">Tipos</InputLabel>
          <Select
            labelId="select-type-label"
            id="id"
            value={typeFilter}
            onChange={(e) => handleTypeChange(e.target.value)}
            size="large"
            className="rounded-xl text-md"
            label="Tipos"
            // onChange={handleChange}
          >
            <MenuItem value={0}>Todos</MenuItem>
            <MenuItem value={1}>Clientes</MenuItem>
            <MenuItem value={2}>Proveedores</MenuItem>
          </Select>
        </FormControl>

        <FormControl className="w-full">
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
        </FormControl>
      </div>

      <div className="h-96 w-full my-2">
        <DataGrid
          components={{ Toolbar: GridToolBar }}
          getRowId={(row) => row._id}
          rows={filteredData.contacts}
          columns={columns}
          className="p-2"
          pageSize={5}
          loading={filteredData.isLoading}
          rowsPerPageOptions={[5]}
          experimentalFeatures={{ newEditingApi: true }}
        />
      </div>
    </div>
  );
}
