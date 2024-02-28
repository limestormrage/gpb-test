import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export const getServices = createAsyncThunk(
  "services/getServices",
  async (_, { extra: api }) => {
    try {
      const { data } = await api.get("/api/services");

      return data;
    } catch (e) {
      console.log(e);
      throw e;
    }
  }
);

export const getService = createAsyncThunk(
  "services/getService",
  async (id, { extra: api }) => {
    try {
      const { data } = await api.get(`/api/services/${id}`);

      return data;
    } catch (e) {
      console.log(e);
      throw e;
    }
  }
);

const initialState = {
  services: [],
  servicesLoading: false,
  servicesError: false,
  service: null,
  serviceLoading: false,
  serviceError: false,
};

export const servicesSlice = createSlice({
  name: "Services",
  initialState,
  reducers: {
    resetService: (state) => {
      state.service = null;
      state.serviceError = false;
      state.serviceLoading = false;
    },
    resetServices: (state) => {
      state.services = [];
      state.servicesError = false;
      state.servicesLoading = false;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getServices.pending, (state) => {
        state.servicesError = false;
        state.servicesLoading = true;
      })
      .addCase(getServices.fulfilled, (state, action) => {
        state.services = action.payload;
        state.servicesLoading = false;
      })
      .addCase(getServices.rejected, (state) => {
        state.servicesLoading = false;
        state.servicesError = true;
      })
      .addCase(getService.pending, (state) => {
        state.serviceError = false;
        state.serviceLoading = true;
      })
      .addCase(getService.fulfilled, (state, action) => {
        state.service = action.payload;
        state.serviceLoading = false;
      })
      .addCase(getService.rejected, (state) => {
        state.serviceLoading = false;
        state.serviceError = true;
      });
  },
});

const servicesReducer = servicesSlice.reducer;

export default servicesReducer;
