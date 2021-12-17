import { BusinessesModel } from '../../../models/yelp/BusinessesModel';
import { BusinessDetails } from './BusinessDetails';
import { BusinessReview } from './BusinessReview';

export interface BussinessState {
  results: BusinessesModel[];
  reviews: BusinessReview[];
  loading: boolean;
  business: BusinessDetails | null;
  selectedPending: { pending: boolean; id: string };
}

export const defaulBusinesstState: BussinessState = {
  results: [],
  reviews: [],
  loading: false,
  business: null,
  selectedPending: { pending: false, id: '' },
};
