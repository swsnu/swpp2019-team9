import * as actionTypes from './actionTypes';
import { push } from 'connected-react-router';
import axios from 'axios'
import { history } from '../store';

// export const onLogin_ = () => {
//     return { type: actionTypes.LOGIN, login: true };
// };
//
// export const onLogin = () => {
//     return dispatch => {
//         return axios.put('/api/user/1',
//             {id : 1,
//                 email : 'swpp@snu.ac.kr',
//                 password : 'iluvswpp',
//                 name : "Software Lover",
//                 logged_in : true,
//             })
//             .then(res => {
//                 dispatch(onLogin_());
//                 dispatch(push('/fevertime'));
//             })
//
//     };
// };
