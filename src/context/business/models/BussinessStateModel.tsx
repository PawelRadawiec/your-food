import { BusinessResult } from '../../../models/BusinessResultModel';
import { BusinessDetails } from './BusinessDetails';
import { BusinessReview } from './BusinessReview';

export interface BussinessState {
  reviews: BusinessReview[];
  loading: boolean;
  business: BusinessDetails | null;
  selectedPending: { pending: boolean; id: string };
  reviewsPending: boolean;
  resultsMap: Map<string, BusinessResult>;
}

export const defaulBusinesstState: BussinessState = {
  reviews: [],
  loading: false,
  business: null,
  selectedPending: { pending: false, id: '' },
  reviewsPending: false,
  resultsMap: new Map()
};
