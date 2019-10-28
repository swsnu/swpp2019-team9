import React from 'react';
import { shallow, mount } from 'enzyme';
import { Provider } from 'react-redux';
import StackedColumnChart from '../Chart/StackedColumnChart';
import { getMockStore } from '../../test-utils/mocks';

import { history } from '../../store/store';
import {ConnectedRouter} from "connected-react-router";

const mockStore = getMockStore({},{});

describe('FeverEnd', () => {

    it('should render', () => {
        const component = shallow(<StackedColumnChart/>);
        expect(component.find('.StackedColumnChart').length).toBe(1);
    });


});