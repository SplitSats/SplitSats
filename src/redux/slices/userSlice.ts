import { createSlice } from "@reduxjs/toolkit";
import { PayloadAction } from "@reduxjs/toolkit";
import { IProfileContent } from "@src/model/nostr";

const initialState: IProfileContent = {
  about='',
	banner='',
	displayName='',
	display_name='',
	lud06='',
	lud16='',
	nip05='',
	picture='',
	username='',
	website='',

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    // temp reducer
    updateUser: (state, action: PayloadAction<Partial<IProfileContent>>) => {

      return { ...state, ...action.payload };
    },
  },
});

export const { updateUser } = userSlice.actions;
export default userSlice.reducer;
