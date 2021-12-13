import { BusinessesModel } from '../../../models/yelp/BusinessesModel';
import { BusinessDetails } from './BusinessDetails';

export interface BussinessState {
  results: BusinessesModel[];
  loading: boolean;
  business: BusinessDetails | null;
  selectedPending: { pending: boolean; id: string };
}

export const defaulBusinesstState: BussinessState = {
  results: [],
  loading: false,
  business: null,
  selectedPending: { pending: false, id: '' },
};
