import * as types from '../actions/actionTypes';

// 초기 상태를 정의합니다.
const initialState = {
    selectedCategory:'',
    goalTime:0,
    etcCategory:'',
};

const feverStart =  (state = initialState, action) => {
    switch(action.type) {
        case types.FEVERSTART:
            return {...state,
                selectedCategory:action.selectedCategory,
                goalTime:action.goalTime,
                etcCategory:action.etcCategory,
            };

        default:
            break
    }
    return state
}

export default feverStart;