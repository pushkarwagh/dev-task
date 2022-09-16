import './App.css';
import 'react-multi-carousel/lib/styles.css';
import ActivityPage from './components/activity/ActivityPage';
import { useEffect } from 'react';
import { setVisibility } from './redux/slices/ModalSlice';
import LoginModal from './components/LoginModal';
import { useDispatch } from 'react-redux';
import { getActivity } from './redux/slices/ActivitySlice';
import { useParams } from 'react-router-dom';
import { getTrips } from './redux/slices/TripSlice';

function App() {
  const params = useParams();
  const dispatch = useDispatch();
  useEffect(() => {
    if (!localStorage.getItem('token')) {
      dispatch(setVisibility(true));
    } else {
      dispatch(getTrips());
    }
    dispatch(getActivity(params.activity));
  })
  return (
    <div className="App">
      <LoginModal />
      <ActivityPage />

    </div>
  );
}

export default App;
