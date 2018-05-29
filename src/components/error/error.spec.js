import React from 'react';
import { expect } from 'chai';
import { mount } from 'enzyme';
import sinon from 'sinon';
import Error from './error';

const _onClose = sinon.spy();

const props = {
  data: { abc: 123 },
  description: 'test description 456',
  title: 'test title 123',
  onClose: _onClose
};

const wrapper = mount(<Error {...props} />);

describe('Error Component', () => {
  it('exists', () => {
    expect(wrapper.exists()).to.equal(true);
    expect(wrapper.is('Error')).to.equal(true);
  });

  it('renders title and description', () => {
    expect(new RegExp('should not match').test(wrapper.text())).to.equal(false);
    expect(new RegExp(props.title).test(wrapper.text())).to.equal(true);
    expect(new RegExp(props.description).test(wrapper.text())).to.equal(true);
  });

  it('triggers onClose when cross clicked', () => {
    wrapper.find('SvgIcon').simulate('click');
    expect(_onClose.calledOnce).to.equal(true);
  });
});
