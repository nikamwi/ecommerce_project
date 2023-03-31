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

export const fetchProductsByCategory = createAsyncThunk(
    "product/fetchProductsByCategory",
    async (url, {rejectWithValue}) => {
        try {
            const {data} = await axiosInstance.get(`/products/categories/${url}`);
            return data;
        } catch (error) {
            return rejectWithValue("couldn't fetch category products");
        }
    }
);

export const rateProduct = createAsyncThunk(
    "product/rateProduct",
    async ({productId, userId, rating, isHome, url}, {rejectWithValue, dispatch}) => {
        try {
            await axiosInstance.post(`/products/${productId}/users/${userId}/rate`, {
                rating,
            });
            if (isHome) {
                dispatch(fetchHomePageProducts());
            } else {
                dispatch(fetchHomePageProducts(url));
            }
        } catch (error) {
            return rejectWithValue("could not rate product");
        }
    }
);

export const fetchSingleProduct = createAsyncThunk(
    "product/fetchSingleProduct",
    async ({id, category}, {rejectWithValue}) => {
        try {
            const {data} = await axiosInstance.get(
                `/products/category/${category}/${id}`
            );
            return data;
        } catch (error) {
            return rejectWithValue("could not fetch single product");
        }
    }
);

export const queryProducts = createAsyncThunk(
    "product/queryProducts",
    async (searchString, {rejectWithValue}) => {
        try {
            const {data} = await axiosInstance.get(
                `/products?name=${searchString}`
            );
            return data;
        } catch (error) {
            rejectWithValue("product not found");
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
        sidebarItems: [],
        categoryProducts: [],
        singleProduct: null,
        searchResults: [],
    },
    reducers: {
        setSelectedProduct: (state, action) => {
            state.selectedProduct = action.payload;
        },
        clearSearchResults: (state) => {
            state.searchResults = [];
        },
    },
    extraReducers: (builder) => {
        builder.addCase(fetchHomePageProducts.pending, (state) => {
            state.loading = true;
        });
        builder.addCase(fetchHomePageProducts.fulfilled, (state, action) => {
            state.loading = false;
            state.homePageProducts = action.payload.products;
            state.sidebarItems = action.payload.categories;
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
        builder.addCase(fetchProductsByCategory.pending, (state) => {
            state.loading = true;
        });
        builder.addCase(fetchProductsByCategory.fulfilled, (state, action) => {
            state.loading = false;
            state.categoryProducts = action.payload;
        });
        builder.addCase(fetchProductsByCategory.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload;
        });
        builder.addCase(rateProduct.rejected, (state,action) => {
            state.error = action.payload;
        });
        builder.addCase(fetchSingleProduct.pending, (state) => {
            state.loading = true;
        });
        builder.addCase(fetchSingleProduct.fulfilled, (state, action) => {
            state.loading = false;
            state.singleProduct = action.payload.product;
        });
        builder.addCase(fetchSingleProduct.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload; 
        });
        builder.addCase(queryProducts.pending, (state) => {
            state.loading = true;
        });
        builder.addCase(queryProducts.fulfilled, (state, action) => {
            state.loading = false;
            state.searchResults = action.payload.products;
        });
        builder.addCase(queryProducts.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload;
        });
    },
});

export const {setSelectedProduct, clearSearchResults} = productSlice.actions;

export const productReducer = productSlice.reducer;