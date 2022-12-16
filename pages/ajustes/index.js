import React from "react";
import { Box, Tabs, Tab, Typography } from "@mui/material";
import PageHeader from "../../Components/Globals/PageHeader";
import { useState } from "react";
import SettingsIcon from "@mui/icons-material/Settings";
import ProfileSettings from "./perfil";
import { SettingsOutlined } from "@mui/icons-material";

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

export default function Settings() {
  const [value, setValue] = useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const locationRoutes = [
    {
      text: "Inicio",
      link: "/",
    },
    {
      text: "Ajustes",
      link: "/ajustes",
    },
  ];

  return (
    <div className="-full md:px-0 px-4 md:pr-8 flex flex-col pb-5">
      <div className="flex w-full justify-between items-center pr-8 wid">
        <PageHeader
          header="Ajustes de Perfil"
          locationRoutes={locationRoutes}
          Icon={<SettingsOutlined />}
        />
      </div>
      <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
        <Tabs aria-label="basic tabs example" value={value}>
          <Tab
            icon={<SettingsIcon />}
            iconPosition="start"
            label="Ajustes"
            {...a11yProps(0)}
          />
        </Tabs>
      </Box>
      <TabPanel value={value} index={0}>
        <ProfileSettings />
      </TabPanel>
    </div>
  );
}
