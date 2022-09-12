import PageHeader from "../../Components/Globals/PageHeader";
import ProductsForm from "../../Components/Products/ProductsForm";

export default function Crear() {
  return (
    <div>
      <PageHeader
        header="Crear un nuevo producto"
        locationRoutes={[
          { text: "home", link: "/" },
          { text: "contactos", link: "/" },
          { text: "crear", link: "/" },
        ]}
      />
      <ProductsForm />
    </div>
  );
}
