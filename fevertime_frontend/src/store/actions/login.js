import * as actionTypes from './actionTypes';
import { push } from 'connected-react-router';
import axios from 'axios'
import * as feverActionCreators from './fever';

export const loginUser_ = (user) => {
    return { 
        type: actionTypes.LOGIN, 
        uid: user.id,
        username: user.username,
        nickname: user.nickname,
        showdata: user.showdata,
    };
};
export const loginUser = (user) => {
    return dispatch => {
        return axios.post('/api/user/signin/',user)
            .then(res => {
                dispatch(loginUser_(res.data));
                dispatch(feverActionCreators.getFeverException());
                dispatch(push('/feverstart'));

            })
            .catch(()=>{
            })
    };
};

export const ChangeMyAccount = (pkt) => {
    return dispatch => {
        return axios.put('/api/user/',pkt)
            .then(() => {
                dispatch({type:actionTypes.LOGOUT});
                dispatch(push('/login'));
            })
            .catch(()=>{
            })
    };
};

export const logoutUser_ = () => {
    return { 
        type: actionTypes.LOGOUT,
    };
};
export const logoutUser = () => {
    return dispatch => {
        return axios.get('/api/user/signout/')
            .then(() => {
                dispatch(logoutUser_());
                dispatch(push('/'));
            })
            .catch(()=>{})
    };
};

export const getUserInfo_ = (user) => {
    return { 
        type: actionTypes.GET_USER_INFO, 
        uid: user.id,
        username: user.username,
        nickname: user.nickname,
        showdata: user.showdata,
    };
};
export const getUserInfo = (user) => {
    return dispatch => {
        return axios.get('/api/user/',user)
            .then(res => {
                if(res.status===200)
                    dispatch(getUserInfo_(res.data));
                else if(res.status===204){
                    dispatch(getUserInfo_({id:null,username:null,nickname:null,showdata: null,}))
                    if(window.location.pathname !== '/signup' &&
                       window.location.pathname !== '/login' &&
                       window.location.pathname !== '/feverstart' &&
                       window.location.pathname !== '/'){  
                        dispatch(push('/login'));
                       }
                }
            })
    };
};
