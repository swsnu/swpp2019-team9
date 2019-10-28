import React from 'react';
import { shallow, mount } from 'enzyme';
import { Provider } from 'react-redux';
import FeverReady from '../FeverReady';
import { getMockStore } from '../../test-utils/mocks';

import { history } from '../../store/store';
import {ConnectedRouter} from "connected-react-router";

const mockStore = getMockStore({},{});

describe('FeverReady', () => {
    let feverready;
    beforeEach(() => {
        feverready = (
            <Provider store={mockStore}>
                <ConnectedRouter history={history}>
                    <FeverReady/>
                </ConnectedRouter>
            </Provider>
        );
    })
    it('should render', () => {
        const originalError = console.error;
        const error = jest.fn()
        console.error = error;
        const component = mount(feverready);
        expect(component.find('.FeverReady').length).toBe(1);
        expect(error).toHaveBeenCalledWith("Warning: unstable_flushDiscreteUpdates: Cannot flush updates when React is already rendering.%s", expect.any(String));
        console.error = originalError;
    });


});