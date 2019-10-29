import axios from 'axios';

import * as feverAction from '../../store/actions/fever';
import store from '../../store/store';

const stubhistory={
    id: 1,
};

describe('ActionCreators', () => {
    afterEach(() => {
        jest.clearAllMocks();
    })
    it('get history id', (done) => {
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
    
});