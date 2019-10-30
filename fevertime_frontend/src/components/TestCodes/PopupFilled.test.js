import React from 'react';
import { mount } from 'enzyme';
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