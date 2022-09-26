import {
  Dialog,
  DialogContent,
  DialogTitle,
  Button,
  DialogActions,
  TableContainer,
  Table,
  TableHead,
  TableRow,
  TableBody,
  StyledTableCell,
  TableCell,
  FormControl,
  OutlinedInput,
  InputAdornment,
  InputLabel,
} from "@mui/material";
import Paper from "@mui/material";
import { useDispatch } from "react-redux";
import { addItem } from "../../Store/InvoiceSlice";
import useAxios from "../../Axios/Axios";
import { useState, useEffect } from "react";
import ProductList from "../Products/ProductsList";

export default function SelectProducts({ data, open, setProductPop }) {
  const dispatch = useDispatch();
  const { axiosInstance } = useAxios();
  const [products, setProducts] = useState([]);
  const [filter, setFilter] = useState("");

  const getProductsFiltered = async (value) => {
    setFilter(value);
    axiosInstance.get(`v1/products/filtered?value=${value}`).then((res) => {
      setProducts(res.data.filter((item) => item.IsDeleted === true));
    });
    console.log(products);
  };

  const handleProduct = (item) => {
    dispatch(addItem(item.row));
    setProductPop(false);
    setProducts([]);
  };

  const handleFilter = debounce((value) => getProductsFiltered(value));

  function debounce(func, timeout = 800) {
    let timer;
    return (...args) => {
      clearTimeout(timer);
      timer = setTimeout(() => {
        func.apply(this, args);
      }, timeout);
    };
  }

  return (
    <Dialog
      open={open}
      onClose={() => setProductPop(false)}
      fullWidth={true}
      maxWidth={"sm"}
    >
      <ProductList
        statusFilter={"false"}
        actions={false}
        maxRow={3}
        onRowClick={handleProduct}
      />
    </Dialog>
  );
}
