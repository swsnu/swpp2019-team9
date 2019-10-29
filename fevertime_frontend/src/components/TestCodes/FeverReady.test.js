import React from 'react';
import { shallow, mount } from 'enzyme';
import { Provider } from 'react-redux';
import * as FeverReady from '../FeverReady';
import { getMockStore } from '../../test-utils/mocks';

import { history } from '../../store/store';
import {ConnectedRouter} from "connected-react-router";
import * as actionCreator from "../../store/actions/fever";

const mockStore = getMockStore({},{});

describe('FeverReady', () => {
    let feverReady;
    let spy1 =jest.spyOn(FeverReady.default.WrappedComponent.prototype, 'timerStart');
    let spy2 =jest.spyOn(FeverReady.default.WrappedComponent.prototype, 'timerAction');


    afterEach(() => {
        spy1.mockClear();
        spy2.mockClear();
    })

    beforeEach(() => {
        feverReady = (
            <Provider store={mockStore}>
                <ConnectedRouter history={history}>
                    <FeverReady.default/>
                </ConnectedRouter>
            </Provider>
        );
    })
    it('should render', () => {
        const spypostFeverHistory = jest.spyOn(actionCreator, 'postFeverHistory')
            .mockImplementation((cat,etcCat) => { return dispatch => {}; });
        jest.useFakeTimers();
        const originalError = console.error;
        const error = jest.fn()
        console.error = error;
        const component = mount(feverReady);
        expect(component.find('.FeverReady').length).toBe(1);
        expect(error).toHaveBeenCalledWith("Warning: unstable_flushDiscreteUpdates: Cannot flush updates when React is already rendering.%s", expect.any(String));
        console.error = originalError;

        jest.advanceTimersByTime(2000);
        expect(spy1).toHaveBeenCalled();
        expect(spy2).toHaveBeenCalled();
        jest.advanceTimersByTime(10000);

        expect(spypostFeverHistory).toHaveBeenCalled();

        // const componentWillUnmount =jest.spyOn(FeverReady.default.WrappedComponent.prototype, 'componentWillUnmount');
        // component.unmount();
        // expect(componentWillUnmount).toHaveBeenCalled();

    });

    it(`should call 'putFeverHistory'`, () => {
        const spypostFeverHistory = jest.spyOn(actionCreator, 'postFeverHistory')
            .mockImplementation(hid => { return dispatch => {}; });
        const component = mount(feverReady);
        const wrapper = component.find('#fever-ready-click-skip');
        wrapper.simulate('click');
        expect(spypostFeverHistory).toHaveBeenCalled();
    });

});