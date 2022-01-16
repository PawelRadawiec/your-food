import React from 'react';
import { shallow, mount } from 'enzyme';
import StarsList from '../StarsList';
import Enzyme from 'enzyme';
import Adapter from '@wojtekmaj/enzyme-adapter-react-17';
import { FlatList } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';

Enzyme.configure({ adapter: new Adapter() });

describe('Stars list unit test', () => {
  it('should render my component', () => {
    const component = shallow(<StarsList rating={5} />);
    expect(component.getElements()).toMatchSnapshot();
  });

  it('should contains 5 icons', () => {
    const component = mount(<StarsList rating={5} />);
    const flatList = component.find(FlatList);
    const icons = flatList.find(MaterialIcons);
    expect(icons.length).toBe(5);
  });

  it('should contains 4 icons for 4.5 rating', () => {
    const component = mount(<StarsList rating={4.5} />);
    const flatList = component.find(FlatList);
    const icons = flatList.find(MaterialIcons);
    expect(icons.length).toBe(4);
  });

});
