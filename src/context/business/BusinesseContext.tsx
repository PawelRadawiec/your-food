import React, { useReducer } from 'react';
import YelpApi from '../../api/YelpApi';
import { BussinessSearchParams } from '../../models/api/BusinessSearchParams';
import { BusinessDetails } from './models/BusinessDetails';
import { BusinessReview } from './models/BusinessReview';
import { BussinessAction } from './models/BussinessActionModel';
import { BussinessActionTypes } from './models/BussinessActionTypesModel';
import { BussinessState, defaulBusinesstState } from './models/BussinessStateModel';
import _cloneDeep from 'lodash/cloneDeep';

const businessContext = {
  state: defaulBusinesstState,
  actions: {},
};

const BussinessContext = React.createContext(businessContext);

const bussinessReducer = (state: BussinessState, action: BussinessAction): BussinessState => {
  switch (action.type) {
    case BussinessActionTypes.SET_RESULTS:
      const resultsMap = _cloneDeep(state.resultsMap);
      resultsMap.set(action.payload?.params?.term, { params: action.payload.params, businesses: action.payload.businesses });
      return { ...state, loading: false, resultsMap };
    case BussinessActionTypes.SET_LOADING:
      return { ...state, loading: action.payload };
    case BussinessActionTypes.SET_RESULTS_MAP:
      return { ...state, resultsMap: action.payload };
    case BussinessActionTypes.SET_REVIEWS:
      return { ...state, reviews: action.payload };
    case BussinessActionTypes.SET_BUSINESS:
      return { ...state, business: action.payload, selectedPending: { pending: false, id: '' } };
    case BussinessActionTypes.SELECTED_PENDING:
      return { ...state, selectedPending: action.payload };
    case BussinessActionTypes.SET_REVIEWS_PENDING:
      return { ...state, reviewsPending: action.payload };
    case BussinessActionTypes.REQUEST_ERROR:
      return { ...state, loading: false, selectedPending: { id: '', pending: false } };
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

  const search = async (params: BussinessSearchParams) => {
    dispach({
      type: BussinessActionTypes.SET_LOADING,
      payload: true,
    });
    return YelpApi.get('/search', {
      params: {
        limit: params.limit,
        term: params.term,
        location: params.location,
      },
    })
      .then((response) => {
        dispach({
          type: BussinessActionTypes.SET_RESULTS,
          payload: { businesses: response.data?.businesses, params },
        });
      })
      .catch((error) => {
        requestError(error);
      });
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
