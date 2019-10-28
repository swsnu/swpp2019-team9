import * as actionTypes from './actionTypes';
import { push } from 'connected-react-router';
import axios from 'axios'
import { history } from '../store';

export const loginUser_ = (user) => {
    return { 
        type: actionTypes.LOGIN, 
        uid: user.id,
        username: user.username,
        nickname: user.nickname,
    };
};
export const loginUser = (user) => {
    return dispatch => {
        return axios.post('/api/user/signin/',user)
            .then(res => {
                dispatch(loginUser_(res.data));
                dispatch(push('/fevertime'));
            })
            .catch(error=>{
                console.log(error)//have to define
            })
    };
};

export const getUserInfo_ = (user) => {
    return { 
        type: actionTypes.LOGIN, 
        uid: user.id,
        username: user.username,
        nickname: user.nickname,
    };
};
export const getUserInfo = (user) => {
    return dispatch => {
        return axios.post('/api/user/',user)
            .then(res => {
                dispatch(getUserInfo_(res.data));
            })
            .catch(error=>{
                console.log(error)//have to define
            })
    };
};
