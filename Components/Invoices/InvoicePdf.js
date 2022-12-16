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
      <div className="max-w-4xl    bg-white">
        <article className="overflow-hidden">
          <div className="bg-[white] rounded-b-md">
            <div className=" pb-4 flex justify-between">
              <div className=" text-slate-700">
                <img
                  className="object-cover h-12"
                  src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTDERLwwAIqQ01S6ftSksvj0NaXIX7964O3MQ&usqp=CAU"
                />
              </div>
              <div className="flex flex-col">
                <span className="font-bold">Pagado</span>
                <span className="text-xs">Factura #{invoice.id}</span>
              </div>
            </div>
            <div className="flex justify-start text-xs font-normal pt-7 pb-4">
              <div className="flex flex-col mr-48">
                <span className="pb-2  font-bold ">Factura de:</span>
                <span>Fast Billing 2</span>
                <span>4642 Demetris Lane Suite</span>
                <span>408-439-8033</span>
              </div>

              <div className="flex flex-col text-xs ">
                <span className="pb-2  font-bold">Factura Para:</span>
                <span>Alejandro Villa</span>
                <span>Republica Dominicana</span>
                <span>10001</span>
                <span>27 de Febrero #31, Nueva Zelanda</span>
              </div>
            </div>
            <div className="flex justify-start text-xs font-normal  pt-7 pb-7">
              <div className="flex flex-col mr-52">
                <span className="pb-2  font-bold">Fecha de Creacion</span>
                <span>{invoice.date}</span>
              </div>
              <div className="flex flex-col   ">
                <span className="pb-2 font-bold">Fecha de Venciemiento</span>
                <span>Diciembre 19, 2022</span>
              </div>
            </div>
            <div className="p-2">
              <div className="flex flex-col mx-0 mt-8">
                <table className="min-w-full divide-y divide-slate-500">
                  <thead>
                    <tr>
                      <th
                        scope="col"
                        className="py-3.5 pl-4 pr-3 text-left text-xs font-bold sm:pl-6 md:pl-0"
                      >
                        Descripcion
                      </th>
                      <th
                        scope="col"
                        className="hidden py-3.5 px-3 text-right text-xs font-bold sm:table-cell"
                      >
                        Cantidad
                      </th>
                      <th
                        scope="col"
                        className="hidden py-3.5 px-3 text-right text-xs font-bold sm:table-cell"
                      >
                        Impuesto
                      </th>
                      <th
                        scope="col"
                        className="py-3.5 pl-3 pr-4 text-right text-xs font-bold sm:pr-6 md:pr-0"
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
                          <td className="hidden px-3 py-4 text-xs text-right font-bold sm:table-cell">
                            {detail.quantity}
                          </td>
                          <td className="hidden px-3 py-4 text-xs text-right  sm:table-cell">
                            18%
                          </td>
                          <td className="py-4 pl-3 pr-4 text-xs text-right  sm:pr-6 md:pr-0">
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
                        className="hidden pt-6 pl-6 pr-3 text-xs font-light text-right  sm:table-cell md:pl-0"
                      >
                        Subtotal
                      </th>
                      <th
                        scope="row"
                        className="pt-6 pl-4 pr-3 text-xs font-light text-left  sm:hidden"
                      >
                        Subtotal
                      </th>
                      <td className="pt-6 pl-3 pr-4 text-xs text-right sm:pr-6 md:pr-0">
                        $0.00
                      </td>
                    </tr>
                    <tr>
                      <th
                        scope="row"
                        colSpan="3"
                        className="hidden pt-6 pl-6 pr-3 text-xs font-light text-right  sm:table-cell md:pl-0"
                      >
                        Discount
                      </th>
                      <th
                        scope="row"
                        className="pt-6 pl-4 pr-3 text-xs font-light text-left  sm:hidden"
                      >
                        Discount
                      </th>
                      <td className="pt-6 pl-3 pr-4 text-xs text-right  sm:pr-6 md:pr-0">
                        {formatCurrency(invoice.disccount)}
                      </td>
                    </tr>
                    <tr>
                      <th
                        scope="row"
                        colSpan="3"
                        className="hidden pt-4 pl-6 pr-3 text-xs font-light text-right  sm:table-cell md:pl-0"
                      >
                        Tax
                      </th>
                      <th
                        scope="row"
                        className="pt-4 pl-4 pr-3 text-xs font-light text-left sm:hidden"
                      >
                        Tax
                      </th>
                      <td className="pt-4 pl-3 pr-4 text-xs text-right  sm:pr-6 md:pr-0">
                        {formatCurrency(invoice.taxAmount)}
                      </td>
                    </tr>
                    <tr>
                      <th
                        scope="row"
                        colSpan="3"
                        className="hidden pt-4 pl-6 pr-3 text-md font-bold text-right  sm:table-cell md:pl-0"
                      >
                        Total
                      </th>
                      <th
                        scope="row"
                        className="pt-4 pl-4 pr-3 text-md font-bold text-left sm:hidden"
                      >
                        Total
                      </th>
                      <td className="pt-4 pl-3 pr-4 text-md font-bold text-right sm:pr-6 md:pr-0">
                        {formatCurrency(invoice.total)}
                      </td>
                    </tr>
                  </tfoot>
                </table>
              </div>
            </div>
            <div className="p-2 text-xs font-normal text-slate-700 ">
              <h4 className="text-lg">Notas:</h4>
              <span>
                Asegúrese de tener el número de registro bancario correcto y
                asegúrese de que cubran la transferencia gastos.
              </span>
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
