import { useEffect, useState } from "react";
import useAxios from "../../Axios/Axios";
import ProductForm from "../../Components/Products/ProductForm";

export default function Product({ id }) {
  const [product, setProduct] = useState({});
  const { axiosInstance } = useAxios();
  useEffect(() => {
    const getProductAsync = async () => {
      const { data } = await axiosInstance.get(`product/${id}`);
      setProduct(data);
    };
    getProductAsync();
  }, []);
  return <ProductForm product={product} />;
}
export async function getServerSideProps({ params }) {
  return {
    props: { id: params.id },
  };
}
