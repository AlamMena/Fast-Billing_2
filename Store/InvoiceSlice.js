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
    updateDiscount: (state, actions) => {
      state.discountAmount = Math.abs(actions.payload);
    },
  },
});
export const { updateBeneficiary, updateRecipient, updateDiscount } =
  invoiceSlice.actions;
export default invoiceSlice.reducer;
