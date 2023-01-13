import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit"
import axios from "axios";
import { toast } from "react-toastify";
import { IShippingAddress } from "../interfaces/IShippingAddress";

interface ProductState {
    shippingAddress: IShippingAddress | null;
    isLodging: boolean;
    error: any;
}

const initialState: ProductState = {
    shippingAddress: null,
    isLodging: false,
    error: null,

}


export const getUserAddress = createAsyncThunk<IShippingAddress>(
    "shippingAddress/get",
    async (_, thunkAPI) => {
        try {
            const response = await axios.get('http://localhost:5000/api/address', ({ withCredentials: true }));
            return response.data;
        } catch (error) {
            return thunkAPI.rejectWithValue(error)
        }
    }
)

export const getUserAddressById = createAsyncThunk<IShippingAddress, string>(
    "shippingAddress/getUserAddressById",
    async (_id, thunkAPI) => {
        try {
            const response = await axios.get(`http://localhost:5000/api/address/${_id}`, ({ withCredentials: true }));
            return response.data;
        } catch (error) {
            return thunkAPI.rejectWithValue(error)
        }
    }
)


export const addUserAddress = createAsyncThunk<IShippingAddress, IShippingAddress>(
    "shippingAddress/create",
    async (data, thunkAPI) => {
        try {
            const response = await axios.post('http://localhost:5000/api/address', data, ({ withCredentials: true }));
            thunkAPI.dispatch(getUserAddress())
            console.log({ res: response.data })
            return response.data;
        } catch (error) {
            return thunkAPI.rejectWithValue(error)
        }
    }
)

//reducers

export const shippingAddressSlice = createSlice({
    name: "shipping",
    initialState,
    reducers: {
        setAddress: (state, action: PayloadAction<IShippingAddress>) => {
            state.shippingAddress = action.payload
        }
    },
    extraReducers: (builder) => {
        builder.addCase(getUserAddress.pending, (state) => {
            state.isLodging = true;
        })
        builder.addCase(getUserAddress.fulfilled, (state, action) => {
            state.shippingAddress = action.payload;
            state.isLodging = false;
        })
        builder.addCase(getUserAddress.rejected, (state, action) => {
            state.error = action.payload;
            state.isLodging = false;
        })
        builder.addCase(getUserAddressById.pending, (state) => {
            state.isLodging = true;
        })
        builder.addCase(getUserAddressById.fulfilled, (state, action) => {
            state.shippingAddress = action.payload;
            state.isLodging = false;
        })
        builder.addCase(getUserAddressById.rejected, (state, action) => {
            state.error = action.payload;
            state.isLodging = false;
        })

        // add address

        builder.addCase(addUserAddress.pending, (state) => {
            state.isLodging = true;
        })
        builder.addCase(addUserAddress.fulfilled, (state, action) => {
            state.shippingAddress = action.payload;
            toast("The address have been added successfully")
            state.isLodging = false;
        })
        builder.addCase(addUserAddress.rejected, (state, action) => {
            state.error = action.payload;
            state.isLodging = false;
        })
    }

})

export default shippingAddressSlice.reducer;
export const { setAddress } = shippingAddressSlice.actions;