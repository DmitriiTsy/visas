import { configureStore } from "@reduxjs/toolkit";
import leadReducer from "./leadSlice";
import leadsReducer from "./leadsSlice";

export const store = configureStore({
  reducer: {
    lead: leadReducer,
    leads: leadsReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
