import React from 'react';
import { mount } from 'enzyme';
import { Provider } from 'react-redux';
import App from './App';
import { getMockStore } from './test-utils/mocks';
import { history } from './store/store';
import * as actionCreator from "./store/actions/fever";

const stubInitialState = {
  num_fevers: 1
};
const mockStore = getMockStore({},{stubInitialState});


describe('App', () => {
  let app;
  let spyputFeverHistory1 = jest.spyOn(actionCreator, 'putFeverException')
      .mockImplementation(() => { return () => {}; });
  afterEach(() => {
    spyputFeverHistory1.mockClear()
  })
  beforeEach(() => {
    app = (
        <Provider store={mockStore}>
          <App history={history}/>
        </Provider>
    )
  });

  it('should render and pop-modal-click-close', () => {
    const component = mount(app);
    expect(component.find('.App').length).toBe(1);
    const wrapper1 = component.find('#pop-modal-click-close').at(0);
    wrapper1.simulate('click');
    expect(spyputFeverHistory1).toBeCalledTimes(1);
  });
  it('pop-modal-click-confirm', () => {
    const component = mount(app);
    const wrapper1 = component.find('#pop-modal-click-confirm').at(0);
    wrapper1.simulate('click');
    expect(spyputFeverHistory1).toBeCalledTimes(1);
  });

});

