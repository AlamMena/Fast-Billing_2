import { useEffect, useState } from "react";
import useAxios from "../../Axios/Axios";
import ContactForm from "../../Components/Contacts/ContactForm";
import PageHeader from "../../Components/Globals/PageHeader";
import { Box, Tabs, Tab, Typography } from "@mui/material";
import { AccountCircle, Receipt } from "@mui/icons-material";
import ContactHistory from "../../Components/Contacts/ContactHistory";
import { fontSize } from "@mui/system";

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
      {value === index && (
        <Box>
          <div> {children}</div>
        </Box>
      )}
    </div>
  );
}
function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

export default function UpsertContact({ id }) {
  const [value, setValue] = useState(0);
  const [client, setClient] = useState();
  const { axiosInstance } = useAxios();

  const getClientAsync = async () => {
    const { data } = await axiosInstance.get(`client/${id}`);
    setClient(data);
  };

  useEffect(() => {
    getClientAsync();
  }, []);

  const handleChange = (e, newValue) => {
    setValue(newValue);
  };

  const locationRoutes = [
    {
      text: "Inicio",
      link: "/",
    },
    {
      text: "Clientes",
      link: "/clientes",
    },
    {
      text: "Crear",
      link: "/clientes/crear",
    },
  ];

  return (
    <div className="-full md:px-0 px-4 md:pr-8 flex flex-col pb-5">
      <div className="flex w-full justify-between items-center pr-8 ">
        <PageHeader
          header="Modificar Cliente"
          locationRoutes={locationRoutes}
        />
      </div>
      <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
        <Tabs
          aria-label="basic tabs example"
          value={value}
          onChange={handleChange}
        >
          <Tab
            icon={<AccountCircle />}
            style={{
              minHeight: "10px",
              fontSize: "14px",
              textTransform: "none",
            }}
            iconPosition="start"
            label="Ajustes"
            {...a11yProps(0)}
          />
          <Tab
            icon={<Receipt />}
            style={{
              minHeight: "10px",
              fontSize: "14px",
              textTransform: "none",
            }}
            iconPosition="start"
            label="Historial"
            {...a11yProps(1)}
          />
        </Tabs>
      </Box>
      <TabPanel value={value} index={0}>
        <ContactForm contact={client} />
      </TabPanel>
      <TabPanel value={value} index={1}>
        <ContactHistory contact={client} />
      </TabPanel>
    </div>
  );
}

export async function getServerSideProps({ params }) {
  return {
    props: { id: params.id },
  };
}
