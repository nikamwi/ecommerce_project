import { createAsyncThunk, createSlice, isRejectedWithValue } from "@reduxjs/toolkit";
import { axiosInstance } from "../../applications";

export const fetchHomePageProducts = createAsyncThunk(
    "product/fetchHomePageProducts",
    async (_, {rejectWithValue}) => {
        try {
            const {data} = await axiosInstance.get("/products");
            return data;
        } catch (error) {
            return rejectWithValue("error during fetching home page products");
        }
    }
);

export const saveProduct = createAsyncThunk(
    "product/saveproduct",
    async ({product, isUpdating, id}, {dispatch ,rejectWithValue}) => {
        try {
            const endpoint = isUpdating ? `/products/${id}` : "/products"
            const method = isUpdating ? "put" : "post"
            const {data} = await axiosInstance[method](endpoint, {product});
            dispatch(fetchHomePageProducts());
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
        homePageProducts: [],
        selectedProduct: null,
    },
    reducers: {
        setSelectedProduct: (state, action) => {
            state.selectedProduct = action.payload;
        },
    },
    extraReducers: (builder) => {
        builder.addCase(fetchHomePageProducts.pending, (state) => {
            state.loading = true;
        });
        builder.addCase(fetchHomePageProducts.fulfilled, (state, action) => {
            state.loading = false;
            state.homePageProducts = action.payload.products;
            state.error = null;
        });
        builder.addCase(fetchHomePageProducts.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload
        });

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

export const {setSelectedProduct} = productSlice.actions;

export const productReducer = productSlice.reducer;