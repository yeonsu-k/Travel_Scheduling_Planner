// core
import { configureStore, combineReducers } from "@reduxjs/toolkit";
import authReducer from "slices/authSlice";
import scheduleCreateReducer from "slices/scheduleCreateSlice";
import scheduleEditReducer from "slices/scheduleEditSlice";
import noticeSliceReducer from "slices/noticeSlice";

const rootReducer = combineReducers({
  auth: authReducer,
  scheduleCreate: scheduleCreateReducer,
  scheduleEdit: scheduleEditReducer,
  notice: noticeSliceReducer,
});

export const store = configureStore({
  reducer: rootReducer,
});

export type AppDispatch = typeof store.dispatch;
export type rootState = ReturnType<typeof store.getState>;
