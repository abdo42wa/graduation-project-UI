import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit"
import axios from "axios";
import { Iuser } from "../auth/UserType";

const currentUser = localStorage.getItem("userInfo");
interface UserState {
    user: Iuser | null;
    isLoding: boolean;
    error: any;
    currentUsername: string | null;
}

const initialState: UserState = {
    user: null,
    isLoding: false,
    error: null,
    currentUsername: currentUser ? currentUser : null

}

//action
export const getUser = createAsyncThunk<Iuser>(
    "user/getuserInfo",
    async (_, thunkAPI) => {
        try {
            const responce = await axios.get("http://localhost:5000/api/user/userinfo", ({ withCredentials: true }));
            return responce.data;
        } catch (error) {
            return thunkAPI.rejectWithValue(error)
        }
    }
)

// log in
export const login = createAsyncThunk<any, Iuser>(
    "user/login",
    async (data, thunkAPI) => {
        try {
            const responce = await axios.post("http://localhost:5000/api/user/login", data, ({ withCredentials: true }));
            localStorage.setItem('userInfo', JSON.stringify(responce.data.user.name))
            return responce.data;
        } catch (error) {
            return thunkAPI.rejectWithValue(error)
        }
    }
)

// sigun up
export const createUser = createAsyncThunk<any, Iuser>(
    "user/createUser",
    async (data, thunkAPI) => {
        try {
            const responce = await axios.post("http://localhost:5000/api/user/signup", data);
            return responce.data;
        } catch (error) {
            return thunkAPI.rejectWithValue(error)
        }
    }
)



//reducers

export const userSilce = createSlice({
    name: "user",
    initialState,
    reducers: {
        setUser: (state, action: PayloadAction<Iuser>) => {
            state.user = action.payload
        }
    },
    extraReducers: (builder) => {
        builder.addCase(login.pending, (state) => {
            state.isLoding = true;
        });
        builder.addCase(login.fulfilled, (state, action) => {
            state.user = action.payload;
            state.isLoding = false;
        })
        builder.addCase(login.rejected, (state, action) => {
            state.error = action.payload;
            state.isLoding = false;
        })
        builder.addCase(getUser.pending, (state) => {
            state.isLoding = true;
        });
        builder.addCase(getUser.fulfilled, (state, action) => {
            state.user = action.payload;
            state.isLoding = false;
        })
        builder.addCase(getUser.rejected, (state, action) => {
            state.error = action.payload;
            state.isLoding = false;
        })
        // builder.addCase(getProductByID.pending, (state) => {
        //     state.isLoding = true;
        // })
        // builder.addCase(getProductByID.fulfilled, (state, action) => {
        //     state.singleProduct = action.payload;
        //     state.isLoding = false;
        // })
        // builder.addCase(getProductByID.rejected, (state, action) => {
        //     state.error = action.payload;
        //     state.isLoding = false;
        // })
    }

})

export default userSilce.reducer;
export const { setUser } = userSilce.actions;