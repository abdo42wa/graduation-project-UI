import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit"
import axios from "axios";
import { toast } from "react-toastify";

interface ProductState {
    isLodging: boolean;
    wishlist: [];
    error: any;
}

const initialState: ProductState = {
    isLodging: false,
    error: null,
    wishlist: [],
}

export const addProductWishlist = createAsyncThunk<[], string>(
    "products/addProductWishlist",
    async (data, thunkAPI) => {
        const { id }: any = data
        try {
            const response = await axios.post(`http://localhost:5000/api/wishlist/${id}`, data, ({ withCredentials: true }));
            thunkAPI.dispatch(getProductWishlist())
            return response.data;
        } catch (error) {
            return thunkAPI.rejectWithValue(error)
        }
    }
)

export const getProductWishlist = createAsyncThunk<any>(
    "products/getProductWishlist",
    async (_, thunkAPI) => {
        try {
            const response = await axios.get(`http://localhost:5000/api/wishlist`, ({ withCredentials: true }));
            return response.data

        } catch (error) {
            return thunkAPI.rejectWithValue(error)
        }
    }
)

export const getProductWishlistById = createAsyncThunk<any, string>(
    "products/getProductWishlistByID",
    async (id, thunkAPI) => {
        try {
            const response = await axios.get(`http://localhost:5000/api/wishlist/${id}`, ({ withCredentials: true }));
            return response.data

        } catch (error) {
            return thunkAPI.rejectWithValue(error)
        }
    }
)


export const removeProductWishlist = createAsyncThunk<[], string>(
    "products/removeProductWishlist",
    async (data, thunkAPI) => {
        const { id }: any = data
        try {
            const response = await axios.post(`http://localhost:5000/api/wishlist/remove/${id}`, data, ({ withCredentials: true }));
            thunkAPI.dispatch(getProductWishlist())
            return response.data;
        } catch (error) {
            return thunkAPI.rejectWithValue(error)
        }
    }
)


export const productSlice = createSlice({
    name: "products",
    initialState,
    reducers: {
        setProducts: (state, action: PayloadAction<[]>) => {
            state.wishlist = action.payload
        }
    },
    extraReducers: (builder) => {

        // get user wishlist

        builder.addCase(getProductWishlist.pending, (state) => {
            state.isLodging = true;
        })
        builder.addCase(getProductWishlist.fulfilled, (state, action) => {
            state.wishlist = action.payload;
            state.isLodging = false;
        })
        builder.addCase(getProductWishlist.rejected, (state, action) => {
            state.error = action.payload;
            state.isLodging = false;
        })

        // get user wishlist by id

        builder.addCase(getProductWishlistById.pending, (state) => {
            state.isLodging = true;
        })
        builder.addCase(getProductWishlistById.fulfilled, (state, action) => {
            state.wishlist = action.payload;
            state.isLodging = false;
        })
        builder.addCase(getProductWishlistById.rejected, (state, action) => {
            state.error = action.payload;
            state.isLodging = false;
        })


        // add product from wishlist
        builder.addCase(addProductWishlist.pending, (state) => {
            state.isLodging = true;
        })
        builder.addCase(addProductWishlist.fulfilled, (state, action) => {
            state.wishlist = action.payload;
            toast.success("You have add the product to your wishlist successfully")
            state.isLodging = false;
        })
        builder.addCase(addProductWishlist.rejected, (state, action) => {
            state.error = action.payload;
            state.isLodging = false;
        })

        // remove product from wishlist
        builder.addCase(removeProductWishlist.pending, (state) => {
            state.isLodging = true;
        })
        builder.addCase(removeProductWishlist.fulfilled, (state, action) => {
            state.wishlist = action.payload;
            toast.warning("You have removed the product to your wishlist successfully")
            state.isLodging = false;
        })
        builder.addCase(removeProductWishlist.rejected, (state, action) => {
            state.error = action.payload;
            state.isLodging = false;
        })
    }

})

export default productSlice.reducer;
export const { setProducts } = productSlice.actions;