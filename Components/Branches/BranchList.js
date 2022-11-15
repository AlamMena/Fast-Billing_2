import React from "react";
import {
  DeleteOutline,
  EditOutlined,
  SearchRounded,
} from "@mui/icons-material";
import { InputAdornment, OutlinedInput } from "@mui/material";
import { DataGrid, GridToolBar } from "@mui/x-data-grid";
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
          />
        </div>
      </div>
    </>
  );
}
