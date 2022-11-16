import { configureStore } from "@reduxjs/toolkit"
import { useDispatch, useSelector, TypedUseSelectorHook } from 'react-redux'
import productSilce from "./reducers/productSlice"
import userSilce from "./reducers/userSlice"

// const userInfoFromStorage = localStorage.getItem('userInfo')
//     ? JSON.parse(localStorage?.getItem('userInfo')) : null


const store = configureStore({
    reducer: {
        products: productSilce,
        user: userSilce
    }
})


export default store
export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
