import {
  BoyRounded,
  Dashboard,
  Home,
  HomeOutlined,
  HomeRounded,
  MenuBookRounded,
  MenuRounded,
  Notifications,
  NotificationsRounded,
  RoomRounded,
  RouteRounded,
  SearchOffOutlined,
  SearchOutlined,
  SearchRounded,
  VerifiedUserRounded,
} from "@mui/icons-material";
import { Menu, MenuItem, Slide } from "@mui/material";
import { useState } from "react";
import { BiUser, BsGrid } from "react-icons/bi";
export default function Index() {
  const [open, setOpen] = useState(true);
  return (
    <div className="flex flex-col ">
      <div
        className={`${
          !open && "hidden"
        } md:hidden transition-all duration-300 bg-gradient-to-l from-neutral-700 bg-opacity-90 absolute inset-0 z-`}
        onClick={() => setOpen(false)}
      />
      <div className="md:ml-64 md:px-8 px-2 flex justify-between my-4 items-center shadow-sm">
        <div className="flex items-center">
          <MenuRounded
            className={` ${!open ? "flex" : "hidden"} md:hidden m-4`}
            onClick={() => setOpen(true)}
          />
          <SearchRounded />
        </div>

        <div className="flex items-center space-x-4">
          <img
            className="w-6 h-6 mx-2"
            src="https://cdn-icons-png.flaticon.com/128/299/299901.png"
          />
          <NotificationsRounded />

          <img
            className="rounded-full w-12 h-12"
            src="https://cdn-icons-png.flaticon.com/128/2202/2202112.png"
          />
        </div>
      </div>
      <div
        className={`${
          !open && "hidden"
        } md:flex z-50 overflow-y-auto fixed bg-white flex-col w-64 h-screen px-4 shadow-md`}
      >
        <img
          className=" w-8 h-8 my-4"
          src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ3bAlqaZSh0mViahdE_MNIduBQZBWwyBEZtA&usqp=CAU"
        ></img>
        <div className=" px-4 py-2 my-4 flex space-x-3 bg-neutral-100 rounded-lg">
          <img
            className=" rounded-full w-12 h-12"
            src="https://cdn-icons-png.flaticon.com/128/2202/2202112.png"
          />
          <div className="flex flex-col">
            <span>Alam Mena</span>
            <span className="text-xs text-neutral-500">admin</span>
          </div>
        </div>
        <h2 className=" mt-4 px-4">General</h2>
        <div className="flex flex-col text-xs my-2 space-y-4">
          <div className="flex w-full space-x-2 items-center bg-green-50 py-2 px-4 rounded-xl cursor-pointer text-green-600">
            <HomeRounded />
            <span className=" text-sm">Home</span>
          </div>

          {[
            { text: "Products", Icon: <RoomRounded /> },
            { text: "Contacts", Icon: <RouteRounded /> },
            { text: "Configuration", Icon: <MenuBookRounded /> },
          ].map((item) => {
            return (
              <div className="flex items-center w-full space-x-2 text-slate-500 hover:bg-green-50 hover:text-green-600 py-2 px-4 rounded-xl cursor-pointer">
                {item.Icon}
                <span className=" text-sm">{item.text}</span>
              </div>
            );
          })}
        </div>
        <h2 className=" mt-4 px-4 my-4 ">Products </h2>

        {[
          { text: "Products", Icon: <RoomRounded /> },
          { text: "Contacts", Icon: <RouteRounded /> },
          { text: "Configuration", Icon: <MenuBookRounded /> },
        ].map((item) => {
          return (
            <div className="flex items-center w-full space-x-2 text-slate-500 hover:bg-green-50 hover:text-green-600 py-2 px-4 rounded-xl cursor-pointer">
              {item.Icon}
              <span className=" text-sm">{item.text}</span>
            </div>
          );
        })}

        <h2 className=" mt-4 px-4 my-4 ">Invoice </h2>

        {[
          { text: "Products", Icon: <RoomRounded /> },
          { text: "Contacts", Icon: <RouteRounded /> },
          { text: "Configuration", Icon: <MenuBookRounded /> },
        ].map((item) => {
          return (
            <div className="flex items-center w-full space-x-2 text-slate-500 hover:bg-green-50 hover:text-green-600 py-2 px-4 rounded-xl cursor-pointer">
              {item.Icon}
              <span className=" text-sm">{item.text}</span>
            </div>
          );
        })}

        <h2 className=" mt-4 px-4 my-2 ">Contacts </h2>

        {[
          { text: "Products", Icon: <RoomRounded /> },
          { text: "Contacts", Icon: <RouteRounded /> },
          { text: "Configuration", Icon: <MenuBookRounded /> },
        ].map((item) => {
          return (
            <div className="flex items-center w-full space-x-2 text-slate-500 hover:bg-green-50 hover:text-green-600 py-2 px-4 rounded-xl cursor-pointer">
              {item.Icon}
              <span className=" text-sm">{item.text}</span>
            </div>
          );
        })}
      </div>
    </div>
  );
}
