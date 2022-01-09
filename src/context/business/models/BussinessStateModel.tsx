import { BussinessSearchParams } from '../../../models/api/BusinessSearchParams';
import { BusinessesModel } from '../../../models/yelp/BusinessesModel';
import { BusinessDetails } from './BusinessDetails';
import { BusinessReview } from './BusinessReview';

export interface BussinessState {
  results: BusinessesModel[];
  reviews: BusinessReview[];
  loading: boolean;
  business: BusinessDetails | null;
  selectedPending: { pending: boolean; id: string };
  reviewsPending: boolean;
  params: BussinessSearchParams | null;
  resultsMap: Map<string, BusinessesModel[]>;
}

export const defaulBusinesstState: BussinessState = {
  results: [],
  reviews: [],
  loading: false,
  business: null,
  selectedPending: { pending: false, id: '' },
  reviewsPending: false,
  params: null,
  resultsMap: new Map()
};
