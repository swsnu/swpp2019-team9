import React from 'react';
import { mount } from 'enzyme';
import { Provider } from 'react-redux';
import FeverStart from '../FeverStart';
import { getMockStore } from '../../test-utils/mocks';

import { history } from '../../store/store';
import {ConnectedRouter} from "connected-react-router";




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
        component.find("#study-radio").simulate('change')
        component.find("#work-radio").simulate('change')
        component.find("#read-radio").simulate('change')
        component.find("#etc-radio").simulate('change')
        component.find("#etc-text").simulate('change',{target:{value:selectedETC}})
        const FeverStartInstance = component.find(FeverStart.WrappedComponent).instance();
        expect(FeverStartInstance.state.goalTime).not.toEqual(goal)
        FeverStartInstance.setState({goalTime:goal})
        expect(FeverStartInstance.state.goalTime).toEqual(goal)
        //component.find("#start-button").simulate('click')
        //expect(history.push).toHaveBeenCalledTimes(1)
        //how to mock history.push??
    })
    it('should give alert',()=>{
        const goal='01:10';
        const component = mount(feverStart)
        component.find("#etc-radio").simulate('change')
        const FeverStartInstance = component.find(FeverStart.WrappedComponent).instance();
        FeverStartInstance.setState({goalTime:goal})
        component.find("#start-button").simulate('click')
        expect(global.alert).toHaveBeenCalledTimes(1)
    })
    

});