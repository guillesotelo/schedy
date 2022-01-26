import { createReducer, createAsyncThunk } from "@reduxjs/toolkit"
import { 
    loginUser, 
    setUserVoid, 
} from "../services/reduxServices";

const initialState = {
    admin: null,
}

export const logInAdmin = createAsyncThunk('LOGIN_USER', loginUser)
export const logOutUser = createAsyncThunk('LOGOUT_USER', setUserVoid)

const adminReducer = createReducer(initialState, {
  [logInAdmin.fulfilled]: (state, action) => action.payload,
  [logOutUser.fulfilled]: (state, action) => action.payload,
});

export default adminReducer;