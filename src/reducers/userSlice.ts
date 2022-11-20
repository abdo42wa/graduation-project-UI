import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit"
import axios from "axios";
import { toast } from "react-toastify";
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
            console.log(responce.data)
            return responce.data;
        } catch (error) {
            return thunkAPI.rejectWithValue(error)
        }
    }
)

// log in
export const login = createAsyncThunk<Iuser, Iuser>(
    "user/login",
    async (data, thunkAPI) => {
        try {
            const responce = await axios.post("http://localhost:5000/api/user/login", data, ({ withCredentials: true }));
            localStorage.setItem('userInfo', JSON.stringify(responce.data.user.name));
            getUser();
            return responce.data;
        } catch (error) {
            return thunkAPI.rejectWithValue(error)
        }
    }
)
// log out
export const logOut = createAsyncThunk<Iuser>(
    "user/logOut",
    async (_, thunkAPI) => {
        try {
            const responce = await axios.get("http://localhost:5000/api/user/logout", ({ withCredentials: true }));
            localStorage.removeItem('userInfo')
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
            const responce = await axios.post("http://localhost:5000/api/user/signup", data, ({ withCredentials: true }));
            return responce.data;
        } catch (error) {
            return thunkAPI.rejectWithValue(error)
        }
    }
)

// update User

export const updateUserProfile = createAsyncThunk<any, Iuser>(
    "user/update",
    async (data, thunkAPI) => {
        try {
            const responce = await axios.put("http://localhost:5000/api/user/profile", data, ({ withCredentials: true }));
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
        },
        setIsAuthticated: (state, action) => {
            state.currentUsername = action.payload
        }
    },
    extraReducers: (builder) => {
        builder.addCase(login.pending, (state) => {
            state.isLoding = true;
        });
        builder.addCase(login.fulfilled, (state, action) => {
            state.user = action.payload;
            state.currentUsername = currentUser;
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
        builder.addCase(logOut.pending, (state) => {
            state.isLoding = true;
            state.currentUsername = ""
        });
        builder.addCase(logOut.fulfilled, (state, action) => {
            state.user = action.payload;
            state.user = null
            state.isLoding = false;
        })
        builder.addCase(logOut.rejected, (state, action) => {
            state.error = action.payload;
            state.isLoding = false;
        })
        builder.addCase(createUser.pending, (state) => {
            state.isLoding = true;
        });
        builder.addCase(createUser.fulfilled, (state, action) => {
            state.user = action.payload;
            state.currentUsername = currentUser;
            state.isLoding = false;
        })
        builder.addCase(createUser.rejected, (state, action) => {
            state.error = action.payload;
            state.isLoding = false;
        })

        builder.addCase(updateUserProfile.pending, (state) => {
            state.isLoding = true;
        });
        builder.addCase(updateUserProfile.fulfilled, (state, action) => {
            state.user = action.payload;
            toast.success("You have update you name successfuly")
            state.isLoding = false;
        })
        builder.addCase(updateUserProfile.rejected, (state, action) => {
            state.error = action.payload;
            state.isLoding = false;
        })

    }

})

export default userSilce.reducer;
export const { setUser, setIsAuthticated } = userSilce.actions;