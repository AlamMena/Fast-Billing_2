import { configureStore } from "@reduxjs/toolkit";
import invoiceReducer from "./InvoiceSlice";

export const store = configureStore({
  reducer: { invoice: invoiceReducer },
});
