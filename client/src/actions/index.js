import axios from 'axios';   //  action that will make a fetch API (it is logged in?)
import { FETCH_USER } from './types';

export const fetchUser = () => async dispatch => {      // App component will dispatch
    const res = await axios.get('/api/current_user');    // going to veryfy if logged in

        dispatch({ type: FETCH_USER, payload: res.data });  // só interessa .data of response
    };

export const handleToken = (token) => async dispatch => {
    const res = await axios.post('/api/stripe', token);

    dispatch({ type: FETCH_USER, payload: res.data });
};