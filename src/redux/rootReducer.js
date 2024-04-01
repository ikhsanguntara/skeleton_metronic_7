import { all } from "redux-saga/effects";
import { combineReducers } from "redux";

import * as auth from "../app/modules/Auth/_redux/authRedux";
import customerReducer from "../app/pages/customer/customerSlice";

export const rootReducer = combineReducers({
  auth: auth.reducer,
  customer: customerReducer,
});

export function* rootSaga() {
  yield all([auth.saga()]);
}
