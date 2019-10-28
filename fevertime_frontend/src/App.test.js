import React from 'react';
import ReactDOM from 'react-dom';
import { shallow, mount } from 'enzyme';
import { Provider } from 'react-redux';
import App from './App';
import { getMockStore } from './test-utils/mocks';
import {Link} from "react-router-dom";
import { history } from './store/store';
const mockStore = getMockStore({},{});



describe('App', () => {
  let app;

  beforeEach(() => {
    app = (
        <Provider store={mockStore}>
          <App history={history}/>
        </Provider>
    )
  });

  it('should render', () => {
    const component = mount(app);
    expect(component.find('.App').length).toBe(1);
  });

});

