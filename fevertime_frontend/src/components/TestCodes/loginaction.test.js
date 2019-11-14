import axios from 'axios';

import * as loginAction from '../../store/actions/login';
import store from '../../store/store';

const stubUser={
    id: 1,
    username: "testid",
    password: "testpw",
    nickname: "testnick",
};
const stubUserGet={
    id: null,
    username: null,
    nickname: null,
};

describe('ActionCreators', () => {
    afterEach(() => {
        jest.clearAllMocks();
    })
    it('login user', (done) => {
        axios.post = jest.fn(() => {
            return new Promise((resolve) => {
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
    /*
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
    */
   //handle later
    it('get user logged in', (done) => {
        axios.get = jest.fn(() => {
            return new Promise((resolve) => {
                const result = {
                    status: 200,
                    data: stubUser
                };
                resolve(result);
            })
        });

        store.dispatch(loginAction.getUserInfo()).then(() => {
            expect(axios.get).toHaveBeenCalledTimes(1);
            done();
        });
    });
    it('get user not logged in', (done) => {
        axios.get = jest.fn(() => {
            return new Promise((resolve) => {
                const result = {
                    status: 204,
                    data: stubUserGet
                };
                resolve(result);
            })
        });
        store.dispatch(loginAction.getUserInfo()).then(() => {
            expect(axios.get).toHaveBeenCalledTimes(1);  
            done();
        });
    });

    it('call history push ', (done) => {
        axios.get = jest.fn(() => {
            return new Promise((resolve) => {
                const result = {
                    status: 204,
                    data: stubUserGet
                };
                resolve(result);
            })
        });
        global.window = Object.create(window);
        Object.defineProperty(window, 'location', {
            value: {
                pathname: 'a'
            }
        });
        store.dispatch(loginAction.getUserInfo()).then(() => {
            expect(axios.get).toHaveBeenCalledTimes(1);  
            done();
        });
    });
    it('get user not logged in2', (done) => {
        axios.get = jest.fn(() => {
            return new Promise((resolve) => {
                const result = {
                    status: 204,
                };
                resolve(result);
            })
        });
        store.dispatch(loginAction.getUserInfo()).then(() => {
            expect(axios.get).toHaveBeenCalledTimes(1);  
            done();
        });
    });

    it('logout user', (done) => {
        axios.get = jest.fn(() => {
            return new Promise((resolve) => {
                const result = {
                    status: 200,
                    data: stubUser
                };
                resolve(result);
            })
        });

        store.dispatch(loginAction.logoutUser()).then(() => {
            expect(axios.get).toHaveBeenCalledTimes(1);
            done();
        });
    });
    
    it('change user info', (done) => {
        axios.put = jest.fn(() => {
            return new Promise((resolve) => {
                const result = {
                    status: 200,
                    data: stubUser
                };
                resolve(result);
            })
        });

        store.dispatch(loginAction.ChangeMyAccount()).then(() => {
            expect(axios.put).toHaveBeenCalledTimes(1);
            done();
        });
    });
});