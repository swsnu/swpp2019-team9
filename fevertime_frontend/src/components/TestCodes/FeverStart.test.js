import React from 'react';
import { mount } from 'enzyme';
import { Provider } from 'react-redux';
import FeverStart from '../FeverStart';
import { getMockStore } from '../../test-utils/mocks';

import { history } from '../../store/store';
import {ConnectedRouter} from "connected-react-router";

jest.mock('../component/PopupMessage', () => {
    return jest.fn((props) => {
        return (
            <div className="spyLoginMessage">
                <button id="spyExit" onClick={props.clickClose}/>
            </div>
        );
    });
});


const stubInitialUser = {
    uid:1,
    username: 'test',
    nickname:'test',
}
const mockStore = getMockStore(stubInitialUser,{});

global.alert=jest.fn();

describe('FeverStart', () => {
    let feverStart;
    //let spy1=jest.spyOn(FeverStart.WrappedComponent.prototype);
    //let spy2

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

    it('should select category, goal, etcCategory and give reject',()=>{
        history.push=jest.fn()
        const goal='01:10';
        const selectedETC = 'testetc'
        const component = mount(feverStart)

        component.find("#start-button").simulate('click')
        const newFeverStartInstance8 = component.find(FeverStart.WrappedComponent).instance();
        expect(newFeverStartInstance8.state.showAlarmMessage).toEqual(true);
        component.find("#spyExit").simulate('click')
        expect(component.find('.FeverStart').length).toBe(1);

        component.find("#id-input").simulate('change', {target:{value:goal}});
        component.find("#start-button").simulate('click')
        const newFeverStartInstance = component.find(FeverStart.WrappedComponent).instance();
        expect(newFeverStartInstance.state.showAlarmMessage).toEqual(true);
        component.find("#spyExit").simulate('click')


        component.find("#study-radio").simulate('change')
        const newFeverStartInstance2 = component.find(FeverStart.WrappedComponent).instance();
        expect(newFeverStartInstance2.state.selectedCategory).toEqual('Study');


        component.find("#work-radio").simulate('change')
        const newFeverStartInstance3 = component.find(FeverStart.WrappedComponent).instance();
        expect(newFeverStartInstance3.state.selectedCategory).toEqual('Work');

        component.find("#read-radio").simulate('change')
        const newFeverStartInstance4 = component.find(FeverStart.WrappedComponent).instance();
        expect(newFeverStartInstance4.state.selectedCategory).toEqual('Read');

        component.find("#etc-radio").simulate('change')
        const newFeverStartInstance5 = component.find(FeverStart.WrappedComponent).instance();
        expect(newFeverStartInstance5.state.selectedCategory).toEqual('Etc.');

        component.find("#etc-text").simulate('change',{target:{value:selectedETC}})
        const newFeverStartInstance6 = component.find(FeverStart.WrappedComponent).instance();
        expect(newFeverStartInstance6.state.etcCategory).toEqual(selectedETC);
    })

    it('should select category, goal, etcCategory and give reject',()=> {
        history.push = jest.fn();
        const goal = '01:10';
        const selectedETC = 'testetc';
        const component = mount(feverStart);

        component.find("#id-input").simulate('change', {target:{value:goal}});
        component.find("#etc-radio").simulate('change');
        component.find("#etc-text").simulate('change',{target:{value:selectedETC}});
        component.find("#start-button").simulate('click');

        expect(history.push).toHaveBeenCalledTimes(1);
    })

});

