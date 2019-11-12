import * as types from '../actions/actionTypes';

// 초기 상태를 정의합니다.
const initialState = {
    uid:null,
    username:null,
    nickname:null,
    showdata:null,
};

const login =  (state = initialState, action) => {

    switch(action.type) {
        case types.LOGIN:
            return {...state, uid:action.uid, username:action.username, nickname: action.nickname,showdata:action.showdata};
        
        case types.GET_USER_INFO:
            return {...state, uid:action.uid, username:action.username, nickname: action.nickname, showdata:action.showdata};
        
        case types.LOGOUT:
            return {...state, uid:null,username:null,nickname:null,showdata:null}
        default:
            break;
    }
    return state;

}

export default login;