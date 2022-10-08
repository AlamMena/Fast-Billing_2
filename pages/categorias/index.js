import React from "react";
import { Add, Receipt, Category, Class } from "@mui/icons-material";
import useAxios from "../../Axios/Axios";
import { Button, Tabs, Box, Tab, Typography } from "@mui/material";
import { useEffect, useState, useRef } from "react";
import PageHeader from "../../Components/Globals/PageHeader";
import { toast } from "react-toastify";
import { postImage } from "../../Components/Globals/ImageHandler";

import CategoryList from "../../Components/Categories/CategoryList";
import CategoryForm from "../../Components/Categories/CategoryForm";
import ConfirmationForm from "../../Components/Globals/ConfirmationForm";
import SubCategoryList from "../../Components/SubCategories/SubCategoriesList";
import { set } from "date-fns";
import SubCategoryForm from "../../Components/SubCategories/SubCategoryForm";

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
    </div>
  );
}
function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

export default function Categories() {
  const [pageState, setPageState] = useState({
    isLoading: true,
    data: [],
    pageSize: 20,
    page: 1,
    totalData: 0,
  });
  const [SubCatpageState, setSubCatPageState] = useState({
    isLoading: true,
    data: [],
    pageSize: 20,
    page: 1,
    totalData: 0,
  });
  // const [categoryStatus, setCategoryStatus] = useState("all");
  // const [categoryType, setCategoryType] = useState("all");
  const [title, setTitle] = useState("Nueva Categoria");
  const [filter, setFilter] = useState("");
  const [subCatfilter, setSubCatFilter] = useState("");

  const [value, setValue] = useState(0);

  const [categories, setCategories] = useState({ isLoading: true, data: [] });
  const [imageFile, setImageFile] = useState();
  const [subCatimageFile, setsubCatImageFile] = useState();

  const [formOpen, setFormOpen] = useState(false);
  const [formData, setFormData] = useState();

  const [subCatformOpen, setSubCatFormOpen] = useState(false);
  const [subCatformData, setSubCatFormData] = useState();

  const { axiosInstance } = useAxios();

  // confirmation form states
  const [confirmOpen, setConfirmOpen] = useState(false);
  const [itemToDelete, setItemToDelete] = useState();
  const [subcatDelete, setSubCatToDelete] = useState();
  const [subCatConfirmOpen, setSubCatConfirmOpen] = useState(false);

  const toastId = useRef(null);

  const handleChange = (e, newValue) => {
    if (value === 0) {
      setTitle("Nueva subcategoria");
    } else if (value === 1) {
      setTitle("Nueva categoria");
    }
    setValue(newValue);
  };

  const locationRoutes = [
    {
      text: "Inicio",
      link: "/",
    },
    {
      text: "Categorias",
      link: "/categorias",
    },
  ];

  const setCategoriesAsync = async () => {
    try {
      setPageState({ ...pageState, isLoading: true });

      const queryFilters = `page=${pageState.page}&limit=${pageState.pageSize}&value=${filter}`;

      const { data: apiResponse } = await axiosInstance.get(
        `categories?${queryFilters}`
      );

      setPageState({
        ...pageState,
        isLoading: false,
        data: apiResponse.data,
        totalData: apiResponse.dataQuantity,
      });
    } catch (error) {
      toast.error(`Opps!, algo ha ocurrido ${error} `);
      setPageState({ ...pageState, isLoading: false });
    }
  };

  const setSubCategoriesAsync = async () => {
    try {
      setSubCatPageState({ ...SubCatpageState, isLoading: true });

      const queryFilters = `page=${SubCatpageState.page}&limit=${SubCatpageState.pageSize}&value=${subCatfilter}`;

      const { data: apiResponse } = await axiosInstance.get(
        `subcategories?${queryFilters}`
      );

      setSubCatPageState({
        ...SubCatpageState,
        isLoading: false,
        data: apiResponse.data,
        totalData: apiResponse.dataQuantity,
      });
    } catch (error) {
      toast.error(`Opps!, algo ha ocurrido ${error} `);
      setSubCatPageState({ ...SubCatpageState, isLoading: false });
    }
  };

  const upsertAsync = async (data) => {
    try {
      // loading toast
      toastId.current = toast("Please wait...", {
        type: toast.TYPE.LOADING,
      });

      // if there is any file
      let imageUrl = "";
      if (imageFile) {
        imageUrl = await postImage(imageFile);
      }
      const parsedData = { ...data, imageUrl };

      // logic
      if (data.id !== undefined) {
        // if the item exists
        await axiosInstance.put("/category", parsedData);
      } else {
        // if the item doesnt exists
        await axiosInstance.post("/category", parsedData);
      }

      // getting data back
      await setCategoriesAsync();

      // success toast
      toast.update(toastId.current, {
        type: toast.TYPE.SUCCESS,
        autoClose: 3000,
        render: "Exito",
      });
    } catch (error) {
      // error toast
      toast.error(`Opps!, something went wrong${error}`);

      // removing data from page
      setCategories({ isLoading: false, data: [] });
    }
  };

  const subCatupsertAsync = async (data) => {
    try {
      // loading toast
      toastId.current = toast("Please wait...", {
        type: toast.TYPE.LOADING,
      });

      // if there is any file
      let imageUrl = "";
      if (subCatimageFile) {
        imageUrl = await postImage(subCatimageFile);
      }
      const parsedData = { ...data, imageUrl };

      // logic
      if (data.id !== undefined) {
        // if the item exists
        await axiosInstance.put("/subcategory", parsedData);
      } else {
        // if the item doesnt exists
        await axiosInstance.post("/subcategory", parsedData);
      }

      // getting data back
      await setSubCategoriesAsync();

      // success toast
      toast.update(toastId.current, {
        type: toast.TYPE.SUCCESS,
        autoClose: 3000,
        render: "Exito",
      });
    } catch (error) {
      // error toast
      toast.error(`Opps!, something went wrong${error}`);

      // removing data from page
      //  setCategories({ isLoading: false, data: [] });
    }
  };

  const deleteAsync = async () => {
    try {
      toastId.current = toast("Please wait...", {
        type: toast.TYPE.LOADING,
      });
      await axiosInstance.delete(`/category/ ${itemToDelete.id}`);
      toast.update(toastId.current, {
        type: toast.TYPE.SUCCESS,
        autoClose: 5000,
        render: "Exito",
      });
      setConfirmOpen(false);
      await setCategoriesAsync();
    } catch (error) {
      toast.error(`Opps!, something went wrong${error}`);
      // setCategories({ isLoading: false, data: [] });
      console.log(error);
    }
  };

  const subCatdeleteAsync = async () => {
    try {
      toastId.current = toast("Please wait...", {
        type: toast.TYPE.LOADING,
      });
      await axiosInstance.delete(`/subcategory/ ${subcatDelete.id}`);
      toast.update(toastId.current, {
        type: toast.TYPE.SUCCESS,
        autoClose: 5000,
        render: "Exito",
      });
      setSubCatConfirmOpen(false);
      await setSubCategoriesAsync();
    } catch (error) {
      toast.error(`Opps!, something went wrong${error}`);
      // setSubCategories({ isLoading: false, data: [] });
      console.log(error);
    }
  };

  useEffect(() => {
    setCategoriesAsync();
    setSubCategoriesAsync();
  }, [
    pageState.page,
    pageState.pageSize,
    filter,
    SubCatpageState.page,
    SubCatpageState.pageSize,
    subCatfilter,
  ]);

  return (
    <>
      <div className="w-full md:px-0 px-4 md:pr-8 flex flex-col">
        <div className="flex w-full justify-between items-center pr-8">
          <div>
            <PageHeader header="Categorias" locationRoutes={locationRoutes} />
          </div>
          <div className="flex">
            {/* Category Button */}
            <div className={`${value && "hidden"} flex `}>
              <Button
                className=" z-auto rounded-xl py-2 bg-green-600 hover:bg-green-800"
                variant="contained"
                onClick={() => {
                  setFormOpen(true);
                  setFormData({});
                }}
                startIcon={<Add className="text-white" />}
              >
                <span className="text-sm whitespace-nowrap text-neutral-50 capitalize font-bold">
                  {title}
                </span>
              </Button>
            </div>
            {/* SubCategory Button */}
            <div className={`${!value && "hidden"} flex `}>
              <Button
                className=" z-auto rounded-xl py-2 bg-green-600 hover:bg-green-800"
                variant="contained"
                onClick={() => {
                  setSubCatFormOpen(true);
                  setSubCatFormData({});
                }}
                startIcon={<Add className="text-white" />}
              >
                <span className="text-sm whitespace-nowrap text-neutral-50 capitalize font-bold">
                  {title}
                </span>
              </Button>
            </div>
          </div>
        </div>
        <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
          <Tabs
            aria-label="basic tabs example"
            value={value}
            onChange={handleChange}
          >
            <Tab
              icon={<Category />}
              style={{
                minHeight: "10px",
                fontSize: "14px",
                textTransform: "none",
              }}
              iconPosition="start"
              label="Categorias"
              {...a11yProps(0)}
            />
            <Tab
              icon={<Class />}
              style={{
                minHeight: "10px",
                fontSize: "14px",
                textTransform: "none",
              }}
              iconPosition="start"
              label="SubCategorias"
              {...a11yProps(1)}
            />
          </Tabs>
        </Box>
        <TabPanel value={value} index={0}>
          <CategoryList
            pageState={pageState}
            // setCategoryStatus={setCategoryStatus}
            // setCategoryType={setCategoryType}
            // categoryStatus={categoryStatus}
            // categoryType={categoryType}
            setFilter={setFilter}
            setPageState={setPageState}
            setFormOpen={setFormOpen}
            setFormData={setFormData}
            setItemToDelete={setItemToDelete}
            setConfirmOpen={setConfirmOpen}
          />
        </TabPanel>
        <TabPanel value={value} index={1}>
          <SubCategoryList
            pageState={SubCatpageState}
            setPageState={setSubCatPageState}
            setItemToDelete={setSubCatToDelete}
            setConfirmOpen={setSubCatConfirmOpen}
            setFormOpen={setSubCatFormOpen}
            setFormData={setSubCatFormData}
            setFilter={setSubCatFilter}
          />
        </TabPanel>

        {/* Category Form */}
        <ConfirmationForm
          open={confirmOpen}
          setOpen={setConfirmOpen}
          onConfirm={deleteAsync}
          message={"eliminar esta categoria"}
        />
        <CategoryForm
          open={formOpen}
          setOpen={setFormOpen}
          data={formData}
          onSave={upsertAsync}
          setFile={setImageFile}
          file={imageFile}
        />
        {/* SubCategory Form */}
        <ConfirmationForm
          open={subCatConfirmOpen}
          setOpen={setSubCatConfirmOpen}
          onConfirm={subCatdeleteAsync}
          message={"eliminar esta subcategoria"}
        />
        <SubCategoryForm
          open={subCatformOpen}
          setOpen={setSubCatFormOpen}
          data={subCatformData}
          onSave={subCatupsertAsync}
          setFile={setsubCatImageFile}
          file={subCatimageFile}
        />
      </div>
    </>
  );
}
