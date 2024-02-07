import { all } from 'redux-saga/effects';

import { watchSetToken } from './auth';

const rootSaga = function* root() {
  yield all([watchSetToken()]);
};

export default rootSaga;
