import * as types from '../actions/actionTypes';

// 초기 상태를 정의합니다.
const initialState = {
    selectedCategory:'',
    goalTime:'',
    etcCategory:'',
    hid : 0,
    total_time : '',
    fever_time : '',
    fever_rate : 0,
    face_detect : false,
    phone_detect : false,
    num_fevers : 0,
    last_hid : 0
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
        case types.FEVER_PROGRESS_POST:
            return {...state,
                face_detect:action.face_detect,
                phone_detect:action.phone_detect,
            };
        case types.CLICK_DETECT_ALARM_POPUP_CLOSE:
            return {...state,
                phone_detect:action.phone_detect,
            };
        case types.FEVER_EXCEPTION_GET:
            return {...state,
                last_hid:action.last_hid,
                num_fevers:action.num_fevers
            };
        case types.FEVER_EXCEPTION_PUT:
            return {...state,
                last_hid:action.last_hid,
                hid:action.last_hid,
                goalTime:action.goalTime,
                num_fevers:action.num_fevers
            };
        case types.FEVER_EXCEPTION_CLOSE:
            return {...state,
                num_fevers:action.num_fevers
            };
        default:
            break
    }
    return state
}

export default feverStart;