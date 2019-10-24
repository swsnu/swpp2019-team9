import React from 'react';
import { shallow, mount } from 'enzyme';
import { Provider } from 'react-redux';
import PopupFilled from '../component/PopupFilled';



describe('PopupFilled', () => {
    let popupFilled;
    beforeEach(() => {
        popupFilled = (
            <PopupFilled/>
        );
    })
    it('should render', () => {
        const component = mount(popupFilled);
        expect(component.find('.PopupFilled').length).toBeGreaterThan(1);
    });


});