import { useEffect, useState } from "react";
import useAxios from "../../Axios/Axios";
import ContactForm from "../../components/Contacts/ContactForm";
import PageHeader from "../../Components/Globals/PageHeader";
import { Box, Tabs, Tab, Typography } from "@mui/material";
import { AccountCircle, Receipt } from "@mui/icons-material";
import { fontSize } from "@mui/system";
import SuplierForm from "../../Components/Supliers/SupliersForm";

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
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
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

export default function UpsertSuplier({ id }) {
  const [value, setValue] = useState(0);
  const [suplier, setSuplier] = useState();
  const { axiosInstance } = useAxios();
  const getSuplierAsync = async () => {
    const { data } = await axiosInstance.get(`v1/suplier?id=${id}`);
    setSuplier(data);
  };

  useEffect(() => {
    getSuplierAsync();
  }, []);

  const handleChange = (e, newValue) => {
    setValue(newValue);
  };

  const locationRoutes = [
    {
      text: "home",
      link: "/",
    },
    {
      text: "Suplidores",
      link: "/suplidores",
    },
    {
      text: "crear",
      link: "/suplidores/crear",
    },
  ];

  return (
    <div className="-full md:px-0 px-4 md:pr-8 flex flex-col pb-5">
      <div className="flex w-full justify-between items-center pr-8 ">
        <PageHeader
          header="Modificar Contactos"
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
        <SuplierForm suplier={suplier} />
      </TabPanel>
      <TabPanel value={value} index={1}>
        {/* <ContactHistory contact={contact} /> */}
      </TabPanel>
    </div>
  );
}

export async function getServerSideProps({ params }) {
  return {
    props: { id: params.id },
  };
}
