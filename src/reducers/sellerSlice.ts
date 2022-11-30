import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit"
import axios from "axios";
import { toast } from "react-toastify";
import { ISeller } from "../interfaces/ISeller";

interface SellerState {
    seller: ISeller | null;
    isLodging: boolean;
    error: any;
}

const initialState: SellerState = {
    seller: null,
    isLodging: false,
    error: null,

}


export const getSeller = createAsyncThunk<ISeller>(
    "seller/get",
    async (_, thunkAPI) => {
        try {
            const response = await axios.get('http://localhost:5000/api/seller', ({ withCredentials: true }));
            return response.data;
        } catch (error) {
            return thunkAPI.rejectWithValue(error)
        }
    }
)


export const addSeller = createAsyncThunk<ISeller, ISeller>(
    "seller/create",
    async (data, thunkAPI) => {
        try {
            const response = await axios.post('http://localhost:5000/api/seller', data, ({ withCredentials: true }));
            thunkAPI.dispatch(getSeller())
            console.log({ res: response.data })
            return response.data;
        } catch (error) {
            return thunkAPI.rejectWithValue(error)
        }
    }
)

//reducers

export const sellerSlice = createSlice({
    name: "seller",
    initialState,
    reducers: {
        setSeller: (state, action: PayloadAction<ISeller>) => {
            state.seller = action.payload
        }
    },
    extraReducers: (builder) => {
        builder.addCase(getSeller.pending, (state) => {
            state.isLodging = true;
        })
        builder.addCase(getSeller.fulfilled, (state, action) => {
            state.seller = action.payload;
            state.isLodging = false;
        })
        builder.addCase(getSeller.rejected, (state, action) => {
            state.error = action.payload;
            state.isLodging = false;
        })

        // add address

        builder.addCase(addSeller.pending, (state) => {
            state.isLodging = true;
        })
        builder.addCase(addSeller.fulfilled, (state, action) => {
            state.seller = action.payload;
            toast("The address have been added successfully")
            state.isLodging = false;
        })
        builder.addCase(addSeller.rejected, (state, action) => {
            state.error = action.payload;
            state.isLodging = false;
        })
    }

})

export default sellerSlice.reducer;
export const { setSeller } = sellerSlice.actions;