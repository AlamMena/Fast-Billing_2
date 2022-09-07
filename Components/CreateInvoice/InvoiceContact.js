import { defaultConfig } from "next/dist/server/config-shared";
import React from "react";
import { useSelector } from "react-redux";

export function InvoiceBeneficiary() {
  const { beneficiary } = useSelector((state) => state.invoice);

  return (
    <div className="p-3 flex flex-col space-y-1">
      {/* Name */}
      <span className="font-bold">{beneficiary.name}</span>
      {/* Address */}
      <span className="text-sm">Direccion: {beneficiary.address}</span>
      {/* Phone */}
      <span className="text-sm">Tel: {beneficiary.phone}</span>
    </div>
  );
}

export function InvoiceRecipient() {
  const { recipient } = useSelector((state) => state.invoice);

  return (
    <div className="p-3 flex flex-col space-y-1">
      {/* Name */}
      <span className="font-bold">{recipient.name}</span>
      {/* Address */}
      <span className="text-sm">Direccion: {recipient.address}</span>
      {/* Phone */}
      <span className="text-sm">Tel: {recipient.phone}</span>
    </div>
  );
}
