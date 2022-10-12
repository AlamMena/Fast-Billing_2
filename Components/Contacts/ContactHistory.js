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
} from "@mui/material";
import { Download } from "@mui/icons-material";

export default function ContactHistory({ contact }) {
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
      <div className=" rounded-t-lg shadow-sm text-lg tracking-wider font-bold p-2 ">
        Transacciones
      </div>
      <div className="max-h-80 overflow-auto">
        {item}
        {item}
      </div>
    </div>
  );
}
