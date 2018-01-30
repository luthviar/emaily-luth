import axios from 'axios';
import { FETCH_USER } from './types';

export const fetchUser = () => async dispatch => {
    //after this request axios requested, then return dispatch
    const res = await axios.get('/api/current_user');
    dispatch({ type: FETCH_USER, payload:res.data });
};