import React from 'react';
import { mount } from 'enzyme';
import PopupComment from '../component/PopupComment';



describe('PopupComment', () => {
    let PopupComment;
    beforeEach(() => {
        popupFilled = (
            <PopupComment/>
        );
    })
    it('should render', () => {
        const component = mount(PopupComment);
        expect(component.find('.PopupComment').length).toBeGreaterThan(1);
    });


});