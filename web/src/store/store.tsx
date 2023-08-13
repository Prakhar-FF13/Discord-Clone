import { combineReducers, configureStore } from "@reduxjs/toolkit";

import authReducer from "./reducers/authReducer";
import toastReducer from "./reducers/toastReducer";
import friendReducer from "./reducers/friendsReducer";
import chatReducer from "./reducers/chatReducer";
import videoReducer from "./reducers/videoReducer";

const rootReducer = combineReducers({
  auth: authReducer,
  toast: toastReducer,
  friends: friendReducer,
  chat: chatReducer,
  video: videoReducer,
});

const store = configureStore({
  reducer: rootReducer,
  devTools: true,
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
