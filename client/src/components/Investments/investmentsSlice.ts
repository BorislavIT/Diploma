import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { INVESTMENT_STATUS, InvestmentCard } from "./constants";

const initialState: InvestmentCard[] = [
  {
    name: "CARD1",
    date: "a",
    status: INVESTMENT_STATUS.ACTIVE,
    type: "gold",
    value: "124",
    id: "a6sd",
  },
  {
    name: "CARD2",
    date: "a",
    status: INVESTMENT_STATUS.ACTIVE,
    type: "gold",
    value: "166",
    id: "5asd",
  },
  {
    name: "CARD3",
    date: "a",
    status: INVESTMENT_STATUS.CLOSED,
    type: "gold",
    value: "178",
    id: "as4d",
  },
  {
    name: "CARD4",
    date: "a",
    status: INVESTMENT_STATUS.ACTIVE,
    type: "gold",
    value: "22",
    id: "asd2",
  },
  {
    name: "CARD5",
    date: "a",
    status: INVESTMENT_STATUS.ACTIVE,
    type: "gold",
    value: "444",
    id: "asd",
  },
  {
    name: "CARD6",
    date: "a",
    status: INVESTMENT_STATUS.ACTIVE,
    type: "gold",
    value: "666",
    id: "asd1",
  },
];

export const investmentCardsSlice = createSlice({
  name: "investmentCards",
  initialState,
  reducers: {
    addInvestment: (state, action: PayloadAction<InvestmentCard>) => {
      state.push(action.payload);
    },
    removeInvestment: (state, action: PayloadAction<string>) => {
      const index = state.findIndex((i) => i.id === action.payload);
      if (index !== -1) state[index].status = INVESTMENT_STATUS.CLOSED;
    },
  },
});

export const { addInvestment, removeInvestment } = investmentCardsSlice.actions;

export default investmentCardsSlice.reducer;
