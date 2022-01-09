import React, { useReducer } from 'react';
import YelpApi from '../../api/YelpApi';
import { BussinessSearchParams } from '../../models/api/BusinessSearchParams';
import { AppContext } from '../AppContex';
import { BusinessDetails } from './models/BusinessDetails';
import { BusinessReview } from './models/BusinessReview';
import { BussinessAction } from './models/BussinessActionModel';
import { BussinessActionTypes } from './models/BussinessActionTypesModel';
import { BussinessState, defaulBusinesstState } from './models/BussinessStateModel';
import _cloneDeep from 'lodash/cloneDeep';

const businessContext: AppContext<BussinessState> = {
  state: defaulBusinesstState,
  actions: {
    search: () => {},
    getById: () => {},
    setBusiness: () => {},
  },
};

const BussinessContext = React.createContext(businessContext);

const bussinessReducer = (state: BussinessState, action: BussinessAction): BussinessState => {
  switch (action.type) {
    case BussinessActionTypes.SET_RESULTS:
      const type = state?.params?.term;
      const resultsClone = _cloneDeep(state.resultsMap);
      resultsClone.set(type, action.payload);
      return { ...state, results: action.payload, loading: false, resultsMap: resultsClone };
    case BussinessActionTypes.SET_LOADING:
      return { ...state, loading: action.payload };
    case BussinessActionTypes.SET_RESULTS_MAP:
      return { ...state, resultsMap: action.payload };
    case BussinessActionTypes.SET_REVIEWS:
      return { ...state, reviews: action.payload };
    case BussinessActionTypes.REQUEST_ERROR:
      return { ...state, loading: false, selectedPending: { id: '', pending: false } };
    case BussinessActionTypes.SET_BUSINESS:
      return { ...state, business: action.payload, selectedPending: { pending: false, id: '' } };
    case BussinessActionTypes.SELECTED_PENDING:
      return { ...state, selectedPending: action.payload };
    case BussinessActionTypes.SET_REVIEWS_PENDING:
      return { ...state, reviewsPending: action.payload };
    case BussinessActionTypes.SET_PARAMS:
      return { ...state, params: action.payload };
    default:
      return state;
  }
};

export const BusinesseProvider = ({ children }: { children: any }) => {
  const [state, dispach] = useReducer(bussinessReducer, defaulBusinesstState);

  const setBusiness = (business: BusinessDetails) => {
    dispach({ type: BussinessActionTypes.SET_BUSINESS, payload: business });
  };

  const deleteResultByType = (type: string) => {
    const resultsMapCopy = _cloneDeep(state.resultsMap);
    resultsMapCopy.delete(type);
    dispach({ type: BussinessActionTypes.SET_RESULTS_MAP, payload: resultsMapCopy });
  };

  const requestError = (error: any) => {
    console.error(error);
    dispach({ type: BussinessActionTypes.REQUEST_ERROR });
  };

  const search = async (params: BussinessSearchParams, increaseLimit?: boolean) => {
    if (!params) {
      return;
    }
    let response: any;
    dispach({
      type: BussinessActionTypes.SET_LOADING,
      payload: true,
    });
    if (increaseLimit) {
      params.limit = params.limit ? (params.limit += 10) : 10;
    }
    try {
      response = await YelpApi.get('/search', {
        params: {
          limit: params.limit,
          term: params.term,
          location: params.location,
        },
      });
      dispach({
        type: BussinessActionTypes.SET_PARAMS,
        payload: params,
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

  const getById = async (id: string, navigation?: any) => {
    let response: any;
    dispach({ type: BussinessActionTypes.SELECTED_PENDING, payload: { id, pending: true } });
    try {
      response = await YelpApi.get(`/${id}`);
      setBusiness(response.data);
      if (navigation) {
        navigation.navigate('Details');
      }
    } catch (error) {
      requestError(error);
      throw error;
    }
  };

  const getReviews = async (businessId: string) => {
    let reviews: BusinessReview[];
    dispach({ type: BussinessActionTypes.SET_REVIEWS_PENDING, payload: true });
    try {
      const response = await YelpApi.get(`/${businessId}/reviews`);
      reviews = response.data.reviews;
      dispach({ type: BussinessActionTypes.SET_REVIEWS, payload: reviews });
      dispach({ type: BussinessActionTypes.SET_REVIEWS_PENDING, payload: false });
    } catch (error) {
      requestError(error);
      throw error;
    }
  };

  const clearReviews = () => {
    dispach({ type: BussinessActionTypes.SET_REVIEWS, payload: [] });
  };

  return (
    <BussinessContext.Provider
      value={{
        state,
        actions: {
          search,
          getById,
          setBusiness,
          getReviews,
          clearReviews,
          deleteResultByType,
        },
      }}
    >
      {children}
    </BussinessContext.Provider>
  );
};

export default BussinessContext;
