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
    let spy1 =jest.spyOn(MyData.WrappedComponent.prototype, 'categFunc');
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
                    status: 204,
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

    afterEach(() => { spy1.mockClear(); jest.clearAllMocks() });

    it('should render', (done) => {
        const component = mount(mydata);
        expect(component.find('#mydata').length).toBe(1);
        done()
    });
/*
    it('should go back', (done) => {
        let spyhistoryPush;
        spyhistoryPush = jest.spyOn(history, 'goBack')
        .mockImplementation(() => { return {}; });
        axios.get = jest.fn(() => {
            return new Promise((resolve,reject) => {
                const result = {
                    response: {status:401},
                    data: null
                };
                reject(result)
                resolve()
            })
        });
        mount(mydata);
        expect(spyhistoryPush).toHaveBeenCalledTimes(1);
        done()
    });
*/
    it('should select chart', (done) => {
        const component = mount(mydata);
        const day_button = component.find("#daily-button")
        day_button.simulate("click")
        expect(axios.get).toHaveBeenCalledTimes(2);
        const week_button = component.find("#weekly-button")
        week_button.simulate("click")
        expect(axios.get).toHaveBeenCalledTimes(3);
        const month_button = component.find("#monthly-button")
        month_button.simulate("click")

        done()
    });

    it('should select chart', (done) => {
        const component = mount(mydata);
        const Instance = component.find(MyData.WrappedComponent).instance();
        Instance.setState({log: [{'category' : 'study', 'tag': 'swpp',
                'start_time' : '2019-12-14 13:10' , 't_time' : '0:00:45',
            'f_time': '0:00:00', 'f_rate' : 0, 'goalTime' : '02:00'}], showModeDWM : 0, noData: false});
        expect(component.find('#daily-log').length).toBe(0);

        done()
    });
/*
    it('should select chart', (done) => {
        const component = mount(mydata);

        const btn = component.find("#dropdown-basic-button-main").at(0);
        btn.simulate("click");

        const btn1 = component.find("#dropdown-basic-button-main > a")
        btn1.simulate("click")
        const instance1= component.find(MyData.WrappedComponent).instance();
        expect(instance1.state.selectCateg).toEqual(0);

        // const week_button = component.find(".dropdown-item").at(1)
        // week_button.simulate("click")
        // const instance2 = component.find(MyData.WrappedComponent).instance();
        // expect(instance2.state.selectCateg).toEqual(1);
        //
        // const month_button = component.find(".dropdown-item").at(2)
        // month_button.simulate("click")
        // const instance3 = component.find(MyData.WrappedComponent).instance();
        // expect(instance3.state.selectCateg).toEqual(2);
        //
        // const button4 = component.find(".dropdown-item").at(3)
        // button4.simulate("click")
        // const instance4 = component.find(MyData.WrappedComponent).instance();
        // expect(instance4.state.selectCateg).toEqual(3);
        //
        // const button5 = component.find(".dropdown-item").at(4)
        // button5.simulate("click")
        // const instance5 = component.find(MyData.WrappedComponent).instance();
        // expect(instance5.state.selectCateg).toEqual(4);

        done()
    });
    */
    it('categFunc', (done) => {

        expect(spy1(0)).toEqual('All');
        expect(spy1(1)).toEqual('Study');
        expect(spy1(2)).toEqual('Work');
        expect(spy1(3)).toEqual('Read');
        expect(spy1(4)).toEqual('Etc.');
        done()
    });

});
