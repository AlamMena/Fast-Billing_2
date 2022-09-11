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
    dispatch(addItem(item));
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
    <Dialog open={open} fullWidth={true} maxWidth={"sm"}>
      <DialogTitle>Selecciona un producto</DialogTitle>
      <div className="p-4">
        <FormControl className="w-full">
          <InputLabel size="small">Buscar</InputLabel>
          <OutlinedInput
            id="outlined-adornment-name"
            label="Buscar"
            placeholder="Buscar producto..."
            size="small"
            className="rounded-xl"
            variant="outlined"
            onChange={(e) => handleFilter(e.target.value)}
          />
        </FormControl>
      </div>
      <DialogContent dividers={true}>
        <TableContainer>
          <Table aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell>Producto</TableCell>
                <TableCell>Descripcion</TableCell>
                <TableCell align="right">Precio</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {products.map((item) => (
                <TableRow
                  key={item._id}
                  className=" odd:bg-neutral-100 cursor-pointer hover:bg-neutral-200"
                  onClick={() => handleProduct(item)}
                >
                  <TableCell className="flex items-center">
                    <img
                      src={item.images[0]}
                      className="w-8 h-8 rounded-full"
                    />
                    <span className="px-3 font-bold">{item.name}</span>
                  </TableCell>
                  <TableCell>{item.description}</TableCell>
                  <TableCell align="right">{item.price}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>{" "}
      </DialogContent>
      <DialogActions>
        <Button
          onClick={() => {
            setProductPop(false);
            setProducts([]);
          }}
        >
          Cerrar
        </Button>
      </DialogActions>
    </Dialog>
  );
}
