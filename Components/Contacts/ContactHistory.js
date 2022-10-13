import React from "react";
import {
  List,
  ListItem,
  IconButton,
  ListItemText,
  ListItemAvatar,
  Avatar,
  Typography,
  Divider,
  InputLabel,
  InputAdornment,
  OutlinedInput,
} from "@mui/material";

import { Add, DateRangeRounded, Edit } from "@mui/icons-material";

import { Download } from "@mui/icons-material";
import dayjs from "dayjs";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { MobileDatePicker } from "@mui/x-date-pickers";

import { useState, useEffect } from "react";
import { borderColor } from "@mui/system";

export default function ContactHistory({ contact }) {
  const [currentDate, setCurrentDate] = useState(dayjs());

  const handleDateChange = (value) => {
    setCurrentDate(value);
  };

  const item = (
    <List sx={{ width: "100%", bgcolor: "background.paper" }}>
      <div className="flex justify-around items-center">
        <div>
          <ListItem alignItems="flex-start">
            <ListItemAvatar>
              <Avatar alt="Amazon" src="/static/images/avatar/1.jpg" />
            </ListItemAvatar>
            <ListItemText
              primary="Amazon Support"
              secondary={
                <React.Fragment>
                  <Typography
                    sx={{ display: "inline" }}
                    component="span"
                    variant="body2"
                    color="text.primary"
                  ></Typography>
                  {"10 Oct. 2022 at 4:30pm"}
                </React.Fragment>
              }
            />
          </ListItem>
        </div>
        <div className="">
          {1 < 1 ? (
            <span className="flex space-x-2">
              <span className="bg-red-200 rounded-2xl px-1 py-1 flex items-center">
                <span className="w-2 h-2 rounded-full mx-2 bg-red-700 animate-pulse  "></span>
              </span>
              <span>Debiendo</span>
            </span>
          ) : (
            <span className="flex space-x-2">
              <span className="bg-green-200 rounded-lg px-1 py-1 flex items-center">
                <span className="w-2 h-2 rounded-full mx-2 bg-green-700 animate-pulse  "></span>
              </span>
              <span>Pagado</span>
            </span>
          )}
        </div>
        <div className="text-md font-semibold">$220,000USD</div>
      </div>
      <Divider />
    </List>
  );

  return (
    <div className="col-span-12 p-5">
      <div className="flex-col lg:flex justify-center md:justify-between p-4 items-center">
        <span className=" text-lg tracking-wider font-bold ">
          Transacciones
        </span>
        <div className=" space-x-2 ">
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <MobileDatePicker
              inputFormat="MM/DD/YYYY"
              value={currentDate}
              className="rounded-xl"
              onChange={handleDateChange}
              renderInput={(params) => (
                <OutlinedInput
                  size="small"
                  sx={{
                    backgroundColor: "#F5F5F5	",
                    borderColor: "#F5F5F5",
                    color: "#B0B0B0	",
                    width: 180,
                  }}
                  endAdornment={
                    <InputAdornment position="start">
                      <DateRangeRounded />
                    </InputAdornment>
                  }
                  {...params}
                />
              )}
            />
          </LocalizationProvider>
          <IconButton
            size="medium"
            className="w-10  bg-green-600 hover:bg-green-700 hover:text-white text-white rounded-2xl"
            // onClick={() => setContent(0)}
            color="secondary"
            variant="contained"
          >
            <Add />
          </IconButton>
        </div>
      </div>
      <div className="max-h-80 overflow-auto w-full min-h-full">
        {item}
        {item}
      </div>
    </div>
  );
}
