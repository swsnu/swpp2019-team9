import * as types from '../actions/actionTypes';

// 초기 상태를 정의합니다.
const initialState = {
    uid:null,
    username:null,
    nickname:null,
};

const login =  (state = initialState, action) => {

    switch(action.type) {
        case types.LOGIN:
            return {...state, uid:action.uid, username:action.username, nickname: action.nickname};
        
        case types.GET_USER_INFO:
            return {...state, uid:action.uid, username:action.username, nickname: action.nickname};
        
        case types.LOGOUT:
            return {...state, uid:null,username:null,nickname:null}
        default:
            break;
    }
    return state;

}

export default login;