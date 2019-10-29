import axios from 'axios';

import * as feverAction from '../../store/actions/fever';
import store from '../../store/store';

const stubhistory={
    id: 1,
};
const stubPuthistory={
    id: 1,
    total_time: 1,
    fever_time: 1,
    fever_rate: 1,
};

describe('ActionCreators', () => {
    afterEach(() => {
        jest.clearAllMocks();
    })
    it('make new history', (done) => {
        axios.post = jest.fn(url => {
            return new Promise((resolve, reject) => {
                const result = {
                    status: 200,
                    data: stubhistory
                };
                resolve(result);
            })
        });

        store.dispatch(feverAction.postFeverHistory()).then(() => {
            expect(axios.post).toHaveBeenCalledTimes(1);
            done();
        });
    });

    it('close history', (done) => {
        console.log = jest.fn();
        axios.put = jest.fn(url => {
            return new Promise((resolve, reject) => {
                const result = {
                    status: 200,
                    data: stubhistory
                };
                resolve(result);
            })
        });

        store.dispatch(feverAction.putFeverHistory())
            .then(() => {
            expect(axios.put).toHaveBeenCalledTimes(1);
            done();
        });
    });
    
});