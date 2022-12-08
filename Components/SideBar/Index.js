import {
  AddBoxRounded,
  AddRounded,
  AppsOutlined,
  AssessmentOutlined,
  CategoryOutlined,
  ContactPageOutlined,
  ContactsOutlined,
  DashboardOutlined,
  GifBox,
  HomeOutlined,
  HomeRounded,
  Inventory2Outlined,
  Inventory2Rounded,
  LabelOutlined,
  ListAltRounded,
  MenuBookRounded,
  MenuRounded,
  PaidOutlined,
  ReceiptOutlined,
  RoomRounded,
  RouteRounded,
  SearchRounded,
  Settings,
  SellOutlined,
  AccountTreeRounded,
  CategoryRounded,
  MuseumRounded,
  AccountTreeOutlined,
  MuseumOutlined,
  SettingsOutlined,
} from "@mui/icons-material";
import { Menu, MenuItem, Popover, Slide, Typography } from "@mui/material";
import { useState } from "react";
import { BiUser, BsGrid } from "react-icons/bi";
import ProfilePopOver from "./ProfilePopOver";
import NotificationPopOver from "./NotificationPopOver";
import { useRouter } from "next/router";
import { styled, alpha } from "@mui/material/styles";
import InputBase from "@mui/material/InputBase";
import MenuIcon from "@mui/icons-material/Menu";
import SearchIcon from "@mui/icons-material/Search";

const routes = [
  {
    header: "General",
    items: [
      {
        text: "Inicio",
        path: "./",
        Icon: <DashboardOutlined />,
      },
      {
        text: "Ajustes",
        path: "./ajustes",
        Icon: <SettingsOutlined />,
      },
      {
        text: "Sucursales",
        path: "/sucursales",
        Icon: <AssessmentOutlined />,
      },
    ],
  },

  {
    header: "Inventario",
    Icon: <AddBoxRounded />,
    items: [
      {
        text: "Productos",
        path: "/productos",
        Icon: <Inventory2Outlined />,
      },
      {
        text: "Categorias",
        path: "/categorias",
        Icon: <CategoryOutlined />,
      },
      {
        text: "Subcategorias",
        path: "/subcategorias",
        Icon: <AccountTreeOutlined />,
      },
      {
        text: "Marcas",
        path: "/marcas",
        Icon: <MuseumOutlined />,
      },

      {
        text: "Clientes",
        path: "/clientes",
        Icon: <ContactPageOutlined />,
      },
    ],
  },
  {
    header: "Facturacion",
    items: [
      {
        text: "Ventas",
        path: "/facturas",
        Icon: <SellOutlined />,
      },
      // {
      //   text: "Suplidores",
      //   path: "/suplidores",
      //   Icon: <ContactPageOutlined />,
      // },
      // {
      //   text: "Transacciones",
      //   path: "./",
      //   Icon: <PaidOutlined />,
      // },
    ],
  },
];

const Search = styled("div")(({ theme }) => ({
  position: "relative",
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.black, 0.04),

  marginLeft: 0,
  width: "100%",
  [theme.breakpoints.up("sm")]: {
    marginLeft: theme.spacing(1),
    width: "auto",
  },
}));

const SearchIconWrapper = styled("div")(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: "100%",
  position: "absolute",
  pointerEvents: "none",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: "inherit",
  "& .MuiInputBase-input": {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create("width"),
    width: "100%",
    [theme.breakpoints.up("sm")]: {
      width: "12ch",
      "&:focus": {
        width: "20ch",
      },
    },
  },
}));

export default function Index() {
  const [open, setOpen] = useState(false);

  const router = useRouter();

  return (
    <div className="flex flex-col ">
      <div
        className={`${
          !open && "hidden"
        } md:hidden transition-all duration-300 bg-gradient-to-l from-neutral-700 bg-opacity-90 absolute inset-0 z-50`}
        onClick={() => setOpen(false)}
      />
      <div className="md:ml-64 md:px-8 px-2 flex justify-between my-4 items-center shadow-sm">
        <div className="flex items-center">
          <div className={` ${!open ? "flex " : "hidden"} m-4 md:hidden`}>
            <MenuRounded
              className={` ${!open ? "flex md:hidden" : "hidden"} m-4`}
              onClick={() => setOpen(true)}
            />
          </div>
          {/* <SearchRounded className="cursor-pointer" /> */}
          <Search>
            <SearchIconWrapper>
              <SearchIcon />
            </SearchIconWrapper>
            <StyledInputBase
              placeholder="Search…"
              inputProps={{ "aria-label": "search" }}
            />
          </Search>{" "}
        </div>

        <div className="flex items-center space-x-4">
          <img
            className="w-6 h-5 mx-2 appBar-button-animation"
            src="https://cdn-icons-png.flaticon.com/128/299/299901.png"
          />

          <NotificationPopOver />
          <ProfilePopOver />
          {/* <img
            className="rounded-full w-12 h-12"
            src="https://cdn-icons-png.flaticon.com/128/2202/2202112.png"
          /> */}
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
        {routes.map((route, index) => {
          return (
            <div key={index}>
              <h2 className=" mt-4 px-4 font-semibold tracking-wider ">
                {route.header}
              </h2>
              <div className="flex flex-col text-xs my-2 space-y-2 ml-2">
                {route.items.map((item, index) => {
                  let isActive = item.path === router.pathname;
                  return (
                    <div
                      key={index}
                      onClick={() => {
                        router.push(item.path);
                      }}
                      className={`flex items-center w-full space-x-2  hover:bg-green-50 hover:text-green-600 py-2 px-4 rounded-xl cursor-pointer
                      ${
                        isActive
                          ? "bg-green-50 text-green-600"
                          : "text-slate-500"
                      }`}
                    >
                      {item.Icon}
                      <span className=" text-sm">{item.text}</span>
                    </div>
                  );
                })}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
