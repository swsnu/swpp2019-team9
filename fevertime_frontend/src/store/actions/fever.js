import * as actionTypes from './actionTypes';
import { push } from 'connected-react-router';
import axios from 'axios'

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

export const putFeverHistory_ = (data) => {
    return {
        type: actionTypes.FEVER_HISTORY_PUT,
        hid: data.id,
        total_time: data.total_time,
        fever_time: data.fever_time,
        fever_rate: data.fever_rate,
    };
};

export const putFeverHistory = (hid) => {
    return dispatch => {
        return axios.put('/api/fever_history/',{
            id : hid
        })
            .then(res => {
                dispatch(putFeverHistory_(res.data));
                dispatch(push('/feverend'));
            })
            .catch(error=>{
                console.log(error)//have to define
            })
    };
};