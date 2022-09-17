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

export default function BrandList({
  setFormOpen,
  setFormData,
  pageState,
  setPageState,
  setFilter,
  setBrandStatus,
  brandStatus,
  setItemToDelete,
  setConfirmOpen,
}) {
  const [statusTab, setStatusTab] = useState("All");

  const chip = [
    { name: "Ana", src: "/static/images/avatar/1.jpg" },
    { name: "TrapKing", src: "/static/images/avatar/1.jpg" },
    { name: "Eldiablo", src: "/static/images/avatar/1.jpg" },
    { name: "Yagaloski", src: "/static/images/avatar/1.jpg" },
    { name: "Pibull", src: "/static/images/avatar/1.jpg" },
    { name: "Junior", src: "/static/images/avatar/1.jpg" },
  ];

  const columns = [
    {
      field: "name",
      width: 220,
      headerName: "Nombre",
    },
    {
      field: "description",
      width: 270,
      headerName: "Descripcion",
    },

    {
      field: "supliers",
      width: 190,
      headerName: "Proveedores",
      renderCell: (cell) => {
        return (
          <AvatarGroup max={4}>
            {chip.map((item, index) => {
              return <Avatar key={index} alt={item.name} />;
            })}
          </AvatarGroup>
        );
      },
    },
    {
      field: "IsDeleted",
      width: 150,
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

  const onTabStatusChange = debounce((e, newValue) => setBrandStatus(newValue));

  const onInputFilterChange = debounce((e) => setFilter(e.target.value));

  const onDataGridPageChange = (newPage) => {
    setPageState({ ...pageState, page: newPage + 1 });
  };

  const onDataGridPageSizeChange = (newPageSize) => {
    setPageState({ ...pageState, pageSize: newPageSize });
  };

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

  return (
    <>
      <div className="flex flex-col h-full  w-full shadow-lg rounded-xl my-3">
        <div className=" bg-slate-200 rounded-t-lg">
          <Tabs
            value={brandStatus}
            onChange={onTabStatusChange}
            className="text-neutral-500"
            TabIndicatorProps={{
              style: {
                backgroundColor: "rgb(22 163 74 / var(--tw-text-opacity))",
              },
            }}
            aria-label="secondary tabs example"
          >
            <Tab className=" capitalize" value="all" label="Todos" />
            <Tab className=" capitalize" value={"false"} label="Activos" />
            <Tab className=" capitalize" value={"true"} label="Inactivos" />
          </Tabs>
        </div>
        <div className="flex items-center space-x-4 px-4 my-4">
          <OutlinedInput
            id="input-with-icon-adornment"
            className="input-rounded rounded-xl"
            fullWidth
            onChange={onInputFilterChange}
            placeholder="Buscar marcas..."
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
            rows={pageState.data}
            page={pageState.page - 1}
            pageSize={pageState.pageSize}
            rowCount={pageState.totalData}
            columns={columns}
            onPageChange={onDataGridPageChange}
            onPageSizeChange={onDataGridPageSizeChange}
            className="p-2"
            loading={pageState.isLoading}
            rowsPerPageOptions={[5, 20, 50, 100]}
            paginationMode="server"
            checkboxSelection
            localeText={{
              noRowsLabel: "No hay datos",
            }}
            autoHeight
            pagination
            disableColumnFilter
            disableColumnSelector
            experimentalFeatures={{ newEditingApi: true }}
          />
        </div>
      </div>
    </>
  );
}
