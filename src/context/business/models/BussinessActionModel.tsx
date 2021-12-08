import { BussinessActionTypes } from "./BussinessActionTypesModel";

export interface BussinessAction {
  type: BussinessActionTypes;
  payload: any;
}
