import React from 'react';
import { shallow } from 'enzyme';
import App from './App';

// FIXME: The test is now working due changed to hooks.
describe('<App />', () => {
  let wrapper;

  // before its test
  beforeEach(() => {
    wrapper = shallow(<App />);
    global.chrome = null;
  });
});
