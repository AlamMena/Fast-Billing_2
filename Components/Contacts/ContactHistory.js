import React from "react";
import { List, ListItem, IconButton, ListItemText } from "@mui/material";
import { Download } from "@mui/icons-material";

export default function ContactHistory({ contact }) {
  return (
    <>
      <div className=" rounded-t-lg shadow-sm text-lg tracking-wider font-bold p-2 bg-slate-200">
        Historial de facturas
      </div>
      <div>
        <List
          sx={{
            width: "100%",
            height: "100%",
            maxHeight: 295,
            boxShadow: 3,
            borderBottomRightRadius: 19,
            borderBottomLeftRadius: 19,
            overflow: "auto",
          }}
        >
          {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((value) => (
            <ListItem
              key={value}
              divider
              secondaryAction={
                <IconButton aria-label="comment">
                  <Download />
                </IconButton>
              }
            >
              <ListItemText primary={`Linea de tiempo ${value}`} />
            </ListItem>
          ))}
        </List>
      </div>
    </>
  );
}
