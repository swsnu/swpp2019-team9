import axios from 'axios';

import * as loginAction from '../../store/actions/login';
import store from '../../store/store';

const stubUser={
    id: 1,
    username: "testid",
    password: "testpw",
    nickname: "testnick",
};

describe('ActionCreators', () => {
    afterEach(() => {
        jest.clearAllMocks();
    })
    it('login user', (done) => {
        axios.post = jest.fn(url => {
            return new Promise((resolve, reject) => {
                const result = {
                    status: 200,
                    data: stubUser
                };
                resolve(result);
            })
        });

        store.dispatch(loginAction.loginUser()).then(() => {
            expect(axios.post).toHaveBeenCalledTimes(1);
            done();
        });
    });
    it('get error', (done) => {
        axios.post = jest.fn(url => {
            return new Promise((resolve, reject) => {
                const result = {
                    status: 401,
                    data: null
                };
                resolve(result);
            })
        });

        store.dispatch(loginAction.loginUser()).then(() => {
            expect(axios.post).toHaveBeenCalledTimes(1);
            done();
        });
    });
});