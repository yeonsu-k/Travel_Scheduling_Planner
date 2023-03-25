// core
import { configureStore, combineReducers, getDefaultMiddleware } from "@reduxjs/toolkit";
import authReducer from "slices/authSlice";
import scheduleCreateReducer from "slices/scheduleCreateSlice";
import scheduleEditReducer from "slices/scheduleEditSlice";
import friendReducer from "slices/friendSlice";
import { persistReducer, persistStore } from "redux-persist";
import storage from "redux-persist/lib/storage";

const rootReducer = combineReducers({
  auth: authReducer,
  scheduleCreate: scheduleCreateReducer,
  scheduleEdit: scheduleEditReducer,
  friend: friendReducer,
});

const persistConfig = {
  key: "root",
  storage: storage,
  whitelist: ["auth"],
  timeout: 1,
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export const persistor = persistStore(store);

export type AppDispatch = typeof store.dispatch;
export type rootState = ReturnType<typeof store.getState>;
