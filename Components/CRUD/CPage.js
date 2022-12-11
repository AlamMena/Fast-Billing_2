import List from "./List.js";
import { useState, useEffect, useRef } from "react";
import useAxios from "../../Axios/Axios";
import PageHeader from "../Globals/PageHeader";
import { ApartmentRounded, Add } from "@mui/icons-material";
import { Button } from "@mui/material";
import ConfirmationForm from "../Globals/ConfirmationForm.js";
import Form from "./Form.js";
import { toast } from "react-toastify";
export default function CPage({
  getUrl,
  postUrl,
  updateUrl,
  deleteUrl,
  succesUpsertMessage,
  successDeleteMessage,
  createButtonMessage,
  deleteConfirmMessage,
  headerMessage,
  headerText,
  locationRoutes,
  fields,
  cols,
}) {
  const [pageState, setPageState] = useState({
    isLoading: true,
    data: [],
    pageSize: 5,
    page: 1,
    totalData: 0,
  });
  const [filter, setFilter] = useState("");

  // upsert states
  const [formOpen, setFormOpen] = useState(false);
  const [formData, setFormData] = useState();

  // confirmation form states
  const [confirmOpen, setConfirmOpen] = useState(false);
  const [itemToDelete, setItemToDelete] = useState();

  const toastId = useRef(null);

  const { axiosInstance } = useAxios();

  const setDataAsync = async () => {
    try {
      setPageState({ ...pageState, isLoading: true });

      const queryFilters = `page=${pageState.page}&limit=${pageState.pageSize}&value=${filter}`;

      const { data: apiResponse } = await axiosInstance.get(
        `${getUrl}?${queryFilters}`
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

  const upsertAsync = async (data) => {
    try {
      toastId.current = toast("Cargando ...", {
        type: toast.TYPE.LOADING,
      });

      // if there's any id we create the item in other way we update the item
      data.id
        ? await axiosInstance.put(`${updateUrl}`, data)
        : await axiosInstance.post(`${postUrl}`, data);

      await setDataAsync();

      toast.update(toastId.current, {
        type: toast.TYPE.SUCCESS,
        autoClose: 5000,
        render: `${succesUpsertMessage}`,
      });

      setFormOpen(false);
    } catch (error) {
      toast.update(toastId.current, {
        type: toast.TYPE.ERROR,
        autoClose: 5000,
        render:
          error.response.data.status === 400
            ? error.response.data.message
            : "Opps, Ha ocurrido un error!",
      });
    }
  };

  const deleteAsync = async () => {
    try {
      toastId.current = toast("Cargando ...", {
        type: toast.TYPE.LOADING,
      });
      await axiosInstance.delete(`${deleteUrl}/${itemToDelete.id}`);

      toast.update(toastId.current, {
        type: toast.TYPE.SUCCESS,
        autoClose: 5000,
        render: `${successDeleteMessage}`,
      });

      setConfirmOpen(false);
      await setDataAsync();
    } catch (error) {
      toast.update(toastId.current, {
        type: toast.TYPE.ERROR,
        autoClose: 5000,
        render:
          error.response.data.status === 400
            ? error.response.data.message
            : "Opps, Ha ocurrido un error!",
      });
    }
  };

  useEffect(() => {
    setDataAsync();
  }, [pageState.page, pageState.pageSize, filter]);

  return (
    <>
      <div className="w-full md:px-0 px-4 md:pr-8 flex flex-col">
        <div className="flex w-full justify-between items-center pr-8">
          <div>
            <PageHeader
              header={headerText}
              locationRoutes={locationRoutes}
              text={headerMessage}
              Icon={<ApartmentRounded className="" />}
            />
          </div>
          <div className="flex">
            <Button
              className=" z-auto rounded-xl py-2 bg-green-600 "
              variant="contained"
              onClick={() => {
                setFormOpen(true);
                setFormData({});
              }}
              startIcon={<Add className="text-white" />}
            >
              <span className="text-sm whitespace-nowrap text-neutral-50 capitalize font-bold">
                {createButtonMessage}
              </span>
            </Button>
          </div>
        </div>
        <List
          cols={cols}
          pageState={pageState}
          setFilter={setFilter}
          setPageState={setPageState}
          setFormOpen={setFormOpen}
          setFormData={setFormData}
          setItemToDelete={setItemToDelete}
          setConfirmOpen={setConfirmOpen}
        />

        <ConfirmationForm
          open={confirmOpen}
          setOpen={setConfirmOpen}
          onConfirm={deleteAsync}
          message={deleteConfirmMessage}
        />
        <Form
          open={formOpen}
          setOpen={setFormOpen}
          data={formData}
          onSave={upsertAsync}
          fields={fields}
        />
      </div>
    </>
  );
}
