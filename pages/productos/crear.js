import { Inventory2Rounded } from "@mui/icons-material";
import PageHeader from "../../Components/Globals/PageHeader";
import ProductsForm from "../../Components/Products/ProductForm";

export default function Crear() {
  return (
    <div>
      <PageHeader
        header="Crear un nuevo producto"
        locationRoutes={[
          { text: "Inicio", link: "/" },
          { text: "Productos", link: "/productos" },
          { text: "Crear", link: "/products/crear" },
        ]}
        Icon={<Inventory2Rounded />}
      />
      <ProductsForm />
    </div>
  );
}
