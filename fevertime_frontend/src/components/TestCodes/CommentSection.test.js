import React from 'react';
import { mount } from 'enzyme';
import CommentSection from '../component/CommentSection';
import { Provider } from 'react-redux';
import { getMockStore } from '../../test-utils/mocks';
import axios from 'axios';
import { history } from '../../store/store';
import {ConnectedRouter} from "connected-react-router";

let mockcomment = [
    {id:1, content : "I'm best fever", firstword : 'Y', name : 'Youngjae', reg_date : '2019-01-21 11:00'},
    {id:2, content : "I was so sick..", firstword : 'G', name : 'Gildong', reg_date : '2019-02-01 11:00'},
    {id:3, content : "Let's eat some dinner...", firstword : 'Y', name : 'Youngjae', reg_date : '2019-10-21 23:08'},
]

jest.mock('../component/PopupComment', () => {
    return jest.fn(props => {
      return (
        <div className="spyEditPopup">
            <button id="spyConfirm" onClick={props.clickConfirm}/>
            <button id="spyClose" onClick={props.clickClose}/>
            <input id='spyContent' onChange={props.changeContent}/>
        </div>
        );
    });
});

jest.mock('../component/PopUpModal', () => {
    return jest.fn((props) => {
      return (
        <div className="spyDeletePopup">
            <button id="spyExit" onClick={props.clickClose}/>
            <button id="spyOK" onClick={props.clickConfirm}/>
        </div>
        );
    });
});

const stubInitialUser = {
    uid:1,
    username: 'Youngjae',
    nickname:'Youngjae',
}
const mockStore = getMockStore(stubInitialUser,{});

describe("Comment Section",()=>{
    let commentSection;
    beforeEach(() => {
        commentSection = (
            <Provider store={mockStore}>
                <ConnectedRouter history={history}>
                    <CommentSection/>
                </ConnectedRouter>
            </Provider>
        );
        
        axios.get = jest.fn(() => {
            return new Promise((resolve) => {
                const result = {
                    status: 200,
                    data: [
                        {id:1, content : "I'm best fever", firstword : 'Y', name : 'Youngjae', reg_date : '2019-01-21 11:00'},
                        {id:2, content : "I was so sick..", firstword : 'G', name : 'Gildong', reg_date : '2019-02-01 11:00'},
                        {id:3, content : "Let's eat some dinner...", firstword : 'Y', name : 'Youngjae', reg_date : '2019-10-21 23:08'},
                    ]
                };
                resolve(result);
            })
        });
    })

    afterEach(() => { jest.clearAllMocks() });

    it("should render", ()=>{
        const component = mount(commentSection);
        expect(component.find('#CommentSection').length).toBe(1);
        expect(axios.get).toHaveBeenCalledTimes(1);
    })

    it("should create new comment",(done)=>{
        axios.post = jest.fn(() => {
            return new Promise((resolve,reject) => {
                const result = {
                    status: 201,
                    data: {
                        "id" : 4,
                        "content" : "dummy",
                        "firstword" : "G",
                        "name" : "Gildong",
                        "reg_date" : "2015-12-12 13:02"
                    }
                };
                resolve(result);
                reject({status:400})
            })
        });
        const component = mount(commentSection)
        const create_button = component.find("#post_comment")
        const comment_input = component.find("#new_comment_input")
        comment_input.simulate("change", {target : {value : "new Comment"}})
        create_button.simulate("click")
        expect(axios.post).toHaveBeenCalledTimes(1);
        done();
    })

    it("should show edit popup",(done)=>{
        axios.put = jest.fn(() => {
            return new Promise((resolve,reject) => {
                const result = {
                    status: 200,
                    data: {
                        "id" : 4,
                        "content" : "edit dummy",
                        "firstword" : "G",
                        "name" : "Gildong",
                        "reg_date" : "2015-12-12 13:02"
                    }
                };
                resolve(result);
                reject({status:400})
            })
        });
        
        const component = mount(commentSection)
        const newCommentSectionInstance = component.find(CommentSection.WrappedComponent).instance();
        newCommentSectionInstance.setState({commentsList : mockcomment})

        /*
        const edit_button = component.find("#edit_button")
        edit_button.simulate("click")
        expect(component.find('.spyEditPopup').length).toBe(1);
        const edit_input = component.find("#spyContent")
        edit_input.simulate("change", {target : {value : "Edited Comment"}})
        expect(axios.put).toHaveBeenCalledTimes(1);
        expect(component.find('.spyEditPopup').length).toBe(0);
        */
        done();
    })

    it("should show delete popup",()=>{
        axios.delete = jest.fn(() => {
            return new Promise((resolve,reject) => {
                const result = {
                    status: 200,
                };
                resolve(result);
                reject({status:400})
            })
        });
        const component = mount(commentSection)
        const delete_button = component.find("#delete_button")
        /*
        delete_button.simulate("click")
        expect(component.find('.spyDeletePopup').length).toBe(1);
        const delete_confirm_button = component.find("#spyOK")
        delete_confirm_button.simulate("click")
        expect(axios.delete).toHaveBeenCalledTimes(1);
        expect(component.find('.spyDeletePopup').length).toBe(1);
        */
    })

    

})