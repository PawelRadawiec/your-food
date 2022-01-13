import { BussinessSearchParams } from './api/BusinessSearchParams';
import { BusinessesModel } from './yelp/BusinessesModel';

export interface BusinessResult {
  params: BussinessSearchParams;
  businesses: BusinessesModel[];
}
