import React from 'react'
import { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom';
import { addActivity, removeActivity } from '../../redux/slices/TripSlice'

export default function ActivityCard(props) {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const tripsPageData = useSelector((state) => state.trips.tripsData);

    const handleLink = () => {
        navigate(`/frontend/activities/slug/${props.data.slug}`);
        window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
    }

    const handleCheck = useCallback(() => {
        if (tripsPageData) {
            let favouriteObj = tripsPageData?.find(trip => trip.type === 'favorite');
            return favouriteObj.activities.find(activity => activity.id === props.data.id);
        }
        return false;
    }, [tripsPageData, props.data]);

    const handleFavorite = () => {
        const item = {
            activityId: props.data.id,
            tripId: props.data.id,
            tripType: "favorite"
        };
        handleCheck() ?
            dispatch(removeActivity(item))
            :
            dispatch(addActivity(item))

    }

    return (
        <div className='px-1'>
            <div className='position-relative mb-2'>
                <img className='w-100 rounded-3' height={250} src={props.data.images[0].url} alt="Graventeen castle, Ghent, Belgium" />
                <div>
                    <button className='position-absolute save-btn text-white rounded-3 px-3' onClick={handleFavorite}>{`${handleCheck() ? 'Saved' : 'Save'}`}</button>
                </div>
            </div>
            <h5>{props.data.name}</h5>
            <p className='text-dgray'>{props.data.description_short}
                <button onClick={handleLink} className='read-more fw-bold text-decoration-none bg-transparent border-0 py-0'>READ MORE</button>
            </p>
        </div>
    )
}
