import { investmentCardsSlice } from "@/components/Investments/investmentsSlice";
import { configureStore } from "@reduxjs/toolkit";

export const store = configureStore({
  reducer: {
    investmentCards: investmentCardsSlice.reducer,
  },
});

import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";

export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
