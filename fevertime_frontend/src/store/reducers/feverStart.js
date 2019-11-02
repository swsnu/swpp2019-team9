import * as types from '../actions/actionTypes';

// 초기 상태를 정의합니다.
const initialState = {
    selectedCategory:'',
    goalTime:'',
    etcCategory:'',
    hid : 0,
    total_time : '',
    fever_time : '',
    fever_rate : 0
};

const feverStart =  (state = initialState, action) => {
    switch(action.type) {
        case types.FEVERSTART:
            return {...state,
                selectedCategory:action.selectedCategory,
                goalTime:action.goalTime,
                etcCategory:action.etcCategory,
            };
        case types.FEVER_HISTORY_POST:
            return {...state,
                hid:action.hid
            };
        case types.FEVER_HISTORY_PUT:
            return {...state,
                hid:action.hid,
                total_time:action.total_time,
                fever_time:action.fever_time,
                fever_rate:action.fever_rate,
            };

        default:
            break
    }
    return state
}

export default feverStart;