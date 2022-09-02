import { Breadcrumbs, Link, Typography } from "@mui/material";
import CircleIcon from "@mui/icons-material/Circle";

export default function PageHeader({ header, ubicationRoutes }) {
  return (
    <div className="flex flex-col my-4 p-4 space-y-4">
      <h1 className="font-semibold text-2xl ">{header}</h1>
      <div role="presentation">
        <Breadcrumbs
          aria-label="breadcrumb"
          separator={<CircleIcon className="w-1" />}
        >
          {ubicationRoutes.map((item, index) => {
            return (
              <Link
                key={index}
                underline="hover"
                color="inherit"
                className="text-sm"
                href="/"
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
