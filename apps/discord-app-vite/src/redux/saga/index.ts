import { all } from 'redux-saga/effects';

// import { watchSetToken, watchClearAuthState } from './auth';
import { watchSetErrorMessage } from './status';

const rootSaga = function* root() {
  // yield all([watchSetToken(), watchClearAuthState()]);
  yield all([watchSetErrorMessage()]);
};

export default rootSaga;
