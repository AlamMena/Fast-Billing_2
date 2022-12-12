import { createSlice } from "@reduxjs/toolkit";
import { setDate } from "date-fns";
import { get } from "react-hook-form";

const initialState = {
  companyId: 1,
  branchId: 1,
  invoiceNo: "F00000",
  warehouseId: 0,
  ncfTypeId: 0,
  typeId: 0,
  clientId: 1,
  beneficiary: {
    imageUrl: "https://cdn-icons-png.flaticon.com/128/3321/3321752.png",
    name: "Alex",
    phone: "590354035",
    RNC: "F90809231",
    address: "el calenton",
  },
  recipient: {},
  status: "Pagado",
  payments: [{ amount: 0 }],
  invoiceCreationDate: "",
  invoiceDueDate: "",
  subTotal: 0,
  discountAmount: 0,
  taxesAmount: 0,
  total: 0,
  totalPayed: 0,
  NCF: "000001",
  NCFExpirationDate: "2022-12-01T00:00:00.000Z",
  details: [],
  IsDeleted: true,
  CreatedAt: "1970-01-01T00:00:00.007Z",
  UpdatedAt: "1970-01-01T00:00:00.021Z",
  __v: 0,
};

const invoiceSlice = createSlice({
  name: "invoice",
  initialState: initialState,
  reducers: {
    updateBeneficiary: (state, { payload }) => {
      state.beneficiary.name = payload.name;
      state.beneficiary.address = payload.addresses[0].address1;
      state.beneficiary.phone = payload.contacts[0].number;
    },
    updateStatus: (state, actions) => {
      state.status = actions.payload;
    },
    updateNCFType: (state, actions) => {
      state.ncfTypeId = actions.payload;
    },
    updateWarehouse: (state, actions) => {
      state.warehouseId = actions.payload;
    },
    updateInvoiceType: (state, actions) => {
      state.typeId = actions.payload;
    },
    updateCreationDate: (state, actions) => {
      state.invoiceCreationDate = actions.payload;
    },
    updateDueDate: (state, actions) => {
      state.invoiceDueDate = actions.payload;
    },
    updateRecipient: (state, { payload }) => {
      state.clientId = payload.id;
      // state.typeId = payload.typeId;
      state.recipient.name = payload.name;
      state.recipient.address = payload.addresses[0].address1;
      state.recipient.phone = payload.contacts[0].number;
      state.recipient.imageUrl = payload.imageUrl;
    },
    updateItemPrice: (state, actions) => {
      const itemPrice = state.details.find(
        (item) => item.productId === actions.payload.id
      );
      if (actions.payload.value <= -1 || actions.payload.value === null) {
        itemPrice.price = 1;
      } else {
        itemPrice.price = actions.payload.value;
      }
    },
    updateItemQuantity: (state, actions) => {
      const itemQuantity = state.details.find(
        (item) => item.productId === actions.payload.id
      );
      if (actions.payload.quantity <= -1) {
        itemQuantity.quantity = 1;
      } else {
        itemQuantity.quantity = actions.payload.quantity;
      }
    },
    updateDiscount: (state, actions) => {
      let num = Math.abs(actions.payload);
      state.discountAmount = num;
    },
    updateTaxes: (state, actions) => {
      let num = Math.abs(actions.payload);
      state.taxesAmount = num;
    },
    updatePayment: (state, { payload }) => {
      state.payments[0].amount = payload.pquantity;
      state.payments[0].typeId = payload.method;
    },
    // updatePaymentType: (state, actions) => {
    //   state.payments.typeId = actions.payload;
    // },
    addItem: (state, { payload }) => {
      let newProduct = state.details.find(
        (item) => item.productId === payload.id
      );

      if (newProduct) {
        newProduct.quantity++;
      } else {
        const newDetail = {
          productId: payload.id,
          name: payload.name,
          quantity: 1,
          price: payload.price,
          description: payload.description,
          total: payload.price,
        };
        state.details = [...state.details, newDetail];
      }
    },
    removeItem: (state, actions) => {
      state.details = state.details.filter(
        (item, i) => item.productId !== actions.payload
      );
      // alert(JSON.stringify(actions.payload));
    },
    calculateSubTotal: (state) => {
      let quantity = 0;
      let subTotal = 0;
      let q;
      state.details.forEach((item) => {
        quantity += item.quantity;
        subTotal += item.quantity * item.price;
        item.total = item.quantity * item.price;
      });

      state.quantity = quantity;
      state.subTotal = subTotal;
    },
    calculateTotal: (state) => {
      let totaldisc = state.subTotal - state.discountAmount;
      let total = totaldisc + state.taxesAmount;

      state.total = total;
    },
    resetState: (state) => {
      return initialState;
    },
  },
});

export const {
  updateBeneficiary,
  updateRecipient,
  updateItemPrice,
  updateCreationDate,
  updateInvoiceType,
  updateNCFType,
  updateWarehouse,
  updateDiscount,
  updateDueDate,
  updateTaxes,
  updateStatus,
  updatePayment,
  addItem,
  removeItem,
  calculateTotal,
  calculateSubTotal,
  resetState,
  updateItemQuantity,
} = invoiceSlice.actions;
export default invoiceSlice.reducer;
