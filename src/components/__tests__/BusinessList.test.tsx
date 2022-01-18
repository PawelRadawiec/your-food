import React from 'react';
import Enzyme, { mount, ReactWrapper, shallow } from 'enzyme';
import Adapter from '@wojtekmaj/enzyme-adapter-react-17';
import BusinessList from '../BusinessList';
import { BusinessResult } from '../../models/BusinessResultModel';
import BussinessContext, { BusinessActions } from '../../context/business/BusinesseContext';
import { FlatList, TouchableOpacity } from 'react-native';
import { BusinessesModel } from '../../models/yelp/BusinessesModel';

Enzyme.configure({ adapter: new Adapter() });

const originalConsoleError = console.error;
console.error = (message) => {
  if (message.startsWith('Warning:')) {
    return;
  }
  originalConsoleError(message);
};

describe('business list component unit tests', () => {
  let wrapper: ReactWrapper;
  let getByIdMock: any;
  let searchMock: any;
  let actions: BusinessActions;

  beforeEach(() => {
    getByIdMock = jest.fn();
    searchMock = jest.fn();
    const actionsPartial: Partial<BusinessActions> = {
      getById: getByIdMock,
      search: searchMock,
    };
    actions = actionsPartial as BusinessActions;
    wrapper = mount(
      <BussinessContext.Provider
        value={{
          state: getDefaultState(),
          actions: actions as BusinessActions,
        }}
      >
        <BusinessList navigation={() => {}} />
      </BussinessContext.Provider>
    );
  });

  it('should render', () => {
    const component = shallow(<BusinessList navigation={() => {}} />);
    expect(component.getElements()).toMatchSnapshot();
  });

  it('should contains resultKeys', () => {
    const component = wrapper.find(BusinessList);
    const resultKeys = component.find(FlatList).first().prop('data') as string[];
    expect(resultKeys?.length).toBeGreaterThan(0);
  });

  it('should render horizontal flat list', () => {
    const component = wrapper.find(BusinessList);
    const hotizontalList = component.findWhere((node) => node.props().testID === 'pizza').first();
    expect(hotizontalList?.prop('data')?.length).toBeGreaterThan(0);
    expect(hotizontalList?.prop('horizontal')).toBeTruthy();
  });

  it('should call getById', () => {
    const component = wrapper.find(BusinessList);
    const hotizontalList = component.findWhere((node) => node.props().testID === 'pizza').first();
    hotizontalList.find(TouchableOpacity).first().simulate('click');
    expect(getByIdMock.mock.calls.length).toBe(1);
  });

  it('should not call getById', () => {
    const state = getDefaultState();
    state.selectedPending = { pending: true, id: '' };
    wrapper = mount(
      <BussinessContext.Provider
        value={{
          state,
          actions: actions as BusinessActions,
        }}
      >
        <BusinessList navigation={() => {}} />
      </BussinessContext.Provider>
    );
    const component = wrapper.find(BusinessList);
    const hotizontalList = component.findWhere((node) => node.props().testID === 'pizza').first();
    hotizontalList.find(TouchableOpacity).first().simulate('click');
    expect(getByIdMock.mock.calls.length).toBe(0);
  });

  it('should call search on end reached', () => {
    const component = wrapper.find(BusinessList);
    const hotizontalList = component.findWhere((node) => node.props().testID === 'pizza').first();
    hotizontalList.prop('onEndReached')();
    expect(searchMock.mock.calls.length).toBe(1);
  });

  it('should not call search on end reached', () => {
    const state = getDefaultState();
    state.loading = true;
    wrapper = mount(
      <BussinessContext.Provider
        value={{
          state,
          actions: actions as BusinessActions,
        }}
      >
        <BusinessList navigation={() => {}} />
      </BussinessContext.Provider>
    );
    const component = wrapper.find(BusinessList);
    const hotizontalList = component.findWhere((node) => node.props().testID === 'pizza').first();
    hotizontalList.prop('onEndReached')();
    expect(searchMock.mock.calls.length).toBe(0);
  });
});

const getDefaultState = () => {
  const resultsMap = new Map<string, BusinessResult>();
  const business1: Partial<BusinessesModel> = {};
  const business2: Partial<BusinessesModel> = {};
  resultsMap.set('pizza', {
    params: {},
    businesses: [business1 as BusinessesModel, business2 as BusinessesModel],
  });
  return {
    reviews: [],
    loading: false,
    business: null,
    selectedPending: { pending: false, id: '' },
    reviewsPending: false,
    resultsMap: resultsMap,
  };
};
