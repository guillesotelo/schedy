import { createReducer, createAsyncThunk } from "@reduxjs/toolkit"
import { 
    getAllScehdules, 
    createSchedule, 
} from "../services/reduxServices";

const initialState = {
    schedule: null,
}

export const getSchedules = createAsyncThunk('GET_SCHEDULE', getAllScehdules)
export const saveSchedule = createAsyncThunk('SAVE_SCHEDULE', createSchedule)

const adminReducer = createReducer(initialState, {
  [getSchedules.fulfilled]: (state, action) => action.payload,
  [saveSchedule.fulfilled]: (state, action) => action.payload,
});

export default adminReducer;