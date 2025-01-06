import { configureStore, combineReducers } from "@reduxjs/toolkit";
import authSlice from "./authSlice";
import jobSlice from "./jobSlice";
import companySlice from "./companySlice";
import storage from "redux-persist/lib/storage";
import { persistReducer } from "redux-persist";

// Combine your reducers here
const rootReducer = combineReducers({
  auth: authSlice,
  job: jobSlice,
  company: companySlice,
});

const persistConfig = {
  key: "root", // key to persist the root state
  storage, // storage engine
  version: 1, // version of the persisted state
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

const store = configureStore({
  reducer: persistedReducer, // Use persistedReducer for the root reducer
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export default store;
