import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import API from '../../assests/Api/Api'

const api = new API();

export const getTrips = createAsyncThunk(
    'trips',
    async () => {
        let response = {};
        await api.getUserTrips().then(res => response = res.data).catch(error => console.log(error))
        return response;
    }
)

export const addActivity = createAsyncThunk(
    'trips/addTrip',
    async (slug, { dispatch }) => {
        await api.addActivity(slug).then(res => dispatch(getTrips())).catch(error => console.log(error));
        return true;
    }
)

export const removeActivity = createAsyncThunk(
    'trips/removeTrip',
    async (slug, { dispatch }) => {
        await api.removeActivity(slug).then(res => dispatch(getTrips())).catch(error => console.log(error));
        return true;
    }
)

const initialState = {
    tripsData: null,
};

const tripsSlice = createSlice({
    name: 'trips',
    initialState,
    extraReducers: (builder) => {
        builder.addCase(getTrips.fulfilled, (state, action) => {
            state.tripsData = action.payload;
        });
        builder.addCase(addActivity.fulfilled, (state, action) => {
            console.log('Added')
        })
        builder.addCase(removeActivity.fulfilled, (state, action) => {
            console.log('Removed');
        })
    },
});

export default tripsSlice.reducer;