import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit"
import axios from "axios";
import { Iproduct } from "../product/ProductType";

interface ProductState {
    products: Iproduct[];
    singleProduct: Iproduct | null;
    isLoding: boolean;
    error: any;
}

const initialState: ProductState = {
    products: [],
    singleProduct: null,
    isLoding: false,
    error: null,

}

//action
export const getProducts = createAsyncThunk<Iproduct[]>(
    "products/getProducts",
    async (_, thunkAPI) => {
        try {
            const responce = await axios.get("http://localhost:5000/api/products");
            return responce.data;
        } catch (error) {
            return thunkAPI.rejectWithValue(error)
        }
    }
)

export const getProductByID = createAsyncThunk<Iproduct, string>(
    "products/getProductByID",
    async (id, thunkAPI) => {
        try {
            const responce = await axios.get(`http://localhost:5000/api/products/${id}`);
            return responce.data;
        } catch (error) {
            return thunkAPI.rejectWithValue(error)
        }
    }
)

export const createProduct = createAsyncThunk<Iproduct, Iproduct>(
    "products/createProduct",
    async (data, thunkAPI) => {
        try {
            const responce = await axios.post("http://localhost:5000/api/products/create", data, ({ withCredentials: true }));
            thunkAPI.dispatch(getProducts())
            return responce.data;
        } catch (error) {
            return thunkAPI.rejectWithValue(error)
        }
    }
)

//reducers

export const productSilce = createSlice({
    name: "products",
    initialState,
    reducers: {
        setProducts: (state, action: PayloadAction<Iproduct[]>) => {
            state.products = action.payload
        }
    },
    extraReducers: (builder) => {
        builder.addCase(getProducts.pending, (state) => {
            state.isLoding = true;
        });
        builder.addCase(getProducts.fulfilled, (state, action) => {
            state.products = action.payload;
            state.isLoding = false;
        })
        builder.addCase(getProducts.rejected, (state, action) => {
            state.error = action.payload;
            state.isLoding = false;
        })
        // get product by ID
        builder.addCase(getProductByID.pending, (state) => {
            state.isLoding = true;
        })
        builder.addCase(getProductByID.fulfilled, (state, action) => {
            state.singleProduct = action.payload;
            state.isLoding = false;
        })
        builder.addCase(getProductByID.rejected, (state, action) => {
            state.error = action.payload;
            state.isLoding = false;
        })
        // create product 
        builder.addCase(createProduct.pending, (state) => {
            state.isLoding = true;
        })
        builder.addCase(createProduct.fulfilled, (state, action) => {
            state.singleProduct = action.payload;
            state.isLoding = false;
        })
        builder.addCase(createProduct.rejected, (state, action) => {
            state.error = action.payload;
            state.isLoding = false;
        })
    }

})

export default productSilce.reducer;
export const { setProducts } = productSilce.actions;