import Head from "next/head";
import Image from "next/image";
import jsPDF from "jspdf";
import { renderToString } from "react-dom/server";
import * as React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";

function createData(name, calories, fat, carbs, protein) {
  return { name, calories, fat, carbs, protein };
}

const rows = [
  createData("Frozen yoghurt", 159, 6.0, 24, 4.0),
  createData("Ice cream sandwich", 237, 9.0, 37, 4.3),
  createData("Eclair", 262, 16.0, 24, 6.0),
  createData("Cupcake", 305, 3.7, 67, 4.3),
  createData("Gingerbread", 356, 16.0, 49, 3.9),
];

export default function Home() {
  return (
    <>
      {/* <div className="px-10 max-w-2xl mx-8 md:mx-0 space-x-4 bg-green-200 flex md:flex-nowrap justify-center flex-wrap items-center p-8 rounded-2xl">
        <div className="flex flex-col ">
          <span className="font-semibold text-2xl tracking-wider">
            Welcome back Alam
          </span>
          <p className="text-xs mt-4">
            If you are going to use a passage of Lorem Ipsum, you need to be
            sure there is not anything
          </p>
          <div className="flex w-full justify-center md:justify-start my-4">
            <button
              onClick={generatePDF}
              className=" my-4 shadow-sm w-24 bg-green-500 py-2 px-4 text-xs rounded-xl text-white"
            >
              Go now
            </button>
          </div>
        </div>
        <div className="flex">
          <img
            alt="welcome image"
            className="md:w-72 h-full w-64"
            src="/dashboard_welcome.png"
          />
        </div>
      </div> */}
    </>
  );
}
