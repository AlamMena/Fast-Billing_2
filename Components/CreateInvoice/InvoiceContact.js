import React from "react";

export default function InvoiceContact() {
  return (
    <div className="p-3 flex flex-col space-y-1">
      {/* Name */}
      <span className="font-bold">Jose Alejandro</span>
      {/* Address */}
      <span className="text-sm">
        Direccion: 19034 Verna Unions Apt. 164 - Honolulu, RI / 87535
      </span>
      {/* Phone */}
      <span className="text-sm">Tel: 0981203-090</span>
    </div>
  );
}
