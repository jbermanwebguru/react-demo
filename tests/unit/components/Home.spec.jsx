import React from 'react';
import { shallow } from 'enzyme';
import toJson from 'enzyme-to-json';
import configureStore from 'redux-mock-store';

import Home from '../../../src/components/Home';

describe('<Home />', () => {
  it('renders the component', () => {
    const wrapper = shallow(<Home />);
    const component = wrapper.shallow();

    expect(toJson(component)).toMatchSnapshot();
  });
});
