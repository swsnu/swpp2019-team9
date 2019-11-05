import * as actionTypes from './actionTypes';
import { push } from 'connected-react-router';
import axios from 'axios'

export const postFeverHistory_ = (data) => {
    return {
        type: actionTypes.FEVER_HISTORY_POST,
        hid: data.id,
    };
};
export const postFeverHistory = (category, etcCategory, goalTime) => {
    return dispatch => {
        return axios.post('/api/fever_history/',{
            category : category,
            etcCategory : etcCategory,
            goalTime : goalTime
        })
            .then(res => {
                dispatch(postFeverHistory_(res.data));
                dispatch(push({
                    pathname: '/fevermode',
                    search: '?id='+res.data.id+'&goalTime='+goalTime}));
            })
            .catch(()=>{
                // console.log(error)//have to define
            })
    };
};

export const putFeverHistory_ = (data) => {
    return {
        type: actionTypes.FEVER_HISTORY_PUT,
        hid: data.id,
        total_time: data.total_time,
        fever_time: data.fever_time,
        fever_rate: Math.ceil(data.fever_rate*100),
    };
};

export const putFeverHistory = (hid) => {
    return dispatch => {
        return axios.put('/api/fever_history/',{
            id : hid
        })
            .then(res => {
                dispatch(putFeverHistory_(res.data));
                dispatch(push({
                    pathname: '/feverend',
                    search: '?total_time='+res.data.total_time
                        +'&fever_time='+res.data.fever_time
                        +'&fever_rate='+res.data.fever_rate}));
            })
            .catch(()=>{
                // console.log(error)//have to define
            })
    };
};

export const postFeverProgress_ = (data) => {
    return {
        type: actionTypes.FEVER_PROGRESS_POST,
        face_detect: data.face_detect,
        phone_detect: data.phone_detect,
    };
};
export const postFeverProgress = (hid, image) => {
    return dispatch => {
        return axios.post('/api/fever_progress/',{
            id : hid,
            image : image
        })
            .then(res => {
                console.log(res.data);
                dispatch(postFeverProgress_(res.data));
            })
            .catch(()=>{
                // console.log(error)//have to define
            })
    };
};

export const clickDetectAlarmPopupClose_ = () => {
    return {
        type: actionTypes.CLICK_DETECT_ALARM_POPUP_CLOSE,
        phone_detect: false,
    };
};
export const clickDetectAlarmPopupClose = () => {
    return dispatch =>{
        dispatch(clickDetectAlarmPopupClose_())
    }
};

export const getFeverException_ = (data) => {
    return {
        type: actionTypes.FEVER_EXCEPTION_GET,
        last_hid: data.last_hid,
        num_fevers: data.num_fevers,
    };
};

export const getFeverException = () => {
    return dispatch => {
        return axios.get('/api/fever_exception/')
            .then(res => {
                if(res.status === 200){ //login 되었고, 안끝낸게 존재할때
                    dispatch(getFeverException_(res.data));
                }
            })
            .catch(()=>{
                // console.log(error)//have to define
            })
    };
};

export const putFeverException_ = (data) => {
    return {
        type: actionTypes.FEVER_EXCEPTION_PUT,
        last_hid: data.hid,
        hid: data.hid,
        goalTime: data.goalTime,
        num_fevers: 0,
    };
};

export const putFeverException = (hid) => {
    return dispatch => {
        return axios.put('/api/fever_exception/',{
            id : hid
        })
            .then(res => {
                dispatch(putFeverException_(res.data));
                dispatch(push({
                    pathname: '/fevermode',
                    search: '?id='+res.data.hid+'&goalTime='+res.data.goalTime+'&prog_time='+res.data.prog_time}));
            })
            .catch(()=>{
                // console.log(error)//have to define
            })
    };
};

export const closeFeverException_ = () => {
    return {
        type: actionTypes.FEVER_EXCEPTION_CLOSE,
        num_fevers: 0,
    };
};
export const closeFeverException = () => {
    return dispatch =>{
        dispatch(closeFeverException_())
    }
};
