import { Add } from "@mui/icons-material";
import useAxios from "../../Axios/Axios";
import { Button, debounce, Tab, Tabs } from "@mui/material";
import { useRef, useState } from "react";
import PageHeader from "../../components/Globals/PageHeader";
import { toast } from "react-toastify";
import ConfirmationForm from "../../components/Globals/ConfirmationForm";
import { useRouter } from "next/router";
import ProductList from "../../components/Products/ProductsList";

export default function Products() {
  // list data
  const [pageState, setPageState] = useState({
    isLoading: true,
    data: [],
    pageSize: 10,
    page: 1,
    totalData: 0,
  });

  // confirmation form states
  const [confirmOpen, setConfirmOpen] = useState(false);
  const [productsStatusFilter, setProductsStatusFilter] = useState("all");
  const [filter, setFilter] = useState("");
  const [itemToDelete, setItemToDelete] = useState();

  const toastId = useRef(null);
  const { axiosInstance } = useAxios();

  const router = useRouter();
  const locationRoutes = [
    {
      text: "Inicio",
      link: "/",
    },
    {
      text: "Productos",
      link: "/productos",
    },
  ];

  const onTabStatusChange = debounce((e, newValue) =>
    setProductsStatusFilter(newValue)
  );

  const setDataAsync = async () => {
    try {
      setPageState({ ...pageState, isLoading: true });

      const queryFilters = `page=${pageState.page}&limit=${pageState.pageSize}&value=${filter}&isDeleted=${productsStatusFilter}`;

      const { data: apiResponse } = await axiosInstance.get(
        `v1/products/filtered?${queryFilters}`
      );

      setPageState({
        ...pageState,
        isLoading: false,
        data: apiResponse.data,
        totalData: apiResponse.dataQuantity,
      });
    } catch (error) {
      toast.error(`Opps!, algo ha ocurrido ${error}`);
      setPageState({ ...pageState, isLoading: false });
    }
  };

  const deleteAsync = async () => {
    try {
      await toast.promise(
        axiosInstance.delete(`v1/product?id=${itemToDelete._id}`),
        {
          pending: "Eliminando producto...",
          success: "Genial!, tu producto ha sido eliminado.",
          error: "Oops, algo ha ocurrido",
        }
      );

      setConfirmOpen(false);
      await setDataAsync();
    } catch (error) {
      toast.error(`Opps!, Algo ha ocurrido`);
    }
  };

  // status tab object style
  const tabStyle = {
    style: { backgroundColor: "rgb(22 163 74 / var(--tw-text-opacity))" },
  };

  return (
    <div className="w-full md:px-0 px-4 md:pr-8 flex flex-col">
      <div className="flex w-full justify-between items-center pr-8">
        <div>
          <PageHeader header="Productos" locationRoutes={locationRoutes} />
        </div>
        <div className="flex">
          <Button
            className=" z-auto rounded-xl py-2 bg-green-600 hover:bg-green-800"
            variant="contained"
            onClick={() => {
              router.push("/productos/crear");
            }}
            startIcon={<Add className="text-white" />}
          >
            <span className="text-sm whitespace-nowrap text-neutral-50 capitalize font-bold">
              Nuevo producto
            </span>
          </Button>
        </div>
      </div>
      <div className=" bg-slate-200 rounded-t-lg">
        <Tabs
          value={productsStatusFilter}
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

      <ProductList
        statusFilter={productsStatusFilter}
        setItemToDelete={setItemToDelete}
        setConfirmOpen={setConfirmOpen}
        actions
      />
      <ConfirmationForm
        open={confirmOpen}
        setOpen={setConfirmOpen}
        onConfirm={() => {
          deleteAsync(itemToDelete);
        }}
      />
    </div>
  );
}
