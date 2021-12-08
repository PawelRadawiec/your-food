import { BusinessesModel } from '../../../models/yelp/BusinessesModel';

export interface BussinessState {
  results: BusinessesModel[];
  loading: boolean;
}

export const defaulBusinesstState: BussinessState = {
  results: [],
  loading: false,
};
