import React from 'react';
import { mount } from 'enzyme';
import { Provider } from 'react-redux';
import * as Main from '../Main';
import { getMockStore } from '../../test-utils/mocks';

import { history } from '../../store/store';
import {ConnectedRouter} from "connected-react-router";
import axios from "axios";


const stubInitialUser = {
    uid:1,
    username: 'test',
    nickname:'test',
}

const mockStore = getMockStore(stubInitialUser,{});
describe('Main', () => {
    let main;
    beforeEach(() => {
        main = (
            <Provider store={mockStore}>
                <ConnectedRouter history={history}>
                    <Main.default/>
                </ConnectedRouter>
            </Provider>
        );


    })
    it('should render', () => {
        axios.get = jest.fn(() => {
            return new Promise((resolve) => {
                const result = {
                    status: 200,
                    data: [{name : 'abc', fever_time: '00:30'},
                        {name : 'def', fever_time: '00:20'},
                        {name : 'hij', fever_time: '00:10'}
                    ]
                };
                resolve(result);
            })
        })
        const component = mount(main);
        expect(component.find('.Main').length).toBe(1);
        expect(axios.get).toHaveBeenCalled();
        expect(component.find('.badge-custom-main').length).toBe(0);
    });
});
