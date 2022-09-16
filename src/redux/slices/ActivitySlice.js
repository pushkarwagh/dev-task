import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import API from '../../assests/Api/Api'

const api = new API();

export const getActivity = createAsyncThunk(
    'activity',
    async (slug, { dispatch }) => {
        let response = {};
        await api.getActivity(slug).then(res => response = res.data).catch(error => console.log(error))
        dispatch(getNearbyActivities(response?.id))
        return response;
    }
)

export const getNearbyActivities = createAsyncThunk(
    'nearByActivity',
    async (slug) => {
        let response = {};
        await api.getNearbyActivities(slug).then(res => response = res.data).catch(error => console.log(error))
        return response;
    }
)

const initialState = {
    activityData: null,
    nearByActivityData: null
};

const activitySlice = createSlice({
    name: 'activity',
    initialState,
    extraReducers: (builder) => {
        builder.addCase(getActivity.fulfilled, (state, action) => {
            state.activityData = action.payload;
        })
        builder.addCase(getNearbyActivities.fulfilled, (state, action) => {
            state.nearByActivityData = action.payload;
        })
    },
});

export default activitySlice.reducer;