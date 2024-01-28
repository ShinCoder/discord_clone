import { takeLatest, select } from 'redux-saga/effects';

import { AuthSlice, setToken } from '@redux/slices/authSlice';
import { writeLocalStorage } from '@utils';
import { StorageKey } from '@constants';

function* watchSetToken() {
  yield takeLatest('auth/setToken', function* writeToken() {
    const authState: AuthSlice = yield select((state) => state.auth);

    writeLocalStorage(StorageKey.TOKEN, authState.token);
  });
}

export { watchSetToken };
