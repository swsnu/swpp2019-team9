import * as actionTypes from './actionTypes';
import { push } from 'connected-react-router';
import axios from 'axios'
import { history } from '../store';

export const postFeverHistory_ = (data) => {
    return {
        type: actionTypes.FEVER_HISTORY_POST,
        hid: data.id,
    };
};
export const postFeverHistory = (category, etcCategory) => {
    return dispatch => {
        return axios.post('/api/fever_history/',{
            category : category,
            etcCategory : etcCategory
        })
            .then(res => {
                dispatch(postFeverHistory_(res.data));
                dispatch(push('/fevermode'));
            })
            .catch(error=>{
                console.log(error)//have to define
            })
    };
};