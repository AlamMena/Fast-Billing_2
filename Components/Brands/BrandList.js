import React from "react";
import {
  DeleteOutline,
  EditOutlined,
  SearchRounded,
} from "@mui/icons-material";
import {
  AvatarGroup,
  InputAdornment,
  OutlinedInput,
  Avatar,
} from "@mui/material";
import { useState } from "react";
import { DataGrid } from "@mui/x-data-grid";
import { debounce } from "../../utils/methods";

export default function BrandList({
  setFormOpen,
  setFormData,
  pageState,
  setPageState,
  setFilter,
  setItemToDelete,
  setConfirmOpen,
}) {
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
      field: "id",
      width: 120,
      headerName: "Id",
    },
    {
      field: "name",
      minWidth: 220,
      flex: 1,
      headerName: "Nombre",
    },
    {
      field: "supliers",
      minWidth: 190,
      flex: 1,
      headerName: "Proveedores",
      renderCell: (cell) => {
        return (
          <AvatarGroup
            max={4}
            sx={{
              "& .MuiAvatar-root": { width: 32, height: 32, fontSize: 15 },
            }}
          >
            {chip.map((item, index) => {
              return (
                <Avatar
                  key={index}
                  alt={item.name}
                  src="https://cdn-icons-png.flaticon.com/512/3135/3135715.png"
                />
              );
            })}
          </AvatarGroup>
        );
      },
    },

    {
      field: "Acciones",
      sortable: false,
      minWidth: 190,
      flex: 1,
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
      <div className="flex flex-col h-full  w-full shadow-lg rounded-xl">
        <div className="flex items-center space-x-4 px-4 my-2">
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
            hideFooterSelectedRowCount
            paginationMode="server"
            localeText={{
              noRowsLabel: "No hay datos",
            }}
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
