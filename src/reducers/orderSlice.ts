import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit"
import axios from "axios";
import { IOrder } from "../interfaces/IOrder";



interface ProductState {
    order: IOrder | null;
    isLodging: boolean;
    checkout: [] | null
    error: any;
}

const initialState: ProductState = {
    order: null,
    isLodging: false,
    checkout: null,
    error: null,

}



export const createPaymentSession = createAsyncThunk<any, any>(
    "payment/create",
    async (data, thunkAPI) => {
        const { email } = data
        try {
            const response = await axios.post("http://localhost:5000/api/order/create-checkout-session", { data, email }, ({ withCredentials: true }));

            if (response.data.url) {
                window.location.href = response.data.url
            }
            return response.data;
        } catch (error) {
            return thunkAPI.rejectWithValue(error)
        }
    }
)

export const createOrder = createAsyncThunk<IOrder, IOrder>(
    "order/create",
    async (data, thunkAPI) => {
        try {

            const response = await axios.post("http://localhost:5000/api/order", data, ({ withCredentials: true }));
            return response.data;


        } catch (error) {
            return thunkAPI.rejectWithValue(error)
        }
    }
)

//reducers

export const orderSlice = createSlice({
    name: "orders",
    initialState,
    reducers: {
        setOrders: (state, action: PayloadAction<IOrder>) => {
            state.order = action.payload
        }
    },
    extraReducers: (builder) => {

        builder.addCase(createPaymentSession.pending, (state) => {
            state.isLodging = true;
        })
        builder.addCase(createPaymentSession.fulfilled, (state, action) => {
            state.order = action.payload;
            state.isLodging = false;
        })
        builder.addCase(createPaymentSession.rejected, (state, action) => {
            state.error = action.payload;
            state.isLodging = false;
        })

        builder.addCase(createOrder.pending, (state) => {
            state.isLodging = true;
        })
        builder.addCase(createOrder.fulfilled, (state, action) => {
            state.order = action.payload;
            state.isLodging = false;
        })
        builder.addCase(createOrder.rejected, (state, action) => {
            state.error = action.payload;
            state.isLodging = false;
        })
    }

})

export default orderSlice.reducer;
export const { setOrders } = orderSlice.actions;