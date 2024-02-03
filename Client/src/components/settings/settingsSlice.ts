import fetchClientAsync, { HTTP_METHOD } from "@/shared/apiUtils";
import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Settings, SETTINGS_API_URLS } from "./constants";

type SettingsState = {
  settings: Settings;
  isLoading: boolean;
  error: string | null;
};

const initialState: SettingsState = {
  isLoading: false,
  error: null,
  settings: {} as Settings,
};

export const updateSettingsAsync = createAsyncThunk(
  "settings/Update",
  async (settings: Settings, { rejectWithValue }) => {
    try {
      const response = await fetchClientAsync(
        SETTINGS_API_URLS.BASE,
        HTTP_METHOD.PUT,
        settings
      ).catch((error: any) => rejectWithValue(error));

      return response;
    } catch (error: any) {
      rejectWithValue(error);
    }
  }
);

export const fetchSettingsAsync = createAsyncThunk(
  "settings/Fetch",
  async (_, { rejectWithValue }) =>
    await fetchClientAsync(SETTINGS_API_URLS.BASE, HTTP_METHOD.GET).catch(
      (error: any) => rejectWithValue(error.message)
    )
);

export const settingsSlice = createSlice({
  name: "settings",
  initialState,
  extraReducers: (builder) => {
    builder.addCase(
      updateSettingsAsync.fulfilled,
      (state, action: PayloadAction<Settings>) => {
        state.settings = action.payload;
      }
    );

    builder.addCase(
      fetchSettingsAsync.fulfilled,
      (state, action: PayloadAction<Settings>) => {
        state.settings = action.payload;
      }
    );

    builder.addMatcher(
      (
        action
      ): action is ReturnType<
        | typeof fetchSettingsAsync.fulfilled
        | typeof updateSettingsAsync.fulfilled
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
        typeof fetchSettingsAsync.pending | typeof updateSettingsAsync.pending
      > => action.type.endsWith("/pending"),
      (state, _action) => {
        state.isLoading = true;
      }
    );

    builder.addMatcher(
      (
        action
      ): action is ReturnType<
        typeof fetchSettingsAsync.rejected | typeof updateSettingsAsync.rejected
      > => action.type.endsWith("/rejected"),
      (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string | null;
      }
    );
  },
  reducers: {},
});
