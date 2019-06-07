import React from 'react';
import { shallow } from 'enzyme';
import App from './App';
import StatusMessage from '../components/StatusMessage/StatusMessage';

// FIXME: The test is now working due changed to hooks.
describe('<App />', () => {
  let wrapper;

  // before its test
  beforeEach(() => {
     wrapper = shallow(<App />);
     global.chrome = null;
  });

  it('should render <StatusMessage /> if have message', () => {
    wrapper.setState({ status: { message: 'test' }});
    expect(wrapper.find(StatusMessage)).toHaveLength(1);
  });
});