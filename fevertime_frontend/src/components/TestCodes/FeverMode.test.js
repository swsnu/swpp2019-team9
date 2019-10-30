import React from 'react';
import { mount } from 'enzyme';
import { Provider } from 'react-redux';
import * as FeverMode from '../FeverMode';
import { getMockStore } from '../../test-utils/mocks';

import { history } from '../../store/store';
import {ConnectedRouter} from "connected-react-router";
import * as actionCreator from "../../store/actions/fever";
const stubInitialState = {
    selectedCategory: '',
    goalTime: "00:10:00",
    etcCategory: '',
};
const mockStore = getMockStore({},{stubInitialState});

describe('FeverMode', () => {
    let feverMode;
    let spy1 =jest.spyOn(FeverMode.default.WrappedComponent.prototype, 'timerStart');
    let spy2 =jest.spyOn(FeverMode.default.WrappedComponent.prototype, 'timerAction');
    let spy3 =jest.spyOn(FeverMode.default.WrappedComponent.prototype, 'timesSetter');
    let spy4 =jest.spyOn(FeverMode.default.WrappedComponent.prototype, 'capture');

    afterEach(() => {
        spy1.mockClear()
        spy2.mockClear()
        spy3.mockClear()
        spy4.mockClear()
    })
    beforeEach(() => {
        feverMode = (
            <Provider store={mockStore}>
                <ConnectedRouter history={history}>
                    <FeverMode.default/>
                </ConnectedRouter>
            </Provider>
        );
    })
    it('should render', () => {
        jest.useFakeTimers();
        const component = mount(feverMode);
        expect(component.find('#FeverMode').length).toBe(1);
        jest.advanceTimersByTime(60000);
        expect(spy1).toHaveBeenCalled();
        expect(spy2).toHaveBeenCalled();
        expect(spy3).toHaveBeenCalled();
        expect(spy4).toHaveBeenCalled();
        const componentWillUnmount =jest.spyOn(FeverMode.default.WrappedComponent.prototype, 'componentWillUnmount');
        component.unmount();
        expect(componentWillUnmount).toHaveBeenCalled();

    });

    it(`should check fevermode-alarm-checkbox`, () => {

        const component = mount(feverMode);
        const wrapper1 = component.find('#fevermode-alarm-checkbox');
        // const wrapper1 = component.find('#pop-modal-click-confirm');
        // const wrapper2 = component.find('#pop-modal-click-close');
        wrapper1.simulate('change', { target: { checked: true } });
        const newFeverModeInstance = component.find(FeverMode.default.WrappedComponent).instance();
        expect(newFeverModeInstance.state.showAlarmPopup).toEqual(true);
        expect(newFeverModeInstance.state.showAlarm).toEqual(true);

        const wrapper2 = component.find('#pop-modal-click-close').at(0);
        wrapper2.simulate('click');
        const newFeverModeInstance2 = component.find(FeverMode.default.WrappedComponent).instance();
        expect(newFeverModeInstance2.state.showAlarmPopup).toEqual(false);
        expect(newFeverModeInstance2.state.showAlarm).toEqual(false);

        const wrapper3 = component.find('#pop-modal-click-confirm').at(0);
        wrapper3.simulate('click');
        const newFeverModeInstance3 = component.find(FeverMode.default.WrappedComponent).instance();
        expect(newFeverModeInstance3.state.showAlarmPopup).toEqual(false);
        expect(newFeverModeInstance3.state.showAlarm).toEqual(true);

    });

    it(`should check fevermode-alarm-checkbox`, () => {
        const component = mount(feverMode);
        const wrapper1 = component.find('#fevermode-show-camera-checkbox');
        // const wrapper1 = component.find('#pop-modal-click-confirm');
        // const wrapper2 = component.find('#pop-modal-click-close');
        wrapper1.simulate('change', { target: { checked: true } });
        const newFeverModeInstance = component.find(FeverMode.default.WrappedComponent).instance();
        expect(newFeverModeInstance.state.showCamera).toEqual(true);

    });

    it(`should call 'putFeverHistory'`, () => {
        const spyputFeverHistory = jest.spyOn(actionCreator, 'putFeverHistory')
            .mockImplementation(() => { return () => {}; });
        const component = mount(feverMode);
        const wrapper = component.find('#fever-mode-click-end');
        wrapper.simulate('click');
        expect(spyputFeverHistory).toBeCalledTimes(1);
    });


});