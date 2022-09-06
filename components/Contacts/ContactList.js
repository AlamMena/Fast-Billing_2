import {
  DeleteOutline,
  EditOutlined,
  Search,
  SearchOutlined,
  SearchRounded,
} from "@mui/icons-material";
import {
  Autocomplete,
  Button,
  Input,
  InputAdornment,
  OutlinedInput,
  Tab,
  Tabs,
  TextField,
} from "@mui/material";
import { DataGrid, GridToolBar } from "@mui/x-data-grid";
import { useState } from "react";
import { toast } from "react-toastify";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import Alert from "../Globals/Alert";
import StatusRow from "../Globals/StatusRow";

export default function ContactList({
  setFormOpen,
  setFormData,
  data,
  setItemToDelete,
  setConfirmOpen,
}) {
  let value = "one";

  const columns = [
    {
      field: "_id",
      width: 90,
      headerName: "Id",
    },
    {
      field: "name",
      width: "250",
      headerName: "Name",
      renderCell: (cells) => {
        return (
          <div className="flex space-x-4 items-center">
            <img
              className=" rounded-xl w-10 h-10"
              src="https://cdn-icons-png.flaticon.com/128/3135/3135768.png"
            />
            <span className="font-semibold ">{cells.row.name}</span>
          </div>
        );
      },
    },
    {
      field: "noIdentification",
      width: 200,
      headerName: "Identification",
    },
    {
      field: "phoneNumber",
      width: 170,
      headerName: "Phone Number",
    },
    {
      field: "IsDelete",
      width: "150",
      headerName: "Status",
      renderCell: (cells) => {
        return <StatusRow active={!cells.row.IsDeleted} />;
      },
    },

    {
      field: "Actions",
      sortable: false,
      width: 200,
      renderCell: (cells) => {
        return (
          <div className="flex space-x-4">
            <a
              onClick={() => {
                setFormData(cells.row);
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
          value={value}
          // onChange={handleChange}
          className="text-neutral-500"
          TabIndicatorProps={{
            style: {
              backgroundColor: "rgb(22 163 74 / var(--tw-text-opacity))",
            },
          }}
          aria-label="secondary tabs example"
        >
          <Tab className=" capitalize" value="one" label="All" active />
          <Tab className=" capitalize" value="two" label="Active" />
          <Tab className=" capitalize" value="three" label="Disable" />
        </Tabs>
      </div>
      <div className="flex items-center space-x-4 px-4">
        <Autocomplete
          disablePortal
          id="combo-box-demo"
          className="my-4 "
          options={[
            { label: "All" },
            { label: "Clients" },
            { label: "Suppliers" },
          ]}
          sx={{ width: 300 }}
          renderInput={(params) => (
            <TextField
              className="text-sm input-rounded"
              size="small"
              {...params}
              label="Type"
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
  );
}
