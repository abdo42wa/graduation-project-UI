import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit"
import axios from "axios";
import { toast } from "react-toastify";
import { ICategory } from "../interfaces/ICategory";

interface ProductState {
    categories: ICategory[];
    singleCategory: ICategory | null;
    isLoding: boolean;
    error: any;
}

const initialState: ProductState = {
    categories: [],
    singleCategory: null,
    isLoding: false,
    error: null,

}

//action
export const getCategories = createAsyncThunk<ICategory[]>(
    "categoris/get",
    async (_, thunkAPI) => {
        try {
            const responce = await axios.get("http://localhost:5000/api/categories");
            return responce.data;
        } catch (error) {
            return thunkAPI.rejectWithValue(error)
        }
    }
)

export const getCategoryByID = createAsyncThunk<ICategory, string>(
    "categoris/getByID",
    async (id, thunkAPI) => {
        try {
            const responce = await axios.get(`http://localhost:5000/api/categories/${id}`);
            return responce.data;
        } catch (error) {
            return thunkAPI.rejectWithValue(error)
        }
    }
)

export const createCategory = createAsyncThunk<ICategory, ICategory>(
    "categoris/create",
    async (data, thunkAPI) => {
        try {
            const responce = await axios.post("http://localhost:5000/api/categories", data, ({ withCredentials: true }));
            thunkAPI.dispatch(getCategories())
            return responce.data;
        } catch (error) {
            return thunkAPI.rejectWithValue(error)
        }
    }
)

//reducers

export const categorySilce = createSlice({
    name: "categoris",
    initialState,
    reducers: {
        setCategories: (state, action: PayloadAction<ICategory[]>) => {
            state.categories = action.payload
        }
    },
    extraReducers: (builder) => {
        builder.addCase(getCategories.pending, (state) => {
            state.isLoding = true;
        });
        builder.addCase(getCategories.fulfilled, (state, action) => {
            state.categories = action.payload;
            state.isLoding = false;
        })
        builder.addCase(getCategories.rejected, (state, action) => {
            state.error = action.payload;
            state.isLoding = false;
        })
        // get Category by ID
        builder.addCase(getCategoryByID.pending, (state) => {
            state.isLoding = true;
        })
        builder.addCase(getCategoryByID.fulfilled, (state, action) => {
            state.singleCategory = action.payload;
            state.isLoding = false;
        })
        builder.addCase(getCategoryByID.rejected, (state, action) => {
            state.error = action.payload;
            state.isLoding = false;
        })
        // create Category 
        builder.addCase(createCategory.pending, (state) => {
            state.isLoding = true;
        })
        builder.addCase(createCategory.fulfilled, (state, action) => {
            state.singleCategory = action.payload;
            toast.success("Category have crated successfully")
            state.isLoding = false;
        })
        builder.addCase(createCategory.rejected, (state, action) => {
            state.error = action.payload;
            state.isLoding = false;
        })
    }

})

export default categorySilce.reducer;
export const { setCategories } = categorySilce.actions;