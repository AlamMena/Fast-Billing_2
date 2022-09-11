import { useEffect, useState } from "react";
import useAxios from "../../Axios/Axios";
import ContactForm from "../../components/Contacts/ContactForm";

export default function UpsertContact({ id }) {
  const [contact, setContact] = useState({});
  const { axiosInstance } = useAxios();
  const getContactAsync = async () => {
    const { data } = await axiosInstance.get(`v1/contact?id=${id}`);
    setContact(data);
  };

  useEffect(() => {
    getContactAsync();
  }, []);
  return <ContactForm contact={contact} />;
}

export async function getServerSideProps({ params }) {
  return {
    props: { id: params.id },
  };
}
