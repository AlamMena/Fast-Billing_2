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
    <section>
      <div className="max-w-5xl mx-auto  bg-white">
        <article className="overflow-hidden">
          <div className="bg-[white] rounded-b-md">
            <div className="p-2">
              <div className="space-y-6 text-slate-700">
                <img
                  className="object-cover h-12"
                  src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTDERLwwAIqQ01S6ftSksvj0NaXIX7964O3MQ&usqp=CAU"
                />

                <p className="text-xl font-extrabold tracking-tight uppercase font-body">
                  Factura TEST 0001
                </p>
              </div>
            </div>
            <div className="p-2">
              <div className="flex w-full">
                <div className="grid grid-cols-4 gap-12">
                  <div className="text-sm font-light text-slate-500">
                    <p className="text-sm font-normal text-slate-700">
                      Detalles:
                    </p>
                    <p>Fast Billing</p>
                    <p>Fake Street 123</p>
                    <p>San Javier</p>
                    <p>CA 1234</p>
                  </div>
                  {/* <div className="text-sm font-light text-slate-500">
                    <p className="text-sm font-normal text-slate-700">Cliente</p>
                    <p>The Boring Company</p>
                    <p>Tesla Street 007</p>
                    <p>Frisco</p>
                    <p>CA 0000</p>
                  </div> */}
                  <div className="text-sm font-light text-slate-500">
                    <p className="text-sm font-normal text-slate-700">NCF</p>
                    <p>{invoice.ncf}</p>

                    <p classNameName="mt-2 text-sm font-normal text-slate-700">
                      Fecha factura
                    </p>
                    <p>{invoice.date}</p>
                  </div>
                  {/* <div className="text-sm font-light text-slate-500">
                    <p className="text-sm font-normal text-slate-700">Terms</p>
                    <p>0 Days</p>

                    <p className="mt-2 text-sm font-normal text-slate-700">Due</p>
                    <p>00.00.00</p>
                  </div> */}
                </div>
              </div>
            </div>

            <div className="p-2">
              <div className="flex flex-col mx-0 mt-8">
                <table className="min-w-full divide-y divide-slate-500">
                  <thead>
                    <tr>
                      <th
                        scope="col"
                        className="py-3.5 pl-4 pr-3 text-left text-sm font-normal text-slate-700 sm:pl-6 md:pl-0"
                      >
                        Descripcion
                      </th>
                      <th
                        scope="col"
                        className="hidden py-3.5 px-3 text-right text-sm font-normal text-slate-700 sm:table-cell"
                      >
                        Cantidad
                      </th>
                      <th
                        scope="col"
                        className="hidden py-3.5 px-3 text-right text-sm font-normal text-slate-700 sm:table-cell"
                      >
                        Impuesto
                      </th>
                      <th
                        scope="col"
                        className="py-3.5 pl-3 pr-4 text-right text-sm font-normal text-slate-700 sm:pr-6 md:pr-0"
                      >
                        Total
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {invoice.details.map((detail, index) => {
                      return (
                        <tr key={index} className="border-b border-slate-200">
                          <td className="py-4 pl-4 pr-3 text-sm sm:pl-6 md:pl-0">
                            <div className="font-medium text-slate-700">
                              Product name
                            </div>
                          </td>
                          <td className="hidden px-3 py-4 text-sm text-right text-slate-500 sm:table-cell">
                            {detail.quantity}
                          </td>
                          <td className="hidden px-3 py-4 text-sm text-right text-slate-500 sm:table-cell">
                            18%
                          </td>
                          <td className="py-4 pl-3 pr-4 text-sm text-right text-slate-500 sm:pr-6 md:pr-0">
                            {formatCurrency(detail.total)}
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                  <tfoot>
                    <tr>
                      <th
                        scope="row"
                        colSpan="3"
                        className="hidden pt-6 pl-6 pr-3 text-sm font-light text-right text-slate-500 sm:table-cell md:pl-0"
                      >
                        Subtotal
                      </th>
                      <th
                        scope="row"
                        className="pt-6 pl-4 pr-3 text-sm font-light text-left text-slate-500 sm:hidden"
                      >
                        Subtotal
                      </th>
                      <td className="pt-6 pl-3 pr-4 text-sm text-right text-slate-500 sm:pr-6 md:pr-0">
                        $0.00
                      </td>
                    </tr>
                    <tr>
                      <th
                        scope="row"
                        colSpan="3"
                        className="hidden pt-6 pl-6 pr-3 text-sm font-light text-right text-slate-500 sm:table-cell md:pl-0"
                      >
                        Discount
                      </th>
                      <th
                        scope="row"
                        className="pt-6 pl-4 pr-3 text-sm font-light text-left text-slate-500 sm:hidden"
                      >
                        Discount
                      </th>
                      <td className="pt-6 pl-3 pr-4 text-sm text-right text-slate-500 sm:pr-6 md:pr-0">
                        {formatCurrency(invoice.disccount)}
                      </td>
                    </tr>
                    <tr>
                      <th
                        scope="row"
                        colSpan="3"
                        className="hidden pt-4 pl-6 pr-3 text-sm font-light text-right text-slate-500 sm:table-cell md:pl-0"
                      >
                        Tax
                      </th>
                      <th
                        scope="row"
                        className="pt-4 pl-4 pr-3 text-sm font-light text-left text-slate-500 sm:hidden"
                      >
                        Tax
                      </th>
                      <td className="pt-4 pl-3 pr-4 text-sm text-right text-slate-500 sm:pr-6 md:pr-0">
                        {formatCurrency(invoice.taxAmount)}
                      </td>
                    </tr>
                    <tr>
                      <th
                        scope="row"
                        colSpan="3"
                        className="hidden pt-4 pl-6 pr-3 text-sm font-normal text-right text-slate-700 sm:table-cell md:pl-0"
                      >
                        Total
                      </th>
                      <th
                        scope="row"
                        className="pt-4 pl-4 pr-3 text-sm font-normal text-left text-slate-700 sm:hidden"
                      >
                        Total
                      </th>
                      <td className="pt-4 pl-3 pr-4 text-sm font-normal text-right text-slate-700 sm:pr-6 md:pr-0">
                        {formatCurrency(invoice.total)}
                      </td>
                    </tr>
                  </tfoot>
                </table>
              </div>
            </div>
          </div>
        </article>
      </div>
    </section>
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
