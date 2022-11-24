import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit"
import axios from "axios";
import { toast } from "react-toastify";
import { ICategory } from "../interfaces/ICategory";

interface ProductState {
    categories: ICategory[];
    singleCategory: ICategory | null;
    isLodging: boolean;
    error: any;
}

const initialState: ProductState = {
    categories: [],
    singleCategory: null,
    isLodging: false,
    error: null,

}

//action
export const getCategories = createAsyncThunk<ICategory[]>(
    "categoris/get",
    async (_, thunkAPI) => {
        try {
            const response = await axios.get("http://localhost:5000/api/categories");
            return response.data;
        } catch (error) {
            return thunkAPI.rejectWithValue(error)
        }
    }
)

export const getCategoryByID = createAsyncThunk<ICategory, string>(
    "categoris/getByID",
    async (id, thunkAPI) => {
        try {
            const response = await axios.get(`http://localhost:5000/api/categories/${id}`);
            return response.data;
        } catch (error) {
            return thunkAPI.rejectWithValue(error)
        }
    }
)

export const createCategory = createAsyncThunk<ICategory, ICategory>(
    "categoris/create",
    async (data, thunkAPI) => {
        try {
            const response = await axios.post("http://localhost:5000/api/categories", data, ({ withCredentials: true }));
            thunkAPI.dispatch(getCategories())
            return response.data;
        } catch (error) {
            return thunkAPI.rejectWithValue(error)
        }
    }
)

//reducers

export const categorySlice = createSlice({
    name: "categories",
    initialState,
    reducers: {
        setCategories: (state, action: PayloadAction<ICategory[]>) => {
            state.categories = action.payload
        }
    },
    extraReducers: (builder) => {
        builder.addCase(getCategories.pending, (state) => {
            state.isLodging = true;
        });
        builder.addCase(getCategories.fulfilled, (state, action) => {
            state.categories = action.payload;
            state.isLodging = false;
        })
        builder.addCase(getCategories.rejected, (state, action) => {
            state.error = action.payload;
            state.isLodging = false;
        })
        // get Category by ID
        builder.addCase(getCategoryByID.pending, (state) => {
            state.isLodging = true;
        })
        builder.addCase(getCategoryByID.fulfilled, (state, action) => {
            state.singleCategory = action.payload;
            state.isLodging = false;
        })
        builder.addCase(getCategoryByID.rejected, (state, action) => {
            state.error = action.payload;
            state.isLodging = false;
        })
        // create Category 
        builder.addCase(createCategory.pending, (state) => {
            state.isLodging = true;
        })
        builder.addCase(createCategory.fulfilled, (state, action) => {
            state.singleCategory = action.payload;
            toast.success("Category have crated successfully")
            state.isLodging = false;
        })
        builder.addCase(createCategory.rejected, (state, action) => {
            state.error = action.payload;
            state.isLodging = false;
        })
    }

})

export default categorySlice.reducer;
export const { setCategories } = categorySlice.actions;