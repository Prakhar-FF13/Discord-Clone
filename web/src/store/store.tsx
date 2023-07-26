import { combineReducers, configureStore } from "@reduxjs/toolkit";
// import thunk from "redux-thunk";

import authReducer from "./reducers/authReducer";

const rootReducer = combineReducers({ auth: authReducer });

const store = configureStore({
  reducer: rootReducer,
  devTools: true,
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
