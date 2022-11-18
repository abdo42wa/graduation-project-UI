import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit"
import axios from "axios";
import { IReview } from "../interfaces/Ireview";

interface ProductState {
    reviews: IReview[];
    isLoding: boolean;
    singleReview: IReview | null
    averageRating: number
    error: any;
}

const initialState: ProductState = {
    reviews: [],
    isLoding: false,
    singleReview: null,
    averageRating: 0,
    error: null,

}

//action
export const getAllReviewsWithProductID = createAsyncThunk<IReview[], string>(
    "reviews/getreviewByID",
    async (id, thunkAPI) => {
        try {
            const responce = await axios.get(`http://localhost:5000/api/review/${id}`);
            return responce.data;
        } catch (error) {
            return thunkAPI.rejectWithValue(error)
        }
    }
)

export const getAvaregeRatingByProductId = createAsyncThunk<number, string>(
    "reviews/getAverage",
    async (id, thunkAPI) => {
        try {
            const responce = await axios.get(`http://localhost:5000/api/review/avr/${id}`);
            return responce.data[0];
        } catch (error) {
            return thunkAPI.rejectWithValue(error)
        }
    }
)


export const createProductReview = createAsyncThunk<IReview, IReview>(
    "reviews/create",
    async (data, thunkAPI) => {
        const { _id } = data
        try {
            const responce = await axios.post(`http://localhost:5000/api/review/${_id}`, data, ({ withCredentials: true }));
            console.log({ res: responce.data })
            return responce.data;
        } catch (error) {
            return thunkAPI.rejectWithValue(error)
        }
    }
)

//reducers

export const reviewSilce = createSlice({
    name: "reviews",
    initialState,
    reducers: {
        setReviews: (state, action: PayloadAction<IReview[]>) => {
            state.reviews = action.payload
        }
    },
    extraReducers: (builder) => {
        // get all reviews by product ID
        builder.addCase(getAllReviewsWithProductID.pending, (state) => {
            state.isLoding = true;
        })
        builder.addCase(getAllReviewsWithProductID.fulfilled, (state, action) => {
            state.reviews = action.payload;
            state.isLoding = false;
        })
        builder.addCase(getAllReviewsWithProductID.rejected, (state, action) => {
            state.error = action.payload;
            state.isLoding = false;
        })
        // get average rating
        builder.addCase(getAvaregeRatingByProductId.pending, (state) => {
            state.isLoding = true;
        })
        builder.addCase(getAvaregeRatingByProductId.fulfilled, (state, action) => {
            state.averageRating = action.payload;
            state.isLoding = false;
        })
        builder.addCase(getAvaregeRatingByProductId.rejected, (state, action) => {
            state.error = action.payload;
            state.isLoding = false;
        })

        // create review

        builder.addCase(createProductReview.pending, (state) => {
            state.isLoding = true;
        })
        builder.addCase(createProductReview.fulfilled, (state, action) => {
            state.singleReview = action.payload;
            state.isLoding = false;
        })
        builder.addCase(createProductReview.rejected, (state, action) => {
            state.error = action.payload;
            state.isLoding = false;
        })
    }

})

export default reviewSilce.reducer;
export const { setReviews } = reviewSilce.actions;