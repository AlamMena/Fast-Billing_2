import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  companyId: 1,
  branchId: 1,
  invoiceTypeId: 1,
  beneficiary: { name: "Alex", phone: "590354035", address: "el calenton" },
  recipient: {},
  payment: {
    total: 0,
    type: "",
  },
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
  _id: "62ddfb808476a82f613e4da2",
  __v: 0,
};

const invoiceSlice = createSlice({
  name: "invoice",
  initialState: initialState,
  reducers: {
    updateBeneficiary: (state, { payload }) => {
      state.beneficiary.name = payload.name;
      state.beneficiary.address = payload.address;
      state.beneficiary.phone = payload.phone;
    },
    updateRecipient: (state, { payload }) => {
      state.recipient.name = payload.name;
      state.recipient.address = payload.address;
      state.recipient.phone = payload.phone;
    },
    updateItemPrice: (state, actions) => {
      const itemPrice = state.details.find(
        (item) => item._id === actions.payload._id
      );
      if (actions.payload.value <= 1) {
        itemPrice.price = 1;
      } else {
        itemPrice.price = actions.payload.value;
      }
    },
    updateItemQuantity: (state, actions) => {
      const itemQuantity = state.details.find(
        (item) => item._id === actions.payload._id
      );
      if (actions.payload.quantity <= 1) {
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
      const newDetail = {
        _id: payload._id,
        name: payload.name,
        quantity: 1,
        price: payload.price,
        description: payload.description,
        total: payload.price,
      };
      state.details = [...state.details, newDetail];
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
      let q;
      state.details.forEach((item) => {
        quantity += item.quantity;
        subTotal += item.quantity * item.price;
      });

      state.quantity = quantity;
      state.subTotal = subTotal;
    },
    calculateTotal: (state) => {
      let totaldisc = state.subTotal - state.discountAmount;
      let total = totaldisc + state.taxesAmount;

      state.total = total;
    },
  },
});

export const {
  updateBeneficiary,
  updateRecipient,
  updateItemPrice,
  updateDiscount,
  updateTaxes,
  addItem,
  removeItem,
  calculateTotal,
  calculateSubTotal,
  updateItemQuantity,
} = invoiceSlice.actions;
export default invoiceSlice.reducer;
