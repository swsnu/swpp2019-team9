import React from 'react';
import { shallow } from 'enzyme';
import ColumnChart from '../Chart/ColumnChart';

//const mockStore = getMockStore({},{});

describe('ColumnChart', () => {

    it('should render', () => {
        const component = shallow(<ColumnChart/>);
        expect(component.find('.ColumnChart').length).toBe(1);
    });


});