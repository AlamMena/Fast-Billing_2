import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  id: 0,
  typeId: 0,
  wareHouseId: 0,
  ncfTypeId: 0,
  creditDates: 0,
  clientId: 0,
  withTax: true,
  totalGrab: 0,
  total: 0,
  disccount: 0,
  totalPayed: 0,
  note: "string",
  updated: true,
  details: [
    // {
    //   productId: 0,
    //   quantity: 0,
    //   cost: 0,
    //   price: 0,
    //   disccount: 0,
    //   total: 0,
    // },
  ],
  payments: [
    // {
    //   id: 0,
    //   date: "2022-10-25T22:11:18.267Z",
    //   cardNumber: 0,
    //   bankId: 0,
    //   paymentTypeId: 0,
    //   amount: 0,
    // },
  ],
};

const goodInvoiceSlice = createSlice({
  name: "invoice",
  initialState: initialState,
  reducers: {
    updateBeneficiary: (state, { payload }) => {
      state.beneficiary.name = payload.name;
      state.beneficiary.address = payload.address;
      state.beneficiary.phone = payload.phone;
    },
    updateStatus: (state, actions) => {
      state.status = actions.payload;
    },
    updateCreationDate: (state, actions) => {
      state.invoiceCreationDate = actions.payload;
    },
    updateDueDate: (state, actions) => {
      state.invoiceDueDate = actions.payload;
    },
    updateRecipient: (state, { payload }) => {
      state.recipient.name = payload.name;
      state.recipient.address = payload.address;
      state.recipient.phone = payload.phone;
      state.recipient.imageUrl = payload.imageUrl;
    },
    updateItemPrice: (state, actions) => {
      const itemPrice = state.details.find(
        (item) => item._id === actions.payload._id
      );
      if (actions.payload.value <= -1) {
        itemPrice.price = 1;
      } else {
        itemPrice.price = actions.payload.value;
      }
    },
    updateItemQuantity: (state, actions) => {
      const itemQuantity = state.details.find(
        (item) => item._id === actions.payload._id
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
    addItem: (state, { payload }) => {
      let newProduct = state.details.find((item) => item._id === payload._id);

      if (newProduct) {
        newProduct.quantity++;
      } else {
        const newDetail = {
          _id: payload._id,
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
        (item, i) => item._id !== actions.payload
      );
      // alert(JSON.stringify(state.details));
    },
    calculateSubTotal: (state) => {
      let quantity = 0;
      let subTotal = 0;

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

export default goodInvoiceSlice.reducer;
