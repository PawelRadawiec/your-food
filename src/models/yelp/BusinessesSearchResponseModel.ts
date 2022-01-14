import { BusinessesModel } from './BusinessesModel';
import { Region } from './RegionModel';

export interface BusinessesSearchResponseModel {
  total: number;
  businesses: BusinessesModel[];
  region: Region;
}
