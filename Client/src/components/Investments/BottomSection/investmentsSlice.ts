import fetchClientAsync, { HTTP_METHOD } from "@/shared/apiUtils";
import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Investment, INVESTMENTS_API_URLS } from "../constants";

type investmentsState = {
  data: Investment[];
  isLoading: boolean;
  error: string | null;
};

const initialState: investmentsState = {
  data: [],
  isLoading: false,
  error: null,
};

export const createInvestmentAsync = createAsyncThunk(
  "investments/Create",
  async (investmentData: Investment, { rejectWithValue }) => {
    return fetchClientAsync(
      INVESTMENTS_API_URLS.BASE,
      HTTP_METHOD.POST,
      investmentData
    ).catch((error: any) => rejectWithValue(error));
  }
);

export const fetchAllInvestmentsAsync = createAsyncThunk(
  "investments/FetchAll",
  (_, { rejectWithValue }) =>
    fetchClientAsync(INVESTMENTS_API_URLS.BASE, HTTP_METHOD.GET).catch(
      (error: any) => rejectWithValue(error.message)
    )
);

export const deleteInvestmentAsync = createAsyncThunk(
  "investments/Delete",
  (id: string, { rejectWithValue }) =>
    fetchClientAsync(
      `${INVESTMENTS_API_URLS.BASE}/${id}`,
      HTTP_METHOD.DELETE
    ).catch((error: any) => rejectWithValue(error.message))
);

export const investmentsSlice = createSlice({
  name: "investments",
  initialState,
  extraReducers: (builder) => {
    builder.addCase(
      createInvestmentAsync.fulfilled,
      (state, action: PayloadAction<Investment>) => {
        state.isLoading = false;
        state.error = null;
        state.data.push(action.payload);
      }
    );

    builder.addCase(
      deleteInvestmentAsync.fulfilled,
      (state, action: PayloadAction<string>) => {
        state.data = state.data.filter((i) => i.id !== action.payload);
        state.isLoading = false;
        state.error = null;
      }
    );

    builder.addCase(fetchAllInvestmentsAsync.fulfilled, (state, action) => {
      state.isLoading = false;
      state.data = action.payload;
      state.error = null;
    });

    builder.addMatcher(
      (
        action
      ): action is ReturnType<
        | typeof createInvestmentAsync.pending
        | typeof deleteInvestmentAsync.pending
        | typeof fetchAllInvestmentsAsync.pending
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
        | typeof deleteInvestmentAsync.rejected
        | typeof fetchAllInvestmentsAsync.rejected
      > => action.type.endsWith("/rejected"),
      (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string | null;
      }
    );
  },
  reducers: {},
});
