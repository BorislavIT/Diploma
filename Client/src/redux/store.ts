import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import { configureStore } from "@reduxjs/toolkit";
import { investmentsSlice } from "@/components/investments/investmentsSlice";
import { settingsSlice } from "@/components/settings/settingsSlice";

export const store = configureStore({
  reducer: {
    investments: investmentsSlice.reducer,
    settings: settingsSlice.reducer,
  },
});

export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
