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
import { debounce } from "../../utils/methods";
import StatusRow from "../Globals/StatusRow.js";

export default function SubCategoryList({
  pageState,
  setPageState,
  setFilter,
  setItemToDelete,
  setFormData,
  setFormOpen,
  setConfirmOpen,
}) {
  const columns = [
    {
      field: "id",
      width: 70,
      headerName: "Id",
    },
    {
      field: "name",
      minWidth: 220,
      flex: 1,
      headerName: "Subcategoria",
      renderCell: (cells) => {
        return (
          <div className="flex space-x-4 items-center ">
            <img
              className=" w-10 h-10"
              src={
                cells.row.imageUrl
                  ? cells.row.imageUrl
                  : "https://cdn-icons-png.flaticon.com/512/8921/8921361.png"
              }
            />
            <span className="font-semibold ">{cells.row.name}</span>
          </div>
        );
      },
    },
    {
      field: "description",
      minWidth: 260,
      flex: 1,
      headerName: "Descripcion",
    },
    {
      field: "Acciones",
      sortable: false,
      flex: 1,
      minWidth: 220,
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
              <EditOutlined className="text-green-400 mx-1" />
              Editar
            </a>
            <a
              onClick={() => {
                setItemToDelete(cells.row);
                setConfirmOpen(true);
              }}
              className="text-red-500 cursor-pointer"
            >
              <DeleteOutline className="text-red-500" /> Eliminar
            </a>
          </div>
        );
      },
    },
  ];

  const onInputFilterChange = debounce((e) => setFilter(e.target.value));

  const onDataGridPageChange = (newPage) => {
    setPageState({ ...pageState, page: newPage + 1 });
  };

  const onDataGridPageSizeChange = (newPageSize) => {
    setPageState({ ...pageState, pageSize: newPageSize });
  };

  return (
    <>
      <div className="flex flex-col h-full  w-full shadow-lg rounded-xl my-2">
        <div className="flex items-center space-x-4 px-4 my-2">
          <OutlinedInput
            id="input-with-icon-adornment"
            className="input-rounded rounded-xl"
            fullWidth
            onChange={onInputFilterChange}
            placeholder="Buscar subcategorias..."
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
            hideFooterSelectedRowCount
            onPageChange={onDataGridPageChange}
            onPageSizeChange={onDataGridPageSizeChange}
            loading={pageState.isLoading}
            rowsPerPageOptions={[5, 20, 50, 100]}
            paginationMode="server"
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
