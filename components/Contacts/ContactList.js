import { Search, SearchOutlined, SearchRounded } from "@mui/icons-material";
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
import { DataGrid } from "@mui/x-data-grid";
import { useState } from "react";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import StatusRow from "../Globals/StatusRow";

export default function ContactList({ setFormOpen, setFormData, data }) {
  // confirm dialog state
  const [confirmOpen, setConfirmOpen] = useState(false);
  const [itemToDelete, setItemToDelete] = useState();

  const [value, setValue] = useState("one");

  // alert states
  const [alert, setAlert] = useState(false);
  const MySwal = withReactContent(Swal);
  const [alertParams, setAlertParams] = useState({
    severity: "success",
    title: "",
  });
  const columns = [
    {
      field: "id",
      width: 100,
      headerName: "Id",
    },
    {
      fiels: "Image",
      width: "250",
      headerName: "Name",
      renderCell: (cells) => {
        return (
          <div className="flex space-x-4 items-center">
            <img
              className=" rounded-xl w-10 h-10"
              src="https://cdn-icons-png.flaticon.com/128/3135/3135768.png"
            />
            <span className="font-semibold">{cells.row.name}</span>
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
      width: 200,
      headerName: "Phone Number",
    },
    {
      field: "Status",
      width: "150",
      headerName: "Status",
      renderCell: (cells) => {
        return <StatusRow active={cells.row.isDelete} />;
      },
    },

    {
      field: "Actions",
      sortable: false,
      renderCell: (cells) => {
        return (
          <div className="flex space-x-4">
            <a
              onClick={() => {
                // setFormOpen(true);
                // setFormData(cells.row);

                MySwal.fire({
                  title: <strong>Good job!</strong>,
                  html: <i>You clicked the button!</i>,
                  icon: "success",
                });
              }}
              className="text-green-400 cursor-pointer"
            >
              Edit
            </a>
            <a
              onClick={() => {
                setConfirmOpen(true);
                setItemToDelete(cells.row);
              }}
              className="text-red-500 cursor-pointer"
            >
              Delete
            </a>
          </div>
        );
      },
    },
  ];

  const handleConfirmForm = () => {
    setConfirmOpen(false);
    try {
      // dispatch(deleteCategory(itemToDelete));
      setAlertParams({
        severity: "success",
        title: "category deleted successfully",
      });
      setAlert(true);
    } catch (error) {
      setAlertParams({
        severity: "error",
        title: "Oops!, something went wrong, try later",
      });
      setAlert(true);
    }
  };

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  return (
    <div className="flex flex-col h-full  w-full shadow-lg rounded-xl">
      <div className=" bg-slate-200 rounded-t-lg">
        <Tabs
          value={value}
          onChange={handleChange}
          textColor="green"
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
          fullWidth
          startAdornment={
            <InputAdornment position="start">
              <SearchRounded className="text-slate-400" />
            </InputAdornment>
          }
        />
      </div>

      <div className="h-96 w-full">
        <DataGrid
          rows={[
            {
              id: 1,
              name: "Jhon Doe",
              image: "/",
              phoneNumber: "1-800-99212-1",
              isDelete: true,
              noIdentification: "402-1389-763-6",
            },
            {
              id: 2,
              name: "Dean Shum",
              image: "/",
              phoneNumber: "1-800-91223-1",
              isDelete: false,
              noIdentification: "402-1389-763-6",
            },
            {
              id: 3,
              name: "Julio Verne",
              image: "/",
              phoneNumber: "1-800-82023-1",
              isDelete: true,
              noIdentification: "402-1389-763-6",
            },
            {
              id: 4,
              name: "Chris Dalie",
              image: "/",
              phoneNumber: "1-800-12481-1",
              isDelete: false,
              noIdentification: "402-1389-763-6",
            },
          ]}
          columns={columns}
          className="p-2"
          pageSize={5}
          rowsPerPageOptions={[5]}
          checkboxSelection
          disableSelectionOnClick
          experimentalFeatures={{ newEditingApi: true }}
        />
      </div>
    </div>
  );
}
