import {
  DeleteOutline,
  EditOutlined,
  SearchRounded,
} from "@mui/icons-material";
import {
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

export default function ContactList({
  pageState,
  setPageState,
  setFilter,
  setItemToDelete,
  setConfirmOpen,
  setContactStatus,
  contactStatus,
  setContactType,
  contactType,
}) {
  const router = useRouter();

  const columns = [
    {
      field: "_id",
      width: 120,
      headerName: "Id",
    },
    {
      field: "name",
      width: "300",
      headerName: "Contacto",
      renderCell: (cells) => {
        return (
          <div className="flex space-x-4 items-center">
            <img
              className=" rounded-xl w-10 h-10"
              src={
                cells.row.imageUrl
                  ? cells.row.imageUrl
                  : "https://cdn-icons-png.flaticon.com/128/3135/3135768.png"
              }
            />
            <span className="font-semibold ">{cells.row.name}</span>
          </div>
        );
      },
    },

    {
      field: "phone",
      width: 190,
      headerName: "Telefono",
    },
    {
      field: "type",
      width: "150",
      headerName: "Tipo",
      renderCell: (cells) => {
        return (
          <StatusRow
            color={cells.row.type == 1 ? "bg-yellow-400" : "bg-orange-400"}
            textColor={
              cells.row.type == 1 ? "text-yellow-900" : "text-bg-yellow-900"
            }
            text={cells.row.type == 1 ? "Cliente" : "Proveedor"}
          />
        );
      },
    },
    {
      field: "isDeleted",
      width: "150",
      headerName: "Estatus",
      renderCell: (cells) => {
        return <StatusRow active={!cells.row.IsDeleted} />;
      },
    },

    {
      field: "Acciones",
      sortable: false,
      width: 200,
      renderCell: (cells) => {
        return (
          <div className="flex space-x-4">
            <a
              onClick={() => {
                router.push(`/contactos/${cells.row._id}`);
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

  // status tab object style
  const tabStyle = {
    style: { backgroundColor: "rgb(22 163 74 / var(--tw-text-opacity))" },
  };

  // methods

  const onTabStatusChange = debounce((e, newValue) =>
    setContactStatus(newValue)
  );

  const onSelectTypeStatusChange = debounce((e) =>
    setContactType(e.target.value)
  );
  const onInputFilterChange = debounce((e) => setFilter(e.target.value));

  const onDataGridPageChange = (newPage) => {
    setPageState({ ...pageState, page: newPage + 1 });
  };

  const onDataGridPageSizeChange = (newPageSize) => {
    setPageState({ ...pageState, pageSize: newPageSize });
  };

  // small components
  const StatusTab = () => {
    return (
      <Tabs
        value={contactStatus}
        onChange={onTabStatusChange}
        TabIndicatorProps={tabStyle}
        className="text-neutral-500"
      >
        {/* tab options */}
        <Tab className="capitalize" value="all" label="Todos" />
        <Tab className="capitalize" value={false} label="Activos" />
        <Tab className="capitalize" value={true} label="Inactivos" />
      </Tabs>
    );
  };

  const SelectContactType = () => {
    return (
      <>
        {/* select label */}
        <InputLabel id="select-type-label">Tipos</InputLabel>
        <Select
          id="id"
          className="rounded-xl text-md"
          labelId="select-type-label"
          label="Tipos"
          size="large"
          value={contactType}
          onChange={onSelectTypeStatusChange}
        >
          {/* select contact type options */}
          <MenuItem value="all">Todos</MenuItem>
          <MenuItem value={1}>Clientes</MenuItem>
          <MenuItem value={2}>Proveedores</MenuItem>
        </Select>
      </>
    );
  };

  const SearchInput = () => {
    return (
      <OutlinedInput
        id="input-with-icon-adornment"
        className="input-rounded rounded-xl"
        onChange={onInputFilterChange}
        placeholder="Buscar contactos..."
        fullWidth
        startAdornment={
          <InputAdornment position="start">
            <SearchRounded className="text-slate-400" />
          </InputAdornment>
        }
      />
    );
  };

  return (
    <div className="flex flex-col h-full w-full shadow-lg rounded-xl my-3">
      {/* ------------------   Tab Status -------------------- */}
      <div className=" bg-slate-200 rounded-t-lg">
        <StatusTab />
      </div>

      {/* ----------------------- Grid header ----------------- */}
      <div className="flex items-center space-x-4 px-4 mt-4">
        {/* select contact type */}
        <FormControl className="w-44">
          <SelectContactType />
        </FormControl>

        {/* search input */}
        <FormControl className="w-full">
          <SearchInput />
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
          pagination
          disableColumnFilter
          disableColumnSelector
        />
      </div>
    </div>
  );
}
