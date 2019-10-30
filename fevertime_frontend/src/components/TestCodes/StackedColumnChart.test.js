import React from 'react';
import { shallow } from 'enzyme';
import StackedColumnChart from '../Chart/StackedColumnChart';

//const mockStore = getMockStore({},{});

describe('FeverEnd', () => {

    it('should render', () => {
        const component = shallow(<StackedColumnChart/>);
        expect(component.find('.StackedColumnChart').length).toBe(1);
    });


});