import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { axiosInstance } from "../../applications";

export const authenticateUser = createAsyncThunk(
    "user/authenticateUser",
    async (values, {rejectWithValue}) => {
        try {
            const route = `/users/${values.isLogin ? "login" : "register"}`;
            const {data} = await axiosInstance.post(route, values.formValues);
            localStorage.setItem("token", data.token);
            localStorage.setItem("refresh_token", data.refreshToken);
            return data;
        } catch (error) {
            return rejectWithValue("something went wrong")
        }
    }
);

const userSlice = createSlice({
    name: "user",
    initialState: {
        userData: null,
        loading: false,
        error: null,
    },

    reducers: {
        logout: (state) => {
            state.userData = null;
            localStorage.removeItem("token");
            localStorage.removeItem("refresh_token");
        },
    },
    extraReducers: (builder) => {
        builder.addCase(authenticateUser.pending, (state) => {
            state.loading = true;
        });
        builder.addCase(authenticateUser.fulfilled, (state, action) => {
            state.loading = false;
            state.userData = action.payload.user;
            state.error = null;
        });
        builder.addCase(authenticateUser.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload;
        });
    },
});

export const {logout} = userSlice.actions;

export const userReducer = userSlice.reducer;