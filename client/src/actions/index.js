import axios from 'axios';   //  action that will make a fetch API (it is logged in?)
import { FETCH_USER } from './types';

// action creator 1  // que o authReducer consome ->"switch ... case FETCH_USER"
export const fetchUser = () => async dispatch => {      // App component despara dispatch
    const res = await axios.get('/api/current_user');    // axios Ajax vai verificar se logged in

        // dispatch altera o redux state
        dispatch({ type: FETCH_USER, payload: res.data });  // só interessa .data of response (axios)
    };

// action creator 2
export const handleToken = (token) => async dispatch => {
    const res = await axios.post('/api/stripe', token);

    // dispatch altera o redux state
    dispatch({ type: FETCH_USER, payload: res.data });
};