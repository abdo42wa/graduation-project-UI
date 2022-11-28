import { configureStore } from "@reduxjs/toolkit"
import { useDispatch, useSelector, TypedUseSelectorHook } from 'react-redux'
import productSlice from "./reducers/productSlice"
import userSlice from "./reducers/userSlice"
import reviewsSlice from "./reducers/reviewSlice"
import categorySlice from "./reducers/categorySlice"
import cartSlice from "./reducers/cartSlice"
import shippingAddressSlice from "./reducers/shippingAddressSlice"
import orderSlice from "./reducers/orderSlice"

const store = configureStore({
    reducer: {
        products: productSlice,
        user: userSlice,
        reviews: reviewsSlice,
        category: categorySlice,
        cart: cartSlice,
        shipping: shippingAddressSlice,
        order: orderSlice
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: false,
        }),
})


export default store
export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
