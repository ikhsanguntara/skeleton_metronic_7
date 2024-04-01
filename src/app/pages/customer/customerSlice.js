import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {
  getAll,
  getId,
  createItem,
  updateItem,
  deleteById,
} from "./customerAPI";

const initialState = {
  data: [],
  dataId: null,
  loading: false,
  error: null,
  pageNo: 1,
  pageSize: 10,
  totalRecord: 0,
  selected: null,
  result: null,
};

export const fetchData = createAsyncThunk(
  "customer/fetchData",
  async (payload) => {
    const response = await getAll(payload);
    return response;
  }
);

export const fetchId = createAsyncThunk("customer/fetchId", async (id) => {
  const response = await getId(id);
  return response;
});

export const addItem = createAsyncThunk("customer/addItem", async (payload) => {
  const response = await createItem(payload);
  return response;
});

export const editItem = createAsyncThunk(
  "customer/editItem",
  async (payload) => {
    const response = await updateItem(payload);
    return response;
  }
);
export const removeById = createAsyncThunk(
  "customer/removeById",
  async (payload) => {
    const response = await deleteById(payload);
    return response;
  }
);

export const customerSlice = createSlice({
  name: "customer",
  initialState,
  reducers: {
    resetData: () => initialState,
    setSelected: (state, action) => {
      state.selected = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchData.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchData.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload.data.data;
        state.pageNo = action.payload.data.pageNo;
        state.pageSize = action.payload.data.pageSize;
        state.totalRecord = action.payload.data.totalRecord;
      })
      .addCase(fetchId.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchId.fulfilled, (state, action) => {
        state.loading = false;
        state.dataId = action.payload.data.data;
      })
      .addCase(addItem.pending, (state) => {
        state.loading = true;
      })
      .addCase(addItem.fulfilled, (state, action) => {
        state.loading = false;
        state.result = action.payload;
      })
      .addCase(editItem.pending, (state) => {
        state.loading = true;
      })
      .addCase(editItem.fulfilled, (state, action) => {
        state.loading = false;
        state.result = action.payload;
      })
      .addCase(removeById.pending, (state) => {
        state.loading = true;
      })
      .addCase(removeById.fulfilled, (state, action) => {
        state.loading = false;
        state.result = action.payload;
      });
  },
});

export const { resetData, setSelected } = customerSlice.actions;

export const selectData = (state) => state.customer.data;
export const selectId = (state) => state.customer.dataId;
export const selectLoading = (state) => state.customer.loading;
export const selectError = (state) => state.customer.error;
export const selectPageNo = (state) => state.customer.pageNo;
export const selectPageSize = (state) => state.customer.pageSize;
export const selectTotalRecord = (state) => state.customer.totalRecord;
export const selectSelected = (state) => state.customer.selected;
export const selectResult = (state) => state.customer.result;

export default customerSlice.reducer;
