import React from 'react';
import { shallow } from 'enzyme';
import PieChart from '../Chart/PieChart';

//const mockStore = getMockStore({},{});

describe('PieChart', () => {

    it('should render', () => {
        const component = shallow(<PieChart/>);
        expect(component.find('.PieChart').length).toBe(1);
    });


});