import { createSlice } from "@reduxjs/toolkit";
import { PayloadAction } from "@reduxjs/toolkit";

interface UserState {
  displayName: string;
  userName: string;
  profileImg: string;
  description: string;
  nostrAddress: string;
  lnAddress: string;
}

const initialState: UserState = {
  displayName: "",
  userName: "",
  profileImg: "",
  description: "",
  nostrAddress: "",
  lnAddress: "",
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    // temp reducer
    updateUser: (state, action: PayloadAction<Partial<UserState>>) => {
      return { ...state, ...action.payload };
    },
  },
});

export const { updateUser } = userSlice.actions;
export default userSlice.reducer;
