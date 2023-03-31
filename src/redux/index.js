import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { userReducer } from "./slices/userSlice";
import storage from "redux-persist/lib/storage"
import { persistReducer, persistStore } from "redux-persist";
import { useSelector } from "react-redux";
import { productReducer } from "./slices/productSlice";
import { cartReducer } from "./slices/cartSlice";

const persistConfig = {
    key: "root",
    storage,
    whitelist: ("user"),
}

const rootReducer = combineReducers({
    user: userReducer,
    product: productReducer,
    cart: cartReducer,
})

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
    reducer: persistedReducer,
});

export const persistor = persistStore(store);

// user slice
export {authenticateUser, logout} from "./slices/userSlice";

// product slice 
export {
    saveProduct, 
    fetchHomePageProducts, 
    setSelectedProduct,
    fetchProductsByCategory,
    fetchSingleProduct,
} from "./slices/productSlice";

//  cart slice
export {
    addToCart, 
    removeFormCart, 
    clearCart,
    // async thunk
    saveCart,
    fetchCart,
} from "./slices/cartSlice";

// hooks

// user
export const useUserInfo = () => useSelector((state) => state.user.userData);
// products
export const useHomPageProducts = () => 
    useSelector((state) => state.product.homePageProducts);
export const useSelectedProduct = () => 
    useSelector((state) => state.product.selectedProduct);
export const useSidebarItems = () => 
    useSelector((state) => state.product.sidebarItems);
export const useCategoryProducts = () => 
    useSelector((state) => state.product.categoryProducts);
export const useSingleProducts = () => 
    useSelector((state) => state.product.singleProduct);

// cart
export const useCartItems = () => useSelector((state) => state.cart.cartItems);