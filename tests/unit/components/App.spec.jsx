import React from 'react';
import ReactDOM from 'react-dom';
import { mount } from 'enzyme';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store'
import { MemoryRouter } from 'react-router';
import App from '../../../src/components/App';
import Home from '../../../src/components/Home';
import Login from '../../../src/components/Login';
import Register from '../../../src/components/Register';
import Roster from '../../../src/components/Roster';
import AddPlayer from '../../../src/components/AddPlayer';
import NotFound from '../../../src/components/NotFound';

describe('App',()=>{
  const initialState = {common: {}}
  const mockStore = configureStore()
  let store

  beforeEach(()=>{
    store = mockStore(initialState)
  })

  it('should show NotFound at invalid path', () => {
    const wrapper = mount(
      <MemoryRouter initialEntries={[ '/random' ]}>
        <Provider store={store}>
          <App/>
        </Provider>
      </MemoryRouter>
    );
    expect(wrapper.find(Home)).toHaveLength(0);
    expect(wrapper.find(NotFound)).toHaveLength(1);
  });

  it('should show Home at root path', () => {
    const wrapper = mount(
      <MemoryRouter initialEntries={[ '/' ]}>
        <Provider store={store}>
          <App/>
        </Provider>
      </MemoryRouter>
    );
    expect(wrapper.find(Home)).toHaveLength(1);
    expect(wrapper.find(NotFound)).toHaveLength(0);
  });

  it('should show Login at "/login" path', () => {
    const wrapper = mount(
      <MemoryRouter initialEntries={[ '/login' ]}>
        <Provider store={store}>
          <App/>
        </Provider>
      </MemoryRouter>
    );
    expect(wrapper.find(Login)).toHaveLength(1);
    expect(wrapper.find(NotFound)).toHaveLength(0);
  });

  it('should show Register at "/register" path', () => {
    const wrapper = mount(
      <MemoryRouter initialEntries={[ '/register' ]}>
        <Provider store={store}>
          <App/>
        </Provider>
      </MemoryRouter>
    );
    expect(wrapper.find(Register)).toHaveLength(1);
    expect(wrapper.find(NotFound)).toHaveLength(0);
  });

  it('should show Roster at "/roster" path', () => {
    const wrapper = mount(
      <MemoryRouter initialEntries={[ '/roster' ]}>
        <Provider store={store}>
          <App/>
        </Provider>
      </MemoryRouter>
    );
    expect(wrapper.find(Roster)).toHaveLength(1);
    expect(wrapper.find(NotFound)).toHaveLength(0);
  });

  it('should show AddPlayer at "/player/new" path', () => {
    const wrapper = mount(
      <MemoryRouter initialEntries={[ '/player/new' ]}>
        <Provider store={store}>
          <App/>
        </Provider>
      </MemoryRouter>
    );
    expect(wrapper.find(AddPlayer)).toHaveLength(1);
    expect(wrapper.find(NotFound)).toHaveLength(0);
  });

});
