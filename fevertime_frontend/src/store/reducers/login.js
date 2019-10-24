import * as types from '../actions/actionTypes';

// 초기 상태를 정의합니다.
const initialState = {
    login: false,

};

const login =  (state = initialState, action) => {

    switch(action.type) {
        // case types.LOGIN:
        //     return {...state,login:true};

        default:
            break;
    }
    return state;

}

export default login;