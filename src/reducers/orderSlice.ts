import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit"
import axios from "axios";
import { IOrder, IOrderItems } from "../interfaces/IOrder";



interface ProductState {
    order: IOrder | null;
    orders: IOrder[] | [];
    isLodging: boolean;
    checkout: [] | null
    error: any;
    sellerOrders: IOrderItems[] | [],
    sellerOrder: IOrderItems | null,
    orderData: [],
}

const initialState: ProductState = {
    order: null,
    orders: [],
    sellerOrders: [],
    sellerOrder: null,
    isLodging: false,
    checkout: null,
    error: null,
    orderData: []

}



export const createPaymentSession = createAsyncThunk<IOrder, any>(
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

export const getAllOrders = createAsyncThunk<IOrder[]>(
    "order/getAll",
    async (_, thunkAPI) => {
        try {

            const response = await axios.get("http://localhost:5000/api/order/admin", ({ withCredentials: true }));
            return response.data;
        } catch (error) {
            return thunkAPI.rejectWithValue(error)
        }
    }
)

export const getAllUserOrders = createAsyncThunk<IOrder[]>(
    "order/getAllUser",
    async (_, thunkAPI) => {
        try {

            const response = await axios.get("http://localhost:5000/api/order", ({ withCredentials: true }));
            return response.data;
        } catch (error) {
            return thunkAPI.rejectWithValue(error)
        }
    }
)

export const getAllSellerOrders = createAsyncThunk<IOrderItems[]>(
    "order/getAllSellerOrders",
    async (_, thunkAPI) => {
        try {

            const response = await axios.get("http://localhost:5000/api/order/seller", ({ withCredentials: true }));
            return response.data;
        } catch (error) {
            return thunkAPI.rejectWithValue(error)
        }
    }
)

export const updateSellerOrder = createAsyncThunk<IOrderItems, IOrderItems>(
    "order/updateSellerOrder",
    async (data, thunkAPI) => {
        const { _id } = data
        try {

            const response = await axios.post(`http://localhost:5000/api/order/seller/${_id}`, data, ({ withCredentials: true }));
            thunkAPI.dispatch(getAllSellerOrders())
            return response.data;
        } catch (error) {
            return thunkAPI.rejectWithValue(error)
        }
    }
)

export const getIncomeStatsAdmin = createAsyncThunk<any>(
    "user/getIncomeStatsAdmin",
    async (_, thunkAPI) => {
        try {
            const response = await axios.get("http://localhost:5000/api/order/income", ({ withCredentials: true }));
            return response.data;
        } catch (error) {
            if (error instanceof Error)

                return thunkAPI.rejectWithValue(error.message)
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

        // get all orders for admin
        builder.addCase(getAllOrders.pending, (state) => {
            state.isLodging = true;
        })
        builder.addCase(getAllOrders.fulfilled, (state, action) => {
            state.orders = action.payload;
            state.isLodging = false;
        })
        builder.addCase(getAllOrders.rejected, (state, action) => {
            state.error = action.payload;
            state.isLodging = false;
        })

        // get all orders income for admin
        builder.addCase(getIncomeStatsAdmin.pending, (state) => {
            state.isLodging = true;
        })
        builder.addCase(getIncomeStatsAdmin.fulfilled, (state, action) => {
            state.orderData = action.payload;
            state.isLodging = false;
        })
        builder.addCase(getIncomeStatsAdmin.rejected, (state, action) => {
            state.error = action.payload;
            state.isLodging = false;
        })
        // getAllUserOrders

        builder.addCase(getAllUserOrders.pending, (state) => {
            state.isLodging = true;
        })
        builder.addCase(getAllUserOrders.fulfilled, (state, action) => {
            state.orders = action.payload;
            state.isLodging = false;
        })
        builder.addCase(getAllUserOrders.rejected, (state, action) => {
            state.error = action.payload;
            state.isLodging = false;
        })

        // get all seller orders
        builder.addCase(getAllSellerOrders.pending, (state) => {
            state.isLodging = true;
        })
        builder.addCase(getAllSellerOrders.fulfilled, (state, action) => {
            state.sellerOrders = action.payload;
            state.isLodging = false;
        })
        builder.addCase(getAllSellerOrders.rejected, (state, action) => {
            state.error = action.payload;
            state.isLodging = false;
        })
        // get all seller orders
        builder.addCase(updateSellerOrder.pending, (state) => {
            state.isLodging = true;
        })
        builder.addCase(updateSellerOrder.fulfilled, (state, action) => {
            state.sellerOrder = action.payload;
            state.isLodging = false;
        })
        builder.addCase(updateSellerOrder.rejected, (state, action) => {
            state.error = action.payload;
            state.isLodging = false;
        })

    }

})

export default orderSlice.reducer;
export const { setOrders } = orderSlice.actions;