import store from "./store";

export { store };
export type { RootState, AppDispatch } from "./store";
export { userReducer, updateUser } from "./slices";
