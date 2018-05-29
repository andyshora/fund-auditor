import React from 'react';
import { expect } from 'chai';
import { mount } from 'enzyme';
import Loader from './loader';

const wrapper = mount(<Loader />);

describe('Loader Component', () => {
  it('exists', () => {
    expect(wrapper.exists()).to.equal(true);
    expect(wrapper.is('Loader')).to.equal(true);
  });

  it('renders 1 child', () => {
    expect(wrapper.find('svg').children()).to.have.length(1);
  });

  it('contains 5 <path> elements', () => {
    expect(wrapper.find('path')).to.have.length(5);
  });
});
