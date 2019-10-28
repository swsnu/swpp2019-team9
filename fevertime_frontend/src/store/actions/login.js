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
                dispatch(push('/fevermode'));
            })
            .catch(error=>{
                console.log(error)//have to define
            })
    };
};

export const logoutUser_ = (user) => {
    return { 
        type: actionTypes.LOGOUT,
    };
};
export const logoutUser = () => {
    return dispatch => {
        return axios.get('/api/user/signout/')
            .then(res => {
                dispatch(logoutUser_());
                dispatch(push('/'));
            })
            .catch(error=>{
                console.log(error)//have to define
            })
    };
};

export const getUserInfo_ = (user) => {
    return { 
        type: actionTypes.GET_USER_INFO, 
        uid: user.id,
        username: user.username,
        nickname: user.nickname,
    };
};
export const getUserInfo = (user) => {
    return dispatch => {
        return axios.get('/api/user/',user)
            .then(res => {
                if(res.status===200)
                    dispatch(getUserInfo_(res.data));
                else if(res.status===204)
                    dispatch(getUserInfo_({id:null,username:null,nickname:null}))
            })
    };
};
