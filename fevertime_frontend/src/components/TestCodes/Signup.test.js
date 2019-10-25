import React from 'react';
import { shallow, mount } from 'enzyme';
import { Provider } from 'react-redux';
import Signup from '../Signup';
import { getMockStore } from '../../test-utils/mocks';

import { history } from '../../store/store';
import {ConnectedRouter} from "connected-react-router";
import axios from "axios"

const mockStore = getMockStore({login : false});

axios.get = jest.fn(url => {
    return new Promise((resolve, reject) => {
      const result = {
        status: 200,
        data: stubCMs
      };
      resolve(result);
    })})

describe('Signup', () => {
    let signup;
    let ID = "ValidID"
    let Nickname = "Nick"
    let Password = "1234"
    let Password_C = "1234"

    beforeEach(() => {
        signup = (
            <Provider store={mockStore}>
                <ConnectedRouter history={history}>
                    <Signup/>
                </ConnectedRouter>
            </Provider>
        );
    })
    afterEach(() => { jest.clearAllMocks() });

    it('should render', () => {
        const component = mount(signup);
        expect(component.find('.Signup').length).toBe(1);
    });

    it("should take check Valid ID inputs", (done) => {
        axios.get = jest.fn(url => {
            return new Promise((resolve, reject) => {
              const result = {
                status: 200,
                data: true
              };
              resolve(result);
            })})
                
        const component = mount(signup);
        const ID_input = component.find('#ID_input');
        ID_input.simulate('change', { target: { value: ID } });
        component.find("#Signup_button").simulate("click");
        const newSignup = component.find(Signup).instance();
        expect(newSignup.state.WrongInput[0]).toEqual("");
        expect(axios.get).toHaveBeenCalledTimes(1);
        done();
    }); 
    
    it("should take check Invalid ID inputs", (done) => {
        axios.get = jest.fn(url => {
            return new Promise((resolve, reject) => {
              const result = {
                status: 200,
                data: false
              };
              resolve(result);
            })})
                
        const component = mount(signup);
        const ID_input = component.find('#ID_input');
        ID_input.simulate('change', { target: { value: ID } });
        component.find("#Signup_button").simulate("click");
        const newSignup = component.find(Signup).instance();
        expect(newSignup.state.WrongInput[0]).toEqual("ID Exist");
        expect(axios.get).toHaveBeenCalledTimes(1);
        done();
    });    

    it("should take check ID Deadserver", (done) => {
        axios.get = jest.fn(url => {
            return new Promise((resolve, reject) => {
              const result = {
                status: 404,
                data: false
              };
              resolve(result);
            })})
                
        const component = mount(signup);
        const ID_input = component.find('#ID_input');
        ID_input.simulate('change', { target: { value: ID } });
        component.find("#Signup_button").simulate("click");
        const newSignup = component.find(Signup).instance();
        expect(newSignup.state.WrongInput[0]).toEqual("Server Not responding");
        expect(axios.get).toHaveBeenCalledTimes(1);
        done();
    });

    it("should take check null Nickname", () => {
        const component = mount(signup);
        component.find("#Signup_button").simulate("click");
        const newSignup = component.find(Signup).instance();
        expect(newSignup.state.WrongInput[1]).toEqual("Empty Nickname");
    }); 

    it("should take check null password", () => {
        const component = mount(signup);
        component.find("#Signup_button").simulate("click");
        const newSignup = component.find(Signup).instance();
        expect(newSignup.state.WrongInput[2]).toEqual("Empty Password");
    });

    it("should take check non-matching password", () => {
        const component = mount(signup);
        const PW_input = component.find('#Password_input');
        PW_input.simulate('change', { target: { value: Password } });

        const PWC_input = component.find('#Password_Confirm_input');
        PWC_input.simulate('change', { target: { value: "123" } });

        component.find("#Signup_button").simulate("click");
        const newSignup = component.find(Signup).instance();
        expect(newSignup.state.WrongInput[3]).toEqual("Wrong Password Confirm");
    });

    it("should take term of uses", () => {
        const component = mount(signup);
        component.find("#Signup_button").simulate("click");
        const newSignup = component.find(Signup).instance();
        expect(newSignup.state.WrongInput[4]).toEqual("Please Check");
        expect(newSignup.state.WrongInput[5]).toEqual("Please Check");
    });

    it("should post if correct", (done) => {
        const component = mount(signup);
        axios.get = jest.fn(url => {
            return new Promise((resolve, reject) => {
              const result = {
                status: 200,
                data: true
              };
              resolve(result);
            })})

        axios.post = jest.fn((url, dd) => {
            return new Promise((resolve, reject) => {
                const result = {
                status: 200,
                data: true
                };
                resolve(result);
            })})

        let spyhistoryPush = jest.spyOn(history, 'push')
        .mockImplementation(() => { return path => {}; })
                
        const ID_input = component.find('#ID_input');
        ID_input.simulate('change', { target: { value: ID } });
        component.find('#Nickname_input').simulate('change', { target: { value: Nickname } });
        component.find('#Password_input').simulate('change', { target: { value: Nickname } });
        component.find('#Password_Confirm_input').simulate('change', { target: { value: Nickname } });
        component.find('#Term_Use_button').simulate('change', { target: { value: Nickname } });
        component.find('#Term_Personal_button').simulate('change', { target: { value: Nickname } });

        component.find("#Signup_button").simulate("click");        
        expect(axios.get).toHaveBeenCalledTimes(1);
        expect(axios.post).toHaveBeenCalledTimes(1);
        expect(spyhistoryPush).toHaveBeenCalledTimes(1);
        done();
    });


});