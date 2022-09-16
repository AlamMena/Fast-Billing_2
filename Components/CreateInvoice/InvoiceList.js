import React from "react";
import { InputAdornment, OutlinedInput, Tab, Tabs } from "@mui/material";
import {
  DeleteOutline,
  EditOutlined,
  SearchRounded,
} from "@mui/icons-material";
import { DataGrid, GridToolBar } from "@mui/x-data-grid";
import { useEffect } from "react";

export default function InvoiceList({ data }) {
  const columns = [
    {
      field: "total",
      width: 260,
      headerName: "Cliente",
    },
    // {
    //   field: "CreatonDate",
    //   width: 160,
    //   headerName: "Creado",
    // },
    // {
    //   field: "DueDate",
    //   width: 160,
    //   headerName: "Se vence",
    // },
    // {
    //   field: "total",
    //   width: 160,
    //   headerName: "Monto",
    // },
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
  useEffect(() => {
    console.log(data);
  }, []);

  return (
    <>
      <div className="flex flex-col h-full  w-full shadow-lg rounded-xl my-3">
        <div className=" bg-slate-200 rounded-t-lg ">
          <Tabs
            // value={statusTab}
            // onChange={handleTabChange}
            className="text-neutral-500 "
            TabIndicatorProps={{
              style: {
                backgroundColor: "rgb(22 163 74 / var(--tw-text-opacity))",
              },
            }}
            aria-label="secondary tabs example"
          >
            {/* <Tab className=" capitalize" value="All" label="Todos" />
            <Tab className=" capitalize" value="Active" label="Pagados" />
            <Tab className=" capitalize" value="Disable" label="No Pagados" />
            <Tab className=" capitalize" value="Disable" label="Overdue" />
            <Tab className=" capitalize" value="Disable" label="Borrador" /> */}
          </Tabs>
        </div>
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
          {/* <DataGrid
            components={{ Toolbar: GridToolBar }}
            // getRowId={(row) => row._id}
            // rows={data.data}
            columns={columns}
            className="p-2"
            pageSize={5}
            // loading={dataFiltered.isLoading}
            // rowsPerPageOptions={[5]}
            checkboxSelection
            disableSelectionOnClick
            // experimentalFeatures={{ newEditingApi: true }}
          /> */}
        </div>
      </div>
    </>
  );
}
