import React from "react";
import {
  DeleteOutline,
  EditOutlined,
  SearchRounded,
} from "@mui/icons-material";
import {
  Autocomplete,
  AvatarGroup,
  InputAdornment,
  OutlinedInput,
  Avatar,
  Tab,
  Tabs,
  TextField,
} from "@mui/material";
import { useState, useEffect } from "react";
import { DataGrid, GridToolBar } from "@mui/x-data-grid";
import Alert from "../Globals/Alert";
import StatusRow from "../Globals/StatusRow";
import { debounce } from "../../utils/methods";

export default function BranchList({
  setFormOpen,
  setFormData,
  pageState,
  setPageState,
  setFilter,
  setItemToDelete,
  setConfirmOpen,
}) {
  const [statusTab, setStatusTab] = useState("All");

  const columns = [
    {
      field: "id",
      width: 120,
      headerName: "Id",
    },
    {
      field: "name",
      width: 220,
      headerName: "Nombre",
    },

    {
      field: "location",
      width: 270,
      headerName: "Ubicacion",
    },
    {
      field: "phoneNumber",
      width: 270,
      headerName: "Numero de Telefono",
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

  // const onTabStatusChange = debounce((e, newValue) => setBrandStatus(newValue));

  const onInputFilterChange = debounce((e) => setFilter(e.target.value));

  const onDataGridPageChange = (newPage) => {
    setPageState({ ...pageState, page: newPage + 1 });
  };

  const onDataGridPageSizeChange = (newPageSize) => {
    setPageState({ ...pageState, pageSize: newPageSize });
  };

  // const handleTabChange = (e, value) => {
  //   setStatusTab(value);
  //   const newData = getDataFilterdByTab(value);
  //   setDataFiltered(newData);
  // };

  // const getDataFilterdByTab = (value) => {
  //   let newData = { isLoading: true, data: [] };

  //   if (value === "All") {
  //     newData = data;
  //   } else if (value === "Active") {
  //     newData = {
  //       isLoading: false,
  //       data: data.data.filter((item) => !item.IsDeleted),
  //     };
  //   } else if (value === "Disable") {
  //     newData = {
  //       isLoading: false,
  //       data: data.data.filter((item) => item.IsDeleted),
  //     };
  //   }
  //   return newData;
  // };

  return (
    <>
      <div className="flex flex-col h-full  w-full shadow-lg rounded-xl">
        {/* <div className=" bg-slate-200 rounded-t-lg">
          <Tabs
            className="text-neutral-500"
            TabIndicatorProps={{
              style: {
                backgroundColor: "rgb(22 163 74 / var(--tw-text-opacity))",
              },
            }}
            aria-label="secondary tabs example"
          ></Tabs>
        </div> */}
        <div className="flex items-center space-x-4 px-4 my-2">
          <OutlinedInput
            id="input-with-icon-adornment"
            className="input-rounded rounded-xl"
            fullWidth
            onChange={onInputFilterChange}
            placeholder="Buscar sucursales..."
            startAdornment={
              <InputAdornment position="start">
                <SearchRounded className="text-slate-400" />
              </InputAdornment>
            }
          />
        </div>

        <div className="h-full w-full my-2">
          <DataGrid
            getRowId={(row) => row.id}
            rowCount={pageState.totalData}
            pageSize={pageState.pageSize}
            page={pageState.page - 1}
            rows={pageState.data}
            columns={columns}
            className="p-2"
            onPageChange={onDataGridPageChange}
            onPageSizeChange={onDataGridPageSizeChange}
            loading={pageState.isLoading}
            rowsPerPageOptions={[5, 20, 50, 100]}
            paginationMode="server"
            localeText={{
              noRowsLabel: "No hay datos",
            }}
            hideFooterSelectedRowCount
            autoHeight
            pagination
            disableColumnFilter
            disableColumnSelector
            experimentalFeatures={{ newEditingApi: true }}
            // components={{ Toolbar: GridToolBar }}
            // getRowId={(row) => row._id}
            // rows={pageState.data}
            // page={pageState.page - 1}
            // pageSize={pageState.pageSize}
            // rowCount={pageState.totalData}
            // columns={columns}
            // onPageChange={onDataGridPageChange}
            // onPageSizeChange={onDataGridPageSizeChange}
            // className="p-2"
            // loading={pageState.isLoading}
            // rowsPerPageOptions={[5, 20, 50, 100]}
            // paginationMode="server"
            // checkboxSelection
            // localeText={{
            //   noRowsLabel: "No hay datos",
            // }}
            // autoHeight
            // pagination
            // disableColumnFilter
            // disableColumnSelector
            // experimentalFeatures={{ newEditingApi: true }}
          />
        </div>
      </div>
    </>
  );
}
