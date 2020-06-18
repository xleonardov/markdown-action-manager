import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { domdReduxKey, reducer as domdReducer } from "do.md";
import notifications from "./services/notifications/notifications.state";

const reducer = combineReducers({
  [domdReduxKey]: domdReducer,
  notifications,
});

export type AppState = ReturnType<typeof reducer>;

const store = configureStore({
  reducer,
  devTools: true,
});

export default store;

export type AppDispatch = typeof store.dispatch;
