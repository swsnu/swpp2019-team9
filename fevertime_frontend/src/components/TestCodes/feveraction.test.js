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
    it('make new history', (done) => {
        axios.post = jest.fn(() => {
            return new Promise((resolve) => {
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
    it('make new history catch', (done) => {
        axios.post = jest.fn(() => {
            return new Promise((reject) => {

                reject({error:'error'});
            })
        });

        store.dispatch(feverAction.postFeverHistory()).then(() => {
            expect(axios.post).toHaveBeenCalledTimes(1);
            done();
        });
    });

    it('close history', (done) => {
        const stubres={
            id: 1,
            total_time : '',
            fever_time: '',
            fever_rate : 1
        };
        console.log = jest.fn();
        axios.put = jest.fn(() => {
            return new Promise((resolve, reject) => {
                const result = {
                    status: 200,
                    data: stubres
                };
                resolve(result);
                reject({error:'error'});
            })
        });

        store.dispatch(feverAction.putFeverHistory())
            .then(() => {
            expect(axios.put).toHaveBeenCalledTimes(1);
            done();
        });
    });

    it('close history catch', (done) => {
        console.log = jest.fn();
        axios.put = jest.fn(() => {
            return new Promise((reject) => {
                reject({error:'error'});
            })
        });

        store.dispatch(feverAction.putFeverHistory())
            .then(() => {
                expect(axios.put).toHaveBeenCalledTimes(1);
                done();
            });
    });

    it('post feverProgress ', (done) => {
        const stubres={
            face_detect: true,
            phone_detect : false
        };
        console.log = jest.fn();
        axios.post = jest.fn(() => {
            return new Promise((resolve) => {
                const result = {
                    status: 200,
                    data: stubres
                };
                resolve(result);
            })
        });

        store.dispatch(feverAction.postFeverProgress())
            .then(() => {
                expect(axios.post).toHaveBeenCalledTimes(1);
                done();
            });

    });

    it('post feverProgress catch', (done) => {
        console.log = jest.fn();
        axios.post = jest.fn(() => {
            return new Promise((reject) => {
                reject({error:'error'});
            })
        });

        store.dispatch(feverAction.postFeverProgress())
            .then(() => {
                expect(axios.post).toHaveBeenCalledTimes(1);
                done();
            });

    });

    it('click DetectAlarmPopup Close', () => {
        const spyclickDetectAlarmPopupClose = jest.spyOn(feverAction, 'clickDetectAlarmPopupClose');
        store.dispatch(feverAction.clickDetectAlarmPopupClose());
        expect(spyclickDetectAlarmPopupClose).toHaveBeenCalled();
    });

});