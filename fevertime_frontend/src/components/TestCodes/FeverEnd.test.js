import React from 'react';
import { shallow, mount } from 'enzyme';
import { Provider } from 'react-redux';
import FeverEnd from '../FeverEnd';
import { getMockStore } from '../../test-utils/mocks';

import { history } from '../../store/store';
import {ConnectedRouter} from "connected-react-router";

const mockStore = getMockStore({login : false});

describe('FeverEnd', () => {
    let feverend;
    beforeEach(() => {
        feverend = (
            <Provider store={mockStore}>
                <ConnectedRouter history={history}>
                    <FeverEnd/>
                </ConnectedRouter>
            </Provider>
        );
    })
    it('should render', () => {
        const component = mount(feverend);
        expect(component.find('.FeverEnd').length).toBe(1);
    });


});