import { configureStore } from "@reduxjs/toolkit"
import { useDispatch, useSelector, TypedUseSelectorHook } from 'react-redux'
import productSilce from "./reducers/productSlice"
import userSilce from "./reducers/userSlice"
import reviewsrSilce from "./reducers/reviewSlice"
import categorySilce from "./reducers/categorySlice"

const store = configureStore({
    reducer: {
        products: productSilce,
        user: userSilce,
        reviews: reviewsrSilce,
        category: categorySilce
    }
})


export default store
export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
