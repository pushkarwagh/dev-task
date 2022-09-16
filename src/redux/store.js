
import { configureStore } from '@reduxjs/toolkit'
import userReducer from './slices/userSlice'
import modalReducer from './slices/ModalSlice';
import activityReducer from './slices/ActivitySlice';
import tripsReducer from './slices/TripSlice';

export const store = configureStore({
    reducer: {
        user: userReducer,
        modal: modalReducer,
        activity: activityReducer,
        trips: tripsReducer,
    },
})