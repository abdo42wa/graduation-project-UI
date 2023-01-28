import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit"
import axios from "axios";
import { toast } from "react-toastify";
import { IReview } from "../interfaces/Ireview";

interface ProductState {
    reviews: IReview[];
    isLodging: boolean;
    singleReview: IReview | null
    averageRating: number
    error: any;
    reviewData: []
}

const initialState: ProductState = {
    reviews: [],
    isLodging: false,
    singleReview: null,
    averageRating: 0,
    error: null,
    reviewData: []

}

//action
export const getAllReviewsWithProductID = createAsyncThunk<IReview[], string>(
    "reviews/getreviewByID",
    async (id, thunkAPI) => {
        try {
            const response = await axios.get(`http://localhost:5000/api/review/${id}`);
            return response.data;
        } catch (error) {
            return thunkAPI.rejectWithValue(error)
        }
    }
)

export const getAllReviews = createAsyncThunk<IReview[]>(
    "reviews/getAllReviews",
    async (_, thunkAPI) => {
        try {
            const response = await axios.get(`http://localhost:5000/api/review/all`);
            return response.data;
        } catch (error) {
            return thunkAPI.rejectWithValue(error)
        }
    }
)
export const getAverageRatingByProductId = createAsyncThunk<number, string>(
    "reviews/getAverage",
    async (id, thunkAPI) => {
        try {
            const response = await axios.get(`http://localhost:5000/api/review/avr/${id}`);
            return response.data[0];
        } catch (error) {
            return thunkAPI.rejectWithValue(error)
        }
    }
)

export const deleteReview = createAsyncThunk<any, string>(
    "reviews/deleteReview",
    async (id, thunkAPI) => {
        try {
            const response = await axios.delete(`http://localhost:5000/api/review/delete/${id}`);
            thunkAPI.dispatch(getAllReviews());
            return response.data;
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
            const response = await axios.post(`http://localhost:5000/api/review/${_id}`, data, ({ withCredentials: true }));
            thunkAPI.dispatch(getAverageRatingByProductId(_id!))
            thunkAPI.dispatch(getAllReviewsWithProductID(_id!))
            console.log({ res: response.data })
            return response.data;
        } catch (error) {
            return thunkAPI.rejectWithValue(error)
        }
    }
)

export const getReviewStatsAdmin = createAsyncThunk<any>(
    "user/getReviewStatsAdmin",
    async (_, thunkAPI) => {
        try {
            const response = await axios.get("http://localhost:5000/api/review/stats", ({ withCredentials: true }));
            return response.data;
        } catch (error) {
            if (error instanceof Error)

                return thunkAPI.rejectWithValue(error.message)
        }
    }
)

//reducers

export const reviewSlice = createSlice({
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
            state.isLodging = true;
        })
        builder.addCase(getAllReviewsWithProductID.fulfilled, (state, action) => {
            state.reviews = action.payload;
            state.isLodging = false;
        })
        builder.addCase(getAllReviewsWithProductID.rejected, (state, action) => {
            state.error = action.payload;
            state.isLodging = false;
        })

        builder.addCase(deleteReview.pending, (state) => {
            state.isLodging = true;
        })
        builder.addCase(deleteReview.fulfilled, (state, action) => {
            state.error = action.payload;
            toast.error("Deleted Review ")
            state.isLodging = false;
        })
        builder.addCase(deleteReview.rejected, (state, action) => {
            state.error = action.payload;
            state.isLodging = false;
        })

        // get all reviews getReviewStatsAdmin
        builder.addCase(getReviewStatsAdmin.pending, (state) => {
            state.isLodging = true;
        })
        builder.addCase(getReviewStatsAdmin.fulfilled, (state, action) => {
            state.reviewData = action.payload;
            state.isLodging = false;
        })
        builder.addCase(getReviewStatsAdmin.rejected, (state, action) => {
            state.error = action.payload;
            state.isLodging = false;
        })
        // get average rating
        builder.addCase(getAverageRatingByProductId.pending, (state) => {
            state.isLodging = true;
        })
        builder.addCase(getAverageRatingByProductId.fulfilled, (state, action) => {
            state.averageRating = action.payload;
            state.isLodging = false;
        })
        builder.addCase(getAverageRatingByProductId.rejected, (state, action) => {
            state.error = action.payload;
            state.isLodging = false;
        })

        // get all reviews

        builder.addCase(getAllReviews.pending, (state) => {
            state.isLodging = true;
        })
        builder.addCase(getAllReviews.fulfilled, (state, action) => {
            state.reviews = action.payload;
            state.isLodging = false;
        })
        builder.addCase(getAllReviews.rejected, (state, action) => {
            state.error = action.payload;
            state.isLodging = false;
        })

        // create review

        builder.addCase(createProductReview.pending, (state) => {
            state.isLodging = true;
        })
        builder.addCase(createProductReview.fulfilled, (state, action) => {
            state.singleReview = action.payload;
            toast("Thanks for the review")
            state.isLodging = false;
        })
        builder.addCase(createProductReview.rejected, (state, action) => {
            state.error = action.payload;
            state.isLodging = false;
        })
    }

})

export default reviewSlice.reducer;
export const { setReviews } = reviewSlice.actions;