// core
import { configureStore, combineReducers } from "@reduxjs/toolkit";
import storage from "redux-persist/lib/storage";
import { persistReducer, persistStore } from "redux-persist";
import thunk from "redux-thunk";
import authReducer from "slices/authSlice";
import scheduleCreateReducer from "slices/scheduleCreateSlice";
import scheduleEditReducer from "slices/scheduleEditSlice";
import noticeSliceReducer from "slices/noticeSlice";

const persistConfig = {
  key: "root",
  storage,
  whitelist: ["auth"],
};

const rootReducer = combineReducers({
  auth: authReducer,
  scheduleCreate: scheduleCreateReducer,
  scheduleEdit: scheduleEditReducer,
  notice: noticeSliceReducer,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  devTools: process.env.NODE_ENV !== "production",
  middleware: [thunk],
});

export const persistor = persistStore(store);
export type AppDispatch = typeof store.dispatch;
export type rootState = ReturnType<typeof store.getState>;
