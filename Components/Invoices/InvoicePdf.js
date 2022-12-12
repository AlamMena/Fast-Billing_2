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
import { formatCurrency } from "../../utils/methods";

function InvoicePdf({ invoice }) {
  return (
    <>
      <div className="w-full flex flex-col space-y-2 mb-10">
        <span className=" text-4xl font-bold tracking-widest">Factura</span>
        <span className=" text-sm  tracking-wide">Fast Billing</span>
      </div>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow className="bg-slate-800 h-6">
              <TableCell className="font-bold text-white">Id</TableCell>

              <TableCell className="font-bold text-white">Nombre</TableCell>
              <TableCell className="font-bold text-white" align="right">
                Qty
              </TableCell>
              <TableCell align="right" className="font-bold text-white">
                Impuesto
              </TableCell>
              <TableCell align="right" className="font-bold text-white">
                Total
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {invoice.details.map((row, index) => (
              <TableRow
                key={index}
                className="odd:bg-white even:bg-slate-50"
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell>{row.productId}</TableCell>

                <TableCell component="th" scope="row">
                  N/A
                </TableCell>
                <TableCell align="right">{row.quantity}</TableCell>
                <TableCell align="right">%18</TableCell>
                <TableCell align="right">{row.total}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <div className="w-full flex justify-end">
        <div className="flex flex-col w-80 space-y-4">
          <div className="flex justify-between">
            <span>Impuesto</span>
            <span>{formatCurrency(invoice.taxAmount)}</span>
          </div>
          <div className="flex justify-between ">
            <span>Descuento</span>
            <span>{formatCurrency(invoice.disccount)}</span>
          </div>
          <div className="flex justify-between ">
            <span>Total</span>
            <span>{formatCurrency(invoice.total)}</span>
          </div>
        </div>
      </div>
    </>
  );
}

function generatePDF(invoice) {
  const hmtl = renderToString(<InvoicePdf invoice={invoice} />);
  var doc = new jsPDF();
  doc.html(hmtl, {
    callback: function (doc) {
      // Save the PDF
      doc.save(`invoice-${new Date()}.pdf`);
    },
    x: 15,
    y: 15,
    width: 180, //target width in the PDF document
    windowWidth: 650, //window width in CSS pixels
  });
}

export { generatePDF, InvoicePdf };
