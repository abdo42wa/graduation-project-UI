import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit"
import axios from "axios";
import { toast } from "react-toastify";
import { io } from "socket.io-client";
import { IUser } from "../auth/UserType";

const currentUser = localStorage.getItem("userInfo");
interface UserState {
    user: IUser | null;
    users: IUser[];
    isLodging: boolean;
    error: any;
    success: any;
    currentUsername: string | null;
    data: [];
}

const initialState: UserState = {
    user: null,
    isLodging: false,
    error: null,
    success: null,
    data: [],
    users: [],
    currentUsername: currentUser ? currentUser : null

}

//action
export const getUser = createAsyncThunk<IUser>(
    "user/getuserInfo",
    async (_, thunkAPI) => {
        try {
            const response = await axios.get("http://localhost:5000/api/user/userinfo", ({ withCredentials: true }));
            console.log(response.data)
            return response.data;
        } catch (error) {
            return thunkAPI.rejectWithValue(error)
        }
    }
)

export const getUserToken = createAsyncThunk<any, any>(
    "user/getUserToken",
    async (data, thunkAPI) => {
        const { _id, token }: any = data;
        try {
            const response = await axios.get(`http://localhost:5000/api/user/${_id}/verify/${token}`, ({ withCredentials: true }));
            return response.data;
        } catch (error) {
            return thunkAPI.rejectWithValue(error)
        }
    }
)
// const socket = io("http://localhost:5000");
// log in
export const login = createAsyncThunk<IUser, IUser>(
    "user/login",
    async (data, thunkAPI) => {
        try {
            const response = await axios.post("http://localhost:5000/api/user/login", data, ({ withCredentials: true }));
            localStorage.setItem('userInfo', JSON.stringify(response.data.user.name));
            console.log({ userID: response.data.user._id })
            // socket.emit("setup", response.data.user._id);
            getUser();
            return response.data;
        } catch (error) {
            if (error instanceof Error)
                return thunkAPI.rejectWithValue(error.message)
        }
    }
)
// log out
export const logOut = createAsyncThunk<IUser>(
    "user/logOut",
    async (_, thunkAPI) => {
        try {
            const response = await axios.get("http://localhost:5000/api/user/logout", ({ withCredentials: true }));
            localStorage.removeItem('userInfo')
            return response.data;
        } catch (error) {
            return thunkAPI.rejectWithValue(error)
        }
    }
)

// sign up
export const createUser = createAsyncThunk<any, IUser>(
    "user/createUser",
    async (data, thunkAPI) => {
        try {
            const response = await axios.post("http://localhost:5000/api/user/signup", data, ({ withCredentials: true }));
            return response.data;
        } catch (error) {
            if (error instanceof Error)
                return thunkAPI.rejectWithValue(error.message)
        }
    }
)
export const getAllUsers = createAsyncThunk<IUser[]>(
    "user/getAllUsers",
    async (_, thunkAPI) => {
        try {
            const response = await axios.get("http://localhost:5000/api/user/allusers", ({ withCredentials: true }));
            return response.data;
        } catch (error) {
            if (error instanceof Error)
                return thunkAPI.rejectWithValue(error.message)
        }
    }
)

// update User

export const updateUserProfile = createAsyncThunk<any, IUser>(
    "user/update",
    async (data, thunkAPI) => {
        try {
            const response = await axios.put("http://localhost:5000/api/user/profile", data, ({ withCredentials: true }));
            return response.data;
        } catch (error) {
            if (error instanceof Error)

                return thunkAPI.rejectWithValue(error.message)
        }
    }
)

export const getUserStatsAdmin = createAsyncThunk<any>(
    "user/getUserStatsAdmin",
    async (_, thunkAPI) => {
        try {
            const response = await axios.get("http://localhost:5000/api/user/stats", ({ withCredentials: true }));
            return response.data;
        } catch (error) {
            if (error instanceof Error)

                return thunkAPI.rejectWithValue(error.message)
        }
    }
)
//reducers

export const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        setUser: (state, action: PayloadAction<IUser>) => {
            state.user = action.payload
        },
        setIsAuthenticated: (state, action) => {
            state.currentUsername = action.payload
        }
    },
    extraReducers: (builder) => {
        builder.addCase(login.pending, (state) => {
            state.isLodging = true;
        });
        builder.addCase(login.fulfilled, (state, action) => {
            state.user = action.payload;
            state.currentUsername = currentUser;
            state.isLodging = false;
        })
        builder.addCase(login.rejected, (state, action) => {
            state.error = action.payload;
            state.isLodging = false;
        })
        builder.addCase(getUser.pending, (state) => {
            state.isLodging = true;
        });
        builder.addCase(getUser.fulfilled, (state, action) => {
            state.user = action.payload;
            state.isLodging = false;
        })
        builder.addCase(getUser.rejected, (state, action) => {
            state.error = action.payload;
            state.isLodging = false;
        })

        builder.addCase(getAllUsers.pending, (state) => {
            state.isLodging = true;
        });
        builder.addCase(getAllUsers.fulfilled, (state, action) => {
            state.users = action.payload;
            state.isLodging = false;
        })
        builder.addCase(getAllUsers.rejected, (state, action) => {
            state.error = action.payload;
            state.isLodging = false;
        })
        // get user token


        builder.addCase(getUserToken.pending, (state) => {
            state.isLodging = true;
        });
        builder.addCase(getUserToken.fulfilled, (state, action) => {
            state.success = action.payload;
            state.isLodging = false;
        })
        builder.addCase(getUserToken.rejected, (state, action) => {
            state.error = action.payload;
            state.isLodging = false;
        })
        // get user stats
        builder.addCase(getUserStatsAdmin.pending, (state) => {
            state.isLodging = true;
        });
        builder.addCase(getUserStatsAdmin.fulfilled, (state, action) => {
            state.data = action.payload;
            state.isLodging = false;
        })
        builder.addCase(getUserStatsAdmin.rejected, (state, action) => {
            state.error = action.payload;
            state.isLodging = false;
        })
        // log out 
        builder.addCase(logOut.pending, (state) => {
            state.isLodging = true;
            state.currentUsername = ""
        });
        builder.addCase(logOut.fulfilled, (state, action) => {
            state.user = action.payload;
            state.user = null
            state.isLodging = false;
        })
        builder.addCase(logOut.rejected, (state, action) => {
            state.error = action.payload;
            state.isLodging = false;
        })
        builder.addCase(createUser.pending, (state) => {
            state.isLodging = true;
        });
        builder.addCase(createUser.fulfilled, (state, action) => {
            state.isLodging = false;
            state.success = action.payload
        })
        builder.addCase(createUser.rejected, (state, action) => {
            state.error = action.error;
            state.isLodging = false;
        })

        builder.addCase(updateUserProfile.pending, (state) => {
            state.isLodging = true;
        });
        builder.addCase(updateUserProfile.fulfilled, (state, action) => {
            state.user = action.payload;
            toast.success("You have update you name successfully")
            state.isLodging = false;
        })
        builder.addCase(updateUserProfile.rejected, (state, action) => {
            state.error = action.payload;
            state.isLodging = false;
        })

    }

})

export default userSlice.reducer;
export const { setUser, setIsAuthenticated } = userSlice.actions;