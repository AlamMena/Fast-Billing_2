import { configureStore } from "@reduxjs/toolkit";
import invoiceReducer from "./InvoiceSlice";
import goodInvoiceReducer from "./GoodInvoice";
import userReducer from "./UserSlice";

export const store = configureStore({
  reducer: {
    invoice: invoiceReducer,
    user: userReducer,
    // goodinvoice: goodInvoiceReducer,
  },
});
