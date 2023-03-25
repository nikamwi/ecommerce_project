import { createAsyncThunk, createSlice, isRejectedWithValue } from "@reduxjs/toolkit";
import { axiosInstance } from "../../applications";

export const saveProduct = createAsyncThunk(
    "product/saveproduct",
    async ({product}, {rejectWithValue}) => {
        try {
            const {data} = await axiosInstance.post("/products", {product});
            return data;
        } catch (error) {
            return rejectWithValue("error during saving product");    
        }
    }
);

const productSlice = createSlice({
    name: "product",
    initialState: {
        loading: false,
        error: null,
    },
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(saveProduct.pending, (state) => {
            state.loading = true;
        });
        builder.addCase(saveProduct.fulfilled, (state, action) => {
            state.loading = false;
            state.error = null;
        });
        builder.addCase(saveProduct.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload;
        });
    },
});

export const productReducer = productSlice.reducer;