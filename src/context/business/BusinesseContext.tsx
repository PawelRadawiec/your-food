import React, { useReducer } from 'react';
import YelpApi from '../../api/YelpApi';
import { AppContext } from '../AppContex';
import { BussinessAction } from './models/BussinessActionModel';
import { BussinessActionTypes } from './models/BussinessActionTypesModel';
import {
  BussinessState,
  defaulBusinesstState,
} from './models/BussinessStateModel';

const businessContext: AppContext<BussinessState> = {
  state: defaulBusinesstState,
  actions: {
    search: () => {},
  },
};

const BussinessContext = React.createContext(businessContext);

const bussinessReducer = (
  state: BussinessState,
  action: BussinessAction
): BussinessState => {
  switch (action.type) {
    case BussinessActionTypes.SET_RESULTS:
      return { ...state, results: action.payload };
    case BussinessActionTypes.SET_LOADING:
      return { ...state, loading: action.payload };
    default:
      return state;
  }
};

export const BusinesseProvider = ({ children }: { children: any }) => {
  const [state, dispach] = useReducer(bussinessReducer, defaulBusinesstState);

  const search = async () => {
    let response: any;
    dispach({
      type: BussinessActionTypes.SET_LOADING,
      payload: true,
    });
    try {
      response = await YelpApi.get('/search');
      dispach({
        type: BussinessActionTypes.SET_RESULTS,
        payload: response.data,
      });
    } catch (error) {
      console.error(error);
      dispach({
        type: BussinessActionTypes.SET_LOADING,
        payload: false,
      });
    }
  };

  return (
    <BussinessContext.Provider
      value={{
        state,
        actions: {
          search,
        },
      }}
    >
      {children}
    </BussinessContext.Provider>
  );
};

export default BussinessContext;
