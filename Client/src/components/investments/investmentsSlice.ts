import fetchClientAsync, { HTTP_METHOD } from "@/shared/apiUtils";
import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import {
  Investment,
  INVESTMENTS_API_URLS,
  INVESTMENT_STATUS,
} from "./constants";

type DistributedValue = {
  value: number;
  type: string;
};

export type InvestmentsSummary = {
  activeInvestments: number;
  closedInvestments: number;
  total: number;
  distributedValues: DistributedValue[];
};

type InvestmentsState = {
  data: Investment[];
  isLoading: boolean;
  error: string | null;
  summary: InvestmentsSummary;
};

const initialState: InvestmentsState = {
  data: [],
  summary: {
    activeInvestments: 0,
    closedInvestments: 0,
    total: 0,
    distributedValues: [],
  },
  isLoading: false,
  error: null,
};

export const createInvestmentAsync = createAsyncThunk(
  "investments/Create",
  async (investmentData: Investment, { rejectWithValue, dispatch }) => {
    try {
      const response = await fetchClientAsync(
        INVESTMENTS_API_URLS.BASE,
        HTTP_METHOD.POST,
        investmentData
      ).catch((error: any) => rejectWithValue(error));

      dispatch(fetchInvestmentsSummaryAsync());

      return response;
    } catch (error: any) {
      rejectWithValue(error);
    }
  }
);

export const fetchInvestmentsAsync = createAsyncThunk(
  "investments/FetchAll",
  async (_, { rejectWithValue }) =>
    await fetchClientAsync(INVESTMENTS_API_URLS.BASE, HTTP_METHOD.GET).catch(
      (error: any) => rejectWithValue(error.message)
    )
);

export const fetchInvestmentsSummaryAsync = createAsyncThunk(
  "investments/FetchSummary",
  async (_, { rejectWithValue }) =>
    await fetchClientAsync(
      INVESTMENTS_API_URLS.BASE + INVESTMENTS_API_URLS.SUMMARY,
      HTTP_METHOD.GET
    ).catch((error: any) => rejectWithValue(error.message))
);

export const closeInvestmentAsync = createAsyncThunk(
  "investments/Close",
  async (id: string, { rejectWithValue, dispatch }) => {
    try {
      await fetchClientAsync(
        `${INVESTMENTS_API_URLS.BASE}/${id}`,
        HTTP_METHOD.DELETE
      );

      dispatch(fetchInvestmentsSummaryAsync());

      return id;
    } catch (error: any) {
      return rejectWithValue(error.message);
    }
  }
);

export const investmentsSlice = createSlice({
  name: "investments",
  initialState,
  extraReducers: (builder) => {
    builder.addCase(
      createInvestmentAsync.fulfilled,
      (state, action: PayloadAction<Investment>) => {
        state.data.push(action.payload);
      }
    );

    builder.addCase(
      closeInvestmentAsync.fulfilled,
      (state, action: PayloadAction<string>) => {
        const investment = state.data.find((x) => x.id === action.payload);

        if (investment) {
          investment.status = INVESTMENT_STATUS.CLOSED;
        }
      }
    );

    builder.addCase(fetchInvestmentsAsync.fulfilled, (state, action) => {
      state.data = action.payload;
    });

    builder.addCase(fetchInvestmentsSummaryAsync.fulfilled, (state, action) => {
      state.summary = action.payload;
    });

    builder.addMatcher(
      (
        action
      ): action is ReturnType<
        | typeof createInvestmentAsync.fulfilled
        | typeof closeInvestmentAsync.fulfilled
        | typeof fetchInvestmentsAsync.fulfilled
        | typeof fetchInvestmentsSummaryAsync.fulfilled
      > => action.type.endsWith("/fulfilled"),
      (state, _action) => {
        state.isLoading = false;
        state.error = null;
      }
    );

    builder.addMatcher(
      (
        action
      ): action is ReturnType<
        | typeof createInvestmentAsync.pending
        | typeof closeInvestmentAsync.pending
        | typeof fetchInvestmentsAsync.pending
        | typeof fetchInvestmentsSummaryAsync.pending
      > => action.type.endsWith("/pending"),
      (state, _action) => {
        state.isLoading = true;
      }
    );

    builder.addMatcher(
      (
        action
      ): action is ReturnType<
        | typeof createInvestmentAsync.rejected
        | typeof closeInvestmentAsync.rejected
        | typeof fetchInvestmentsAsync.rejected
        | typeof fetchInvestmentsSummaryAsync.rejected
      > => action.type.endsWith("/rejected"),
      (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string | null;
      }
    );
  },
  reducers: {},
});
