import React from 'react';
import { shallow, mount } from 'enzyme';
import { Provider } from 'react-redux';
import FeverStart from '../FeverStart';
import { getMockStore } from '../../test-utils/mocks';

import { history } from '../../store/store';
import {ConnectedRouter} from "connected-react-router";
import TimeField from 'react-simple-timefield';
import * as feverAction from '../../store/actions/fever';




const stubInitialUser = {
    uid:1,
    username: 'test',
    nickname:'test',
}
const mockStore = getMockStore(stubInitialUser,{});

global.alert=jest.fn();

describe('FeverStart', () => {
    let feverStart;
    beforeEach(() => {
        feverStart = (
            <Provider store={mockStore}>
                <ConnectedRouter history={history}>
                    <FeverStart/>
                </ConnectedRouter>
            </Provider>
        );
    })
    it('should render', () => {
        const component = mount(feverStart);
        expect(component.find('.FeverStart').length).toBe(1);
    });
    
    it('should set category, goal time',()=>{
        history.push=jest.fn()
        const goal='01:10';
        const selectedETC = 'testetc'
        const component = mount(feverStart)
        const button = component.find("#study-radio").simulate('change')
        const button2 = component.find("#work-radio").simulate('change')
        const button3 = component.find("#read-radio").simulate('change')
        const button4 = component.find("#etc-radio").simulate('change')
        component.find("#etc-text").simulate('change',{target:{value:selectedETC}})
        const FeverStartInstance = component.find(FeverStart.WrappedComponent).instance();
        expect(FeverStartInstance.state.goalTime).not.toEqual(goal)
        FeverStartInstance.setState({goalTime:goal})
        expect(FeverStartInstance.state.goalTime).toEqual(goal)
        //component.find("#start-button").simulate('click')
        //expect(history.push).toHaveBeenCalledTimes(1)
    })
    it('should give alert',()=>{
        const goal='01:10';
        const selectedETC = 'testetc'
        const component = mount(feverStart)
        const button4 = component.find("#etc-radio").simulate('change')
        const FeverStartInstance = component.find(FeverStart.WrappedComponent).instance();
        component.find("#start-button").simulate('click')
        expect(global.alert).toHaveBeenCalledTimes(1)
    })

});