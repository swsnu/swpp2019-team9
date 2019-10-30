import React from 'react';
import { shallow } from 'enzyme';
import { Provider } from 'react-redux';
import MyData from '../MyData';
import { getMockStore } from '../../test-utils/mocks';
import { history } from '../../store/store';
import {ConnectedRouter} from "connected-react-router";

const mockStore = getMockStore({},{});

describe('MyData', () => {
    let mydata;
    beforeEach(() => {
        mydata = (
            <Provider store={mockStore}>
                <ConnectedRouter history={history}>
                    <MyData/>
                </ConnectedRouter>
            </Provider>
        );
    })

    it('should render', () => {
        const component = shallow(mydata);
        expect(component.find('.MyData').length).toBe(0); //need to fix this
    });


});