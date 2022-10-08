import { useEffect, useState } from "react";
import useAxios from "../../Axios/Axios";
import ProductFrom from "../../Components/Products/ProductForm";

export default function UpsertProduct({ id }) {
  const [product, setProduct] = useState();
  const { axiosInstance } = useAxios();

  const getProductAsync = async () => {
    const { data } = await axiosInstance.get(`product/${id}`);
    setProduct(data);
  };

  useEffect(() => {
    getProductAsync();
    alert(JSON.stringify(product));
  }, []);
  return <ProductFrom product={product} />;
}

export async function getServerSideProps({ params }) {
  return {
    props: { id: params.id },
  };
}
