import React from "react";
import {
  DeleteOutline,
  EditOutlined,
  SearchRounded,
} from "@mui/icons-material";
import { InputAdornment, OutlinedInput } from "@mui/material";
import { DataGrid, GridToolBar } from "@mui/x-data-grid";
import { debounce } from "../../utils/methods";

export default function GList({
  setFormOpen,
  setFormData,
  pageState,
  setPageState,
  setFilter,
  setItemToDelete,
  setConfirmOpen,
  cols,
  searchText,
}) {
  const columns = [
    {
      field: "id",
      width: 90,
      headerName: "Id",
    },
    ...cols,
    {
      field: "Acciones",
      sortable: false,
      width: 220,
      renderCell: (cells) => {
        return (
          <div className="flex">
            <a
              onClick={() => {
                setFormData(cells.row);
                setFormOpen(true);
              }}
              className="text-green-400 cursor-pointer"
            >
              <EditOutlined className="text-green-400 mx-1" />
            </a>
            <a
              onClick={() => {
                setItemToDelete(cells.row);
                setConfirmOpen(true);
              }}
              className="text-red-500 cursor-pointer"
            >
              <DeleteOutline className="text-red-500" />
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
            placeholder={searchText}
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
