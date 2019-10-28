import React from 'react';
import { shallow, mount } from 'enzyme';
import { Provider } from 'react-redux';
import Friends from '../Friends';
import { getMockStore } from '../../test-utils/mocks';

import { history } from '../../store/store';
import {ConnectedRouter} from "connected-react-router";

const mockStore = getMockStore({login : false});

jest.mock('../component/PopUpFilled', () => {
    return jest.fn(props => {
      return (
        <div className="spyAddGroupPopup">
            <button id="spyConfirm" onClick={this.props.clickConfirm}/>
            <button id="spyClose" onClick={this.props.clickClose}/>
            <input id='spyContent' onChange={this.props.changeContent}/>
        </div>
        );
    });
});

describe('Friends', () => {
    let friends;
    beforeEach(() => {
        friends = (
            <Provider store={mockStore}>
                <ConnectedRouter history={history}>
                    <Friends/>
                </ConnectedRouter>
            </Provider>
        );
    })
    it('should render', () => {
        const component = mount(friends);
        expect(component.find('.Friends').length).toBe(1);
    });
});