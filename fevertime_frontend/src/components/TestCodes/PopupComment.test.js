import React from 'react';
import { mount } from 'enzyme';
import PopupComment from '../component/PopupComment';



describe('PopupComment', () => {
    let popupcomment;
    beforeEach(() => {
        popupcomment = (
            <PopupComment/>
        );
    })
    it('should render', () => {
        const component = mount(popupcomment);
        expect(component.find('.PopupComment').length).toBeGreaterThan(1);
    });


});