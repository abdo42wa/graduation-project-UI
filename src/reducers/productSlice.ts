import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit"
import axios from "axios";
import { toast } from "react-toastify";
import { ICreateProduct, IProduct } from "../product/ProductType";
import { getProductWishlistById } from "./wishlistSlice";

interface ProductState {
    products: IProduct[];
    singleProduct: IProduct | null;
    isLodging: boolean;
    error: any;
    productData: []
}

const initialState: ProductState = {
    products: [],
    singleProduct: null,
    isLodging: false,
    error: null,
    productData: []

}

//action
export const getSearchedProduct = createAsyncThunk<IProduct[], string>(
    "products/getSearchedProduct",
    async (search, thunkAPI) => {
        try {
            const response = await axios.get(`http://localhost:5000/api/products?keyword=${search}`);
            return response.data;
        } catch (error) {
            return thunkAPI.rejectWithValue(error)
        }
    }
)

export const getProducts = createAsyncThunk<IProduct[], string>(
    "products/getProducts",
    async (cat = '', thunkAPI) => {
        try {
            const response = await axios.get(`http://localhost:5000/api/products?category=${cat}`);
            return response.data;
        } catch (error) {
            return thunkAPI.rejectWithValue(error)
        }
    }
)

export const getLatestProducts = createAsyncThunk<IProduct[]>(
    "products/getLatestProducts",
    async (_, thunkAPI) => {
        try {
            const response = await axios.get("http://localhost:5000/api/products?new=true");
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

export const reApproveProductByID = createAsyncThunk<IProduct, string>(
    "products/reApproveProductByID",
    async (id, thunkAPI) => {
        try {
            const response = await axios.patch(`http://localhost:5000/api/products/resend/approve/${id}`);
            thunkAPI.dispatch(getAllUserProducts())
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
            // thunkAPI.dispatch(getProductWishlistById(id));
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
export const getAllUserProductsWaiting = createAsyncThunk<IProduct[]>(
    "products/getAllUserProductsPending",
    async (_, thunkAPI) => {
        try {
            const response = await axios.get('http://localhost:5000/api/products/own?pending=true', ({ withCredentials: true }));
            return response.data;
        } catch (error) {
            return thunkAPI.rejectWithValue(error)
        }
    }
)
export const getAllUserProductsRejected = createAsyncThunk<IProduct[]>(
    "products/getAllUserProductsRejected",
    async (_, thunkAPI) => {
        try {
            const response = await axios.get('http://localhost:5000/api/products/own?rejected=true', ({ withCredentials: true }));
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
            // thunkAPI.dispatch(getProducts())
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
            // thunkAPI.dispatch(getProducts())
            return response.data;
        } catch (error) {
            return thunkAPI.rejectWithValue(error)
        }
    }
)

export const applyDiscount = createAsyncThunk<IProduct, ICreateProduct>(
    "products/updateProduct",
    async (data, thunkAPI) => {
        const { _id } = data
        try {
            const response = await axios.patch(`http://localhost:5000/api/products/discount/${_id}`, data, ({ withCredentials: true }));
            toast.success("the discount have been applied")
            return response.data;
        } catch (error) {
            return thunkAPI.rejectWithValue(error)
        }
    }
)

export const changeVisibility = createAsyncThunk<IProduct, ICreateProduct>(
    "products/updateProduct",
    async (data, thunkAPI) => {
        const { _id } = data
        try {
            const response = await axios.patch(`http://localhost:5000/api/products/visibility/${_id}`, data, ({ withCredentials: true }));
            toast.success("You have updated the product visibility")
            thunkAPI.dispatch(getAllUserProducts());
            return response.data;
        } catch (error) {
            return thunkAPI.rejectWithValue(error)
        }
    }
)


export const rejectProduct = createAsyncThunk<IProduct, ICreateProduct>(
    "products/rejectProduct",
    async (data, thunkAPI) => {
        const { _id } = data
        try {
            const response = await axios.patch(`http://localhost:5000/api/products/reject/${_id}`, data, ({ withCredentials: true }));
            thunkAPI.dispatch(AdminGetProducts())
            return response.data;
        } catch (error) {
            return thunkAPI.rejectWithValue(error)
        }
    }
)
export const getProductStatsAdmin = createAsyncThunk<any>(
    "user/getProductStatsAdmin",
    async (_, thunkAPI) => {
        try {
            const response = await axios.get("http://localhost:5000/api/products/stats", ({ withCredentials: true }));
            return response.data;
        } catch (error) {
            if (error instanceof Error)

                return thunkAPI.rejectWithValue(error.message)
        }
    }
)

export const getAllProduct = createAsyncThunk<IProduct[]>(
    "user/getAllProduct",
    async (_, thunkAPI) => {
        try {
            const response = await axios.get("http://localhost:5000/api/products/all", ({ withCredentials: true }));

            return response.data;
        } catch (error) {
            if (error instanceof Error)

                return thunkAPI.rejectWithValue(error.message)
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

        // get searched products

        builder.addCase(getSearchedProduct.pending, (state) => {
            state.isLodging = true;
        });
        builder.addCase(getSearchedProduct.fulfilled, (state, action) => {
            state.products = action.payload;
            state.isLodging = false;
        })
        builder.addCase(getSearchedProduct.rejected, (state, action) => {
            state.error = action.payload;
            state.isLodging = false;
        })

        // get searched getProductStatsAdmin

        builder.addCase(getProductStatsAdmin.pending, (state) => {
            state.isLodging = true;
        });
        builder.addCase(getProductStatsAdmin.fulfilled, (state, action) => {
            state.productData = action.payload;
            state.isLodging = false;
        })
        builder.addCase(getProductStatsAdmin.rejected, (state, action) => {
            state.error = action.payload;
            state.isLodging = false;
        })
        // pending products
        builder.addCase(getAllUserProductsWaiting.pending, (state) => {
            state.isLodging = true;
        });
        builder.addCase(getAllUserProductsWaiting.fulfilled, (state, action) => {
            state.products = action.payload;
            state.isLodging = false;
        })
        builder.addCase(getAllUserProductsWaiting.rejected, (state, action) => {
            state.error = action.payload;
            state.isLodging = false;
        })

        // all product

        builder.addCase(getAllProduct.pending, (state) => {
            state.isLodging = true;
        });
        builder.addCase(getAllProduct.fulfilled, (state, action) => {
            state.products = action.payload;
            state.isLodging = false;
        })
        builder.addCase(getAllProduct.rejected, (state, action) => {
            state.error = action.payload;
            state.isLodging = false;
        })
        // rejected products
        builder.addCase(getAllUserProductsRejected.pending, (state) => {
            state.isLodging = true;
        });
        builder.addCase(getAllUserProductsRejected.fulfilled, (state, action) => {
            state.products = action.payload;
            state.isLodging = false;
        })
        builder.addCase(getAllUserProductsRejected.rejected, (state, action) => {
            state.error = action.payload;
            state.isLodging = false;
        })
        // get last 5 created products

        builder.addCase(getLatestProducts.pending, (state) => {
            state.isLodging = true;
        });
        builder.addCase(getLatestProducts.fulfilled, (state, action) => {
            state.products = action.payload;
            state.isLodging = false;
        })
        builder.addCase(getLatestProducts.rejected, (state, action) => {
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

        // send product to be reviewed
        builder.addCase(reApproveProductByID.pending, (state) => {
            state.isLodging = true;
        })
        builder.addCase(reApproveProductByID.fulfilled, (state, action) => {
            state.singleProduct = action.payload;
            toast.success("The product waiting for admin approve")
            state.isLodging = false;
        })
        builder.addCase(reApproveProductByID.rejected, (state, action) => {
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
        // reject product
        builder.addCase(rejectProduct.pending, (state) => {
            state.isLodging = true;
        })
        builder.addCase(rejectProduct.fulfilled, (state, action) => {
            state.singleProduct = action.payload;
            toast.warning("Product rejected")
            state.isLodging = false;
        })
        builder.addCase(rejectProduct.rejected, (state, action) => {
            state.error = action.payload;
            state.isLodging = false;
        })
    }

})

export default productSlice.reducer;
export const { setProducts } = productSlice.actions;