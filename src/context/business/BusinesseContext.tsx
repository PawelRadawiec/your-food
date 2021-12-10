import React, { useReducer } from 'react';
import YelpApi from '../../api/YelpApi';
import { BussinessSearchParams } from '../../models/api/BusinessSearchParams';
import { BusinessesModel } from '../../models/yelp/BusinessesModel';
import { AppContext } from '../AppContex';
import { BusinessDetails } from './models/BusinessDetails';
import { BussinessAction } from './models/BussinessActionModel';
import { BussinessActionTypes } from './models/BussinessActionTypesModel';
import { BussinessState, defaulBusinesstState } from './models/BussinessStateModel';

const businessContext: AppContext<BussinessState> = {
  state: defaulBusinesstState,
  actions: {
    search: () => {},
    getById: () => {},
    setBusiness: () => {}
  },
};

const BussinessContext = React.createContext(businessContext);

const bussinessReducer = (state: BussinessState, action: BussinessAction): BussinessState => {
  switch (action.type) {
    case BussinessActionTypes.SET_RESULTS:
      return { ...state, results: action.payload, loading: false };
    case BussinessActionTypes.SET_LOADING:
      return { ...state, loading: action.payload };
    case BussinessActionTypes.REQUEST_ERROR:
      return { ...state, loading: false };
    case BussinessActionTypes.SET_BUSINESS:
      return { ...state, business: action.payload, selectedPending: false };
    case BussinessActionTypes.SELECTED_PENDING:
      return { ...state, selectedPending: action.payload };
    default:
      return state;
  }
};

export const BusinesseProvider = ({ children }: { children: any }) => {
  const [state, dispach] = useReducer(bussinessReducer, defaulBusinesstState);

  const setBusiness = (business: BusinessDetails) => {
    dispach({ type: BussinessActionTypes.SET_BUSINESS, payload: business });
  };

  const requestError = (error: any) => {
    console.error(error);
    dispach({ type: BussinessActionTypes.REQUEST_ERROR });
  };

  const search = async (params: BussinessSearchParams) => {
    let response: any;
    dispach({
      type: BussinessActionTypes.SET_LOADING,
      payload: true,
    });
    try {
      response = await YelpApi.get('/search', {
        params: {
          limit: params.limit,
          term: params.term,
          location: params.location,
        },
      });
      dispach({
        type: BussinessActionTypes.SET_RESULTS,
        payload: response.data?.businesses,
      });
    } catch (error) {
      requestError(error);
      throw error;
    }
  };

  const getById = async (id: string, afterResponse: () => any) => {
    let response: any;
    dispach({ type: BussinessActionTypes.SELECTED_PENDING, payload: true });
    try {
      response = await YelpApi.get(`/${id}`);
      setBusiness(response.data);
      afterResponse;
    } catch (error) {
      requestError(error);
      throw error;
    }
  };

  return (
    <BussinessContext.Provider
      value={{
        state,
        actions: {
          search,
          getById,
          setBusiness
        },
      }}
    >
      {children}
    </BussinessContext.Provider>
  );
};

export default BussinessContext;
