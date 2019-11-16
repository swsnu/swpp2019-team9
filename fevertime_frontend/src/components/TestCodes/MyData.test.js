import React from 'react';
import { mount } from 'enzyme';
import { Provider } from 'react-redux';
import MyData from '../MyData';
import { getMockStore } from '../../test-utils/mocks';
import axios from 'axios';
import { history } from '../../store/store';
import {ConnectedRouter} from "connected-react-router";

jest.mock('../Chart/ColumnChart', () => {
    return jest.fn(() => {
      return (
        <div className="ColumnChart">
        </div>
        );
    });
});

jest.mock('../Chart/PieChart', () => {
    return jest.fn(() => {
      return (
        <div className="PieChart">
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

describe('MyData', () => {
    let mydata;
    beforeEach(() => {
        mydata = (
            <Provider store={mockStore}>
                <ConnectedRouter history={history}>
                    <MyData/>
                </ConnectedRouter>
            </Provider>
        );

        axios.get = jest.fn(() => {
            return new Promise((resolve) => {
                const result = {
                    status: 200,
                    data: [
                        
                    ]
                };
                resolve(result);
            })
        })
        axios.post = jest.fn(() => {
            return new Promise((resolve) => {
                const result = {
                    status: 201,
                };
                resolve(result);
            })
        })
        axios.delete = jest.fn(() => {
            return new Promise((resolve) => {
                const result = {
                    status: 200,
                };
                resolve(result);
            })
        })

    });

    afterEach(() => { jest.clearAllMocks() });

    it('should render', (done) => {
        const component = mount(mydata);
        expect(component.find('#mydata').length).toBe(1);
        done()
    });

    it('should select chart', (done) => {
        const component = mount(mydata);

        const day_button = component.find("#daily-button")
        day_button.simulate("click")
        expect(axios.post).toHaveBeenCalledTimes(2);
        const week_button = component.find("#weekly-button")
        week_button.simulate("click")
        expect(axios.post).toHaveBeenCalledTimes(3);
        const month_button = component.find("#monthly-button")
        month_button.simulate("click")
        expect(axios.post).toHaveBeenCalledTimes(4);

        done()
    });


});