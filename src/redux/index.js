import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { userReducer } from "./slices/userSlice";
import storage from "redux-persist/lib/storage"
import { persistReducer, persistStore } from "redux-persist";
import { useSelector } from "react-redux";
import { productReducer } from "./slices/productSlice";

const persistConfig = {
    key: "root",
    storage,
    whitelist: ("user"),
}

const rootReducer = combineReducers({
    user: userReducer,
    product: productReducer,
})

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
    reducer: persistedReducer,
});

export const persistor = persistStore(store);

// user slice
export {authenticateUser} from "./slices/userSlice";

// product slice 
export {saveProduct, fetchHomePageProducts, setSelectedProduct} from "./slices/productSlice";

// hooks
export const useUserInfo = () => useSelector((state) => state.user.userData);
export const useHomPageProducts = () => useSelector((state) => state.product.homePageProducts);
export const useSelectedProduct = () => useSelector((state) => state.product.selectedProduct);