import fetchClientAsync, { HTTP_METHOD } from "@/shared/apiUtils";
import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import {
  Investment,
  INVESTMENT_STATUS,
  INVESTMENTS_API_URLS,
} from "../constants";

type distributedValue = {
  value: number;
  type: string;
};

export type investmentSummary = {
  activeInvestments: number;
  closedInvestments: number;
  total: number;
  distributedValues: distributedValue[];
};

type investmentsState = {
  data: Investment[];
  isLoading: boolean;
  error: string | null;
  summary: investmentSummary;
};

const initialState: investmentsState = {
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

      dispatch(fetchInvestmentsSummary());

      return response;
    } catch (error: any) {
      rejectWithValue(error);
    }
  }
);

export const fetchAllInvestmentsAsync = createAsyncThunk(
  "investments/FetchAll",
  async (_, { rejectWithValue }) =>
    await fetchClientAsync(INVESTMENTS_API_URLS.BASE, HTTP_METHOD.GET).catch(
      (error: any) => rejectWithValue(error.message)
    )
);

export const fetchInvestmentsSummary = createAsyncThunk(
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

      dispatch(fetchInvestmentsSummary());

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

    builder.addCase(fetchAllInvestmentsAsync.fulfilled, (state, action) => {
      state.data = action.payload;
    });

    builder.addCase(fetchInvestmentsSummary.fulfilled, (state, action) => {
      state.summary = action.payload;
    });

    builder.addMatcher(
      (
        action
      ): action is ReturnType<
        | typeof createInvestmentAsync.fulfilled
        | typeof closeInvestmentAsync.fulfilled
        | typeof fetchAllInvestmentsAsync.fulfilled
        | typeof fetchInvestmentsSummary.fulfilled
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
        | typeof fetchAllInvestmentsAsync.pending
        | typeof fetchInvestmentsSummary.pending
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
        | typeof fetchAllInvestmentsAsync.rejected
        | typeof fetchInvestmentsSummary.rejected
      > => action.type.endsWith("/rejected"),
      (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string | null;
      }
    );
  },
  reducers: {},
});
