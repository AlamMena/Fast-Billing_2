import {
  DeleteOutline,
  EditOutlined,
  SearchRounded,
} from "@mui/icons-material";
import {
  Avatar,
  AvatarGroup,
  FormControl,
  InputAdornment,
  InputLabel,
  MenuItem,
  OutlinedInput,
  Select,
  Tab,
  Tabs,
} from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { useRouter } from "next/router.js";
import { debounce } from "../../utils/methods.js";
import StatusRow from "../Globals/StatusRow.js";
import currency from "currency.js";

export default function ProductList({
  pageState,
  setPageState,
  setFilter,
  setItemToDelete,
  setConfirmOpen,
  setProductStatusFilter,
  productStatusFilter,
}) {
  const router = useRouter();
  const chip = [
    {
      name: "Ana",
      imageUrl: "https://cdn-icons-png.flaticon.com/512/3048/3048122.png",
    },
    {
      name: "TrapKing",
      imageUrl: "https://cdn-icons-png.flaticon.com/128/3048/3048189.png",
    },
    {
      name: "Eldiablo",
      imageUrl: "https://cdn-icons-png.flaticon.com/512/3048/3048122.png",
    },
  ];
  const columns = [
    {
      field: "_id",
      width: 70,
      headerName: "Id",
      renderCell: (cells) => {
        return <span>{Math.floor(Math.random() * 999)}</span>;
      },
    },
    {
      field: "name",
      width: "250",
      headerName: "Producto",
      renderCell: (cells) => {
        return (
          <div className="flex space-x-4 items-center ">
            <img
              className=" rounded-xl w-10 h-10"
              src={
                cells.row.imageUrl
                  ? cells.row.imageUrl
                  : "https://cdn-icons-png.flaticon.com/128/1524/1524983.png"
              }
            />
            <span className="font-semibold ">{cells.row.name}</span>
          </div>
        );
      },
    },
    {
      field: "cost",
      width: 120,
      headerName: "Costo",
      renderCell: (cells) => {
        return <span>{currency(cells.row.cost).format()}</span>;
      },
    },
    {
      field: "price",
      width: 120,
      headerName: "Precio",
      renderCell: (cells) => {
        return <span>{currency(cells.row.price).format()}</span>;
      },
    },
    {
      field: "benefit",
      width: 120,
      headerName: "Beneficio",
      renderCell: (cells) => {
        return <span>{currency(cells.row.benefit).format()}</span>;
      },
    },

    {
      field: "Cantidad",
      width: 90,
      headerName: "Cantidad",
      renderCell: (cells) => {
        return <span>5 UD</span>;
      },
    },
    {
      field: "s",
      width: 150,
      headerName: "Inventario",
      renderCell: (cells) => {
        return Math.floor(Math.random() * 999) > 100 ? (
          <span className="bg-red-200 rounded-2xl px-2 py-1 flex items-center">
            <span className="w-2 h-2 rounded-full mx-2 bg-red-700 animate-pulse  "></span>{" "}
            Agotados
          </span>
        ) : (
          <span className="bg-green-200 rounded-2xl px-2 py-1 flex items-center">
            <span className="w-2 h-2 rounded-full mx-2 bg-green-700 animate-pulse  "></span>{" "}
            Disponible
          </span>
        );
      },
    },
    {
      field: "supliers",
      width: 150,
      headerName: "Proveedores",
      renderCell: (cell) => {
        return (
          <AvatarGroup max={4}>
            {chip.map((item, index) => {
              return (
                <Avatar
                  className="w-8 h-8 "
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
      width: 250,
      renderCell: (cells) => {
        return (
          <div className="flex space-x-4">
            <a
              onClick={() => {
                router.push(`/productos/${cells.row._id}`);
              }}
              className="text-green-400 cursor-pointer"
            >
              <EditOutlined className="text-green-400 mx-2" />
              Editar
            </a>
            <a
              onClick={() => {
                setItemToDelete(cells.row);
                setConfirmOpen(true);
              }}
              className="text-red-500 cursor-pointer"
            >
              <DeleteOutline className="text-red-500 mx-2" /> Eliminar
            </a>
          </div>
        );
      },
    },
  ];

  // status tab object style
  const tabStyle = {
    style: { backgroundColor: "rgb(22 163 74 / var(--tw-text-opacity))" },
  };

  // methods

  const onTabStatusChange = debounce((e, newValue) =>
    setProductStatusFilter(newValue)
  );

  const onInputFilterChange = debounce((e) => setFilter(e.target.value));

  const onDataGridPageChange = (newPage) => {
    setPageState({ ...pageState, page: newPage + 1 });
  };

  const onDataGridPageSizeChange = (newPageSize) => {
    setPageState({ ...pageState, pageSize: newPageSize });
  };

  const SelectProductCategory = () => {
    return (
      <>
        {/* select label */}
        <InputLabel id="select-type-label">Categorias</InputLabel>
        <Select
          id="id"
          className="rounded-xl text-md"
          labelId="select-type-label"
          label="Tipos"
          size="large"
          value={productCategoryFilter}
          onChange={onSelectCategoryFilter}
        >
          {/* select contact type options */}
          <MenuItem value="all">Todos</MenuItem>
          <MenuItem value={1}>Clientes</MenuItem>
          <MenuItem value={2}>Proveedores</MenuItem>
        </Select>
      </>
    );
  };

  return (
    <div className="flex flex-col h-full w-full shadow-lg rounded-xl my-3">
      {/* ------------------   Tab Status -------------------- */}
      <div className=" bg-slate-200 rounded-t-lg">
        <Tabs
          value={productStatusFilter}
          onChange={onTabStatusChange}
          TabIndicatorProps={tabStyle}
          className="text-neutral-500"
        >
          {/* tab options */}
          <Tab className="capitalize" value="all" label="Todos" />
          <Tab className="capitalize" value={"false"} label="Activos" />
          <Tab className="capitalize" value={"true"} label="Inactivos" />
        </Tabs>
      </div>

      {/* ----------------------- Grid header ----------------- */}
      <div className="flex items-center space-x-4 px-4 mt-4">
        {/* select contact type */}

        {/* search input */}
        <FormControl className="w-full">
          <OutlinedInput
            id="input-with-icon-adornment"
            className="input-rounded rounded-xl"
            onChange={onInputFilterChange}
            placeholder="Buscar productos..."
            fullWidth
            startAdornment={
              <InputAdornment position="start">
                <SearchRounded className="text-slate-400" />
              </InputAdornment>
            }
          />
        </FormControl>
      </div>

      {/*------------------ DataGrid ---------------- */}
      <div className=" w-full my-2">
        <DataGrid
          getRowId={(row) => row._id}
          rows={pageState.data}
          rowCount={pageState.totalData}
          pageSize={pageState.pageSize}
          page={pageState.page - 1}
          loading={pageState.isLoading}
          onPageChange={onDataGridPageChange}
          onPageSizeChange={onDataGridPageSizeChange}
          columns={columns}
          rowsPerPageOptions={[5, 20, 50, 100]}
          experimentalFeatures={{ newEditingApi: true }}
          paginationMode="server"
          className="p-2"
          localeText={{
            noRowsLabel: "No hay datos",
          }}
          autoHeight
          rowHeight={60}
          pagination
          disableColumnFilter
          disableColumnSelector
        />
      </div>
    </div>
  );
}
