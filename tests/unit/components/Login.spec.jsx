import React from 'react';
import ReactDOM from 'react-dom';
import { mount } from 'enzyme';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store'
import { MemoryRouter } from 'react-router';
import Login from '../../../src/components/Login';

describe('Login',()=>{
  const initialState = {}
  const mockStore = configureStore()
  const onSubmit = jest.fn()
  let store, wrapper

  beforeEach(()=>{
    store = mockStore(initialState)
    wrapper = mount(
      <Provider store={store}>
        <Login onSubmit={onSubmit}/>
      </Provider>
    );
  })

  describe('when componenet renders', () => {
    it('should show all input fields', () => {
      expect(wrapper.find('input#email')).toHaveLength(1);
      expect(wrapper.find('input#password')).toHaveLength(1);
      expect(wrapper.find('button#login')).toHaveLength(1);
    });
  });

  describe('when form submitted', () => {
    beforeEach(() => {
      wrapper.find('form').simulate('submit', { preventDefault() {} });
    });

    it('should validate email', () => {
      expect(wrapper.find('input#email').hasClass('error')).toEqual(true);
      wrapper.find('input#email').simulate('change', {target: {value: 'name@domain.com'}});
      expect(wrapper.find('input#email').hasClass('error')).toEqual(false);
    });

    it('should validate password', () => {
      expect(wrapper.find('input#password').hasClass('error')).toEqual(true);
      wrapper.find('input#password').simulate('change', {target: {value: 'a password'}});
      expect(wrapper.find('input#password').hasClass('error')).toEqual(false);
    });

    it('should submit form if validation succeeds', () => {
      wrapper.find('input#email').simulate('change', {target: {value: 'name@domain.com'}});
      wrapper.find('input#password').simulate('change', {target: {value: 'a password'}});

      wrapper.find('form').simulate('submit', { preventDefault() {} });

      expect(onSubmit.mock.calls.length).toEqual(1);
    });
  });
  //
  // describe('when form submitted', () => {
  //   beforeEach(() => {
  //     wrapper.find('input#email').simulate('change', {target: {value: 'name@domain.com'}});
  //     wrapper.find('input#password').simulate('change', {target: {value: 'a password'}});
  //     wrapper.find('form').simulate('submit', { preventDefault() {} });
  //   });
  //
  //   it('should submit form if validation succeeds', () => {
  //     expect(onSubmit.mock.calls.length).toEqual(1);
  //   });
  // });
});
