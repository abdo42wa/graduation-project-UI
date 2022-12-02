import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit"
import axios from "axios";
import { toast } from "react-toastify";
import { ICreateProduct, IProduct } from "../product/ProductType";

interface ProductState {
    products: IProduct[];
    singleProduct: IProduct | null;
    isLodging: boolean;
    error: any;
}

const initialState: ProductState = {
    products: [],
    singleProduct: null,
    isLodging: false,
    error: null,

}

//action
export const getProducts = createAsyncThunk<IProduct[]>(
    "products/getProducts",
    async (_, thunkAPI) => {
        try {
            const response = await axios.get("http://localhost:5000/api/products");
            return response.data;
        } catch (error) {
            return thunkAPI.rejectWithValue(error)
        }
    }
)

export const AdminGetProducts = createAsyncThunk<IProduct[]>(
    "products/AdminGetProducts",
    async (_, thunkAPI) => {
        try {
            const response = await axios.get("http://localhost:5000/api/products/admin/products");
            return response.data;
        } catch (error) {
            return thunkAPI.rejectWithValue(error)
        }
    }
)

export const approveProductByID = createAsyncThunk<IProduct, string>(
    "products/approveProductByID",
    async (id, thunkAPI) => {
        try {
            const response = await axios.patch(`http://localhost:5000/api/products/approve/${id}`);
            thunkAPI.dispatch(AdminGetProducts())
            return response.data;
        } catch (error) {
            return thunkAPI.rejectWithValue(error)
        }
    }
)

export const getProductByID = createAsyncThunk<IProduct, string>(
    "products/getProductByID",
    async (id, thunkAPI) => {
        try {
            const response = await axios.get(`http://localhost:5000/api/products/${id}`);
            return response.data;
        } catch (error) {
            return thunkAPI.rejectWithValue(error)
        }
    }
)

export const getAllUserProducts = createAsyncThunk<IProduct[]>(
    "products/getAllUserProducts",
    async (_, thunkAPI) => {
        try {
            const response = await axios.get('http://localhost:5000/api/products/own', ({ withCredentials: true }));
            return response.data;
        } catch (error) {
            return thunkAPI.rejectWithValue(error)
        }
    }
)

export const createProduct = createAsyncThunk<IProduct, ICreateProduct>(
    "products/createProduct",
    async (data, thunkAPI) => {
        try {
            const response = await axios.post("http://localhost:5000/api/products/create", data, ({ withCredentials: true }));
            thunkAPI.dispatch(getProducts())
            return response.data;
        } catch (error) {
            return thunkAPI.rejectWithValue(error)
        }
    }
)

export const updateProduct = createAsyncThunk<IProduct, ICreateProduct>(
    "products/updateProduct",
    async (data, thunkAPI) => {
        const { _id } = data
        try {
            const response = await axios.put(`http://localhost:5000/api/products/${_id}`, data, ({ withCredentials: true }));
            thunkAPI.dispatch(getProducts())
            return response.data;
        } catch (error) {
            return thunkAPI.rejectWithValue(error)
        }
    }
)

//reducers

export const productSlice = createSlice({
    name: "products",
    initialState,
    reducers: {
        setProducts: (state, action: PayloadAction<IProduct[]>) => {
            state.products = action.payload
        }
    },
    extraReducers: (builder) => {
        builder.addCase(getProducts.pending, (state) => {
            state.isLodging = true;
        });
        builder.addCase(getProducts.fulfilled, (state, action) => {
            state.products = action.payload;
            state.isLodging = false;
        })
        builder.addCase(getProducts.rejected, (state, action) => {
            state.error = action.payload;
            state.isLodging = false;
        })

        // get all products for admin
        builder.addCase(AdminGetProducts.pending, (state) => {
            state.isLodging = true;
        });
        builder.addCase(AdminGetProducts.fulfilled, (state, action) => {
            state.products = action.payload;
            state.isLodging = false;
        })
        builder.addCase(AdminGetProducts.rejected, (state, action) => {
            state.error = action.payload;
            state.isLodging = false;
        })
        // get product by ID
        builder.addCase(getProductByID.pending, (state) => {
            state.isLodging = true;
        })
        builder.addCase(getProductByID.fulfilled, (state, action) => {
            state.singleProduct = action.payload;
            state.isLodging = false;
        })
        builder.addCase(getProductByID.rejected, (state, action) => {
            state.error = action.payload;
            state.isLodging = false;
        })
        // approve product
        builder.addCase(approveProductByID.pending, (state) => {
            state.isLodging = true;
        })
        builder.addCase(approveProductByID.fulfilled, (state, action) => {
            state.singleProduct = action.payload;
            toast.success("the product have been approved")
            state.isLodging = false;
        })
        builder.addCase(approveProductByID.rejected, (state, action) => {
            state.error = action.payload;
            state.isLodging = false;
        })
        // get all user products
        builder.addCase(getAllUserProducts.pending, (state) => {
            state.isLodging = true;
        })
        builder.addCase(getAllUserProducts.fulfilled, (state, action) => {
            state.products = action.payload;
            state.isLodging = false;
        })
        builder.addCase(getAllUserProducts.rejected, (state, action) => {
            state.error = action.payload;
            state.isLodging = false;
        })
        // create product 
        builder.addCase(createProduct.pending, (state) => {
            state.isLodging = true;
        })
        builder.addCase(createProduct.fulfilled, (state, action) => {
            state.singleProduct = action.payload;
            toast.success("You have created the product successfully")
            state.isLodging = false;
        })
        builder.addCase(createProduct.rejected, (state, action) => {
            state.error = action.payload;
            state.isLodging = false;
        })

        // update product
        builder.addCase(updateProduct.pending, (state) => {
            state.isLodging = true;
        })
        builder.addCase(updateProduct.fulfilled, (state, action) => {
            state.singleProduct = action.payload;
            toast.success("You have updated the product successfully")
            state.isLodging = false;
        })
        builder.addCase(updateProduct.rejected, (state, action) => {
            state.error = action.payload;
            state.isLodging = false;
        })
    }

})

export default productSlice.reducer;
export const { setProducts } = productSlice.actions;