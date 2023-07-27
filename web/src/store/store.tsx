import { combineReducers, configureStore } from "@reduxjs/toolkit";
// import thunk from "redux-thunk";

import authReducer from "./reducers/authReducer";
import toastReducer from "./reducers/toastReducer";

const rootReducer = combineReducers({ auth: authReducer, toast: toastReducer });

const store = configureStore({
  reducer: rootReducer,
  devTools: true,
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
