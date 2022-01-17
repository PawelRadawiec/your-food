import React from 'react';
import { mount } from 'enzyme';
import Enzyme from 'enzyme';
import Adapter from '@wojtekmaj/enzyme-adapter-react-17';
import SearchForm from '../SearchForm';
import { FlatList, TouchableOpacity } from 'react-native';
import { SearchType } from '../../context/business/models/SearchType';

Enzyme.configure({ adapter: new Adapter() });

const originalConsoleError = console.error;
console.error = (message) => {
  if (message.startsWith('Warning:')) {
    return;
  }
  originalConsoleError(message);
};

describe('search form component tests', () => {
  it('should call onSelect', () => {
    const mockOnSelect = jest.fn();
    const component = mount(<SearchForm onSelect={mockOnSelect} onUnselected={() => {}} onLocationEndEditing={() => {}} loading={false} />);
    component.find(FlatList).find(TouchableOpacity).first().simulate('click');
    expect(mockOnSelect.mock.calls.length).toBe(1);
  });
  it('should call onUnselected', () => {
    const mocknOnUnselected = jest.fn();
    const component = mount(<SearchForm onUnselected={mocknOnUnselected} onSelect={() => {}} onLocationEndEditing={() => {}} loading={false} />);
    const firstType = component.find(FlatList).find(TouchableOpacity).first();
    firstType.simulate('click');
    firstType.simulate('click');
    expect(mocknOnUnselected.mock.calls.length).toBe(1);
  });

  it('should cotains one selected types', () => {
    const component = mount(<SearchForm onUnselected={() => {}} onSelect={() => {}} onLocationEndEditing={() => {}} loading={false} />);
    component.find(FlatList).find(TouchableOpacity).first().simulate('click');
    const types = component.find(FlatList).prop('data') as SearchType[];
    expect(types.filter((type) => type.selected).length).toBe(1);
  });

  it('should contains two selected types', () => {
    const component = mount(<SearchForm onUnselected={() => {}} onSelect={() => {}} onLocationEndEditing={() => {}} loading={false} />);
    const typesFlatList = component.find(FlatList);
    typesFlatList
      .find(TouchableOpacity)
      .slice(0, 2)
      .forEach((node) => {
        node.simulate('click');
      });
    const types = component.find(FlatList).prop('data') as SearchType[];
    expect(types.filter((type) => type.selected).length).toBe(2);
  });

  it('should contain no selected types', () => {
    const component = mount(<SearchForm onUnselected={() => {}} onSelect={() => {}} onLocationEndEditing={() => {}} loading={false} />);
    const firstType = component.find(FlatList).find(TouchableOpacity).first();
    firstType.simulate('click');
    firstType.simulate('click');
    const types = component.find(FlatList).prop('data') as SearchType[];
    expect(types.filter((type) => type.selected).length).toBe(0);
  });
});
