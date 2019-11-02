import React from 'react';
import { mount } from 'enzyme';
import PopUpMessage from '../component/PopupMessage';



describe('PopUpMessage', () => {
    let popupMessage;
    beforeEach(() => {
        popupMessage = (
            <PopUpMessage isSuccess={false}/>
        );
    })
    it('should render', () => {
        const component = mount(popupMessage);
        expect(component.find('.PopupMessage').length).toBeGreaterThan(1);
    });

    it('should render2', () => {
        popupMessage = (
            <PopUpMessage isSuccess={true}/>
        );
        const component = mount(popupMessage);
        expect(component.find('.PopupMessage').length).toBeGreaterThan(1);
    });

});