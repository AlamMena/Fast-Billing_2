import { createSlice } from "@reduxjs/toolkit";
const userSlice = createSlice({
  name: "user",
  initialState: { data: null, isLoading: true },

  reducers: {
    setUser: async (state, { payload }) => {
      state = { data: payload, isLoading: false };

      //   const { email, password } = payload;
      //   const response = await signInWithEmailAndPassword(auth, email, password);

      //   console.log("ok");
      //   state = { data: response, isLoading: false };
      //   alert(JSON.stringify({ state, yo: "STATE SLICE" }));

      //   auth.onAuthStateChanged(function (response) {
      //     if (response) {
      //       user = response;
      //     }
      //     alert(JSON.stringify({ response, yo: "AUTH" }));
      //   });
    },
  },
});

export const { setUser } = userSlice.actions;

export default userSlice.reducer;
