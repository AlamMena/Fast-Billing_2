import React from "react";
import { InputAdornment, OutlinedInput, Tab, Tabs } from "@mui/material";
import {
  DeleteOutline,
  EditOutlined,
  SearchRounded,
} from "@mui/icons-material";
import { DataGrid, GridToolBar } from "@mui/x-data-grid";
import { useEffect } from "react";
import { formatCurrency } from "../../utils/methods";

export default function InvoiceList({ data }) {
  const columns = [
    {
      field: "id",
      minWidth: 150,
      flex: 1,
      headerName: "Id",
    },
    {
      field: "clientName",
      minWidth: 160,
      flex: 1,
      headerName: "Recipiente",
    },
    {
      field: "invoiceTypeName",
      minWidth: 160,
      flex: 1,
      headerName: "Tipo de Factura",
    },
    {
      field: "ncf",
      minWidth: 160,
      flex: 1,
      headerName: "NCF",
    },
    {
      field: "date",
      minWidth: 160,
      flex: 1,
      headerName: "Dia de creacion",
    },
    {
      field: "total",
      minWidth: 160,
      flex: 1,
      headerName: "Total",
      renderCell: (cells) => {
        return <span>{formatCurrency(cells.row.total)}</span>;
      },
    },
    // {
    //   field: "IsDeleted",
    //   width: "150",
    //   headerName: "Estatus",
    //   //   renderCell: (cells) => {
    //   //     return <StatusRow active={!cells.row.IsDeleted} />;
    //   //   },
    // },

    // {
    //   field: "Acciones",
    //   sortable: false,
    //   width: 190,
    //   //   renderCell: (cells) => {
    //   //     return (
    //   //       <div className="flex space-x-4">
    //   //         <a
    //   //           onClick={() => {
    //   //             setFormData(cells.row);
    //   //             setFormOpen(true);
    //   //           }}
    //   //           className="text-green-400 cursor-pointer"
    //   //         >
    //   //           <EditOutlined className="text-green-400 mx-2" />
    //   //           Edit
    //   //         </a>
    //   //         <a
    //   //           onClick={() => {
    //   //             setItemToDelete(cells.row);
    //   //             setConfirmOpen(true);
    //   //           }}
    //   //           className="text-red-500 cursor-pointer"
    //   //         >
    //   //           <DeleteOutline className="text-red-500 mx-2" /> Delete
    //   //         </a>
    //   //       </div>
    //   //     );
    //   //   },
    // },
  ];
  // useEffect(() => {
  //   console.log(data);
  // }, []);

  return (
    <>
      <div className="flex flex-col h-full  w-full shadow-lg rounded-xl my-3">
        <div className="flex items-center space-x-4 px-4 my-4">
          <OutlinedInput
            id="input-with-icon-adornment"
            className="input-rounded rounded-xl"
            fullWidth
            placeholder="Buscar facturas..."
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
            getRowId={(row) => row.id}
            rows={data.data}
            columns={columns}
            className="p-2"
            pageSize={5}
            // loading={dataFiltered.isLoading}
            rowsPerPageOptions={[5]}
            disableSelectionOnClick
            experimentalFeatures={{ newEditingApi: true }}
          />
        </div>
      </div>
    </>
  );
}
