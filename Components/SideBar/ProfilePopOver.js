import * as React from "react";
import Popover from "@mui/material/Popover";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import { Divider } from "@mui/material";
import useAuth, { LogOut } from "../../Auth/useAuth";

export default function ProfilePopOver() {
  const { LogOut } = useAuth();

  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  const id = open ? "simple-popover" : undefined;

  return (
    <div>
      <img
        aria-describedby={id}
        variant="contained"
        onClick={handleClick}
        className="rounded-full  w-12 h-12 appBar-button-animation"
        src="https://cdn-icons-png.flaticon.com/128/2202/2202112.png"
      />
      <Popover
        id={id}
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "left",
        }}
      >
        <div className="flex flex-col text-sm rounded-2xl">
          <div className="flex flex-col px-4 py-2 mt-1">
            <span className="font-semibold">AlamMena</span>
            <span className=" text-neutral-400">amenabeato@gmail.com</span>
          </div>
          <Divider className="px-0" />
          <div className="flex flex-col mx-2 my-2 ">
            <span className="px-2 py-2 cursor-pointer hover:bg-slate-100 rounded-lg duration-200">
              Home
            </span>
            <span className="px-2 py-2 cursor-pointer hover:bg-slate-100 rounded-lg duration-200">
              Profile
            </span>
            <span className="px-2 py-2 cursor-pointer hover:bg-slate-100 rounded-lg duration-200">
              Settings
            </span>
          </div>
          <Divider className="px-0" />
          <div className="flex flex-col mx-2 py-2 ">
            <span
              className="px-2 py-2 cursor-pointer hover:bg-slate-100 rounded-lg duration-200"
              onClick={() => LogOut()}
            >
              Logout
            </span>
          </div>
        </div>
      </Popover>
    </div>
  );
}
