import * as React from 'react';
import { Input } from 'react-native-elements';
import renderer, { act, ReactTestInstance } from 'react-test-renderer';
import SearchInput from '../SearchInput';

describe('search input', () => {
  let component: ReactTestInstance;
  let onSearchMock: any;
  beforeAll(() => {
    onSearchMock = jest.fn(() => {});
    component = renderer.create(
      <SearchInput onSearch={onSearchMock} loading={false} />
    ).root;
  });
  it(`renders correctly`, () => {
    const tree = renderer
      .create(<SearchInput onSearch={() => {}} loading={false} />)
      .toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('Shoule have one input', () => {
    const root: ReactTestInstance = renderer.create(
      <SearchInput onSearch={() => {}} loading={false} />
    ).root;
    const inputElements = root.findAllByType(Input);
    expect(inputElements.length).toBe(1);
  });

  it('should call onSearch after 1s', async () => {
    const searchInput = component.findByType(Input);
    act(() => searchInput.props.onChangeText('Value'));
    await new Promise((r) => setTimeout(r, 1000));
    expect(onSearchMock.mock.calls.length).toBe(1);
  });
});
