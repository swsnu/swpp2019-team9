import React from 'react';
import ReactDOM from 'react-dom';
import { shallow, mount } from 'enzyme';
import { Provider } from 'react-redux';
import * as FeverMode from '../FeverMode';
import { getMockStore } from '../../test-utils/mocks';

import { history } from '../../store/store';
import {ConnectedRouter} from "connected-react-router";
const stubInitialState = {
    selectedCategory: '',
    goalTime: "00:10:00",
    etcCategory: '',
};
const mockStore = getMockStore({stubInitialState});

describe('FeverMode', () => {
    let feverMode;
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
        const component = mount(feverMode);
        expect(component.find('#FeverMode').length).toBe(1);
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


});