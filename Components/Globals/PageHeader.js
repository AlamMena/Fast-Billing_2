import { Breadcrumbs, Link, Typography } from "@mui/material";
import { useEffect } from "react";

export default function PageHeader({ header, locationRoutes, Icon, text }) {
  return (
    <div className="flex flex-col my-2 p-4 space-y-4">
      <div className="flex items-center">
        <div className="bg-neutral-100 rounded-full p-2 text-green-400">
          {/* <Icon className="text-green-400" /> */}
          {Icon}
        </div>
        <div className=" max-w-xl">
          <h1 className="text-xl font-bold ml-2">{header}</h1>
          {text && (
            <span className="text-xs text-black text-opacity-60 p-3 ">
              {" "}
              {text}
            </span>
          )}
        </div>
      </div>

      <div role="presentation">
        <Breadcrumbs
          aria-label="breadcrumb"
          separator={<div className="w-1 h-1 rounded-full bg-neutral-500" />}
        >
          {locationRoutes.map((item, index) => {
            return (
              <Link
                key={index}
                underline="hover"
                color="inherit"
                className="text-sm"
                href={item.link}
              >
                {item.text}
              </Link>
            );
          })}
        </Breadcrumbs>
      </div>
    </div>
  );
}
