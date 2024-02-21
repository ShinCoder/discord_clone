// import { takeLatest, select } from 'redux-saga/effects';

// import { AuthSlice, clearAuthState, setToken } from '@redux/slices/authSlice';
// import { clearLocalStorage, writeLocalStorage } from '@utils';
// import { StorageKey } from '@constants';

// function* watchSetToken() {
//   yield takeLatest(setToken.type, function* writeToken() {
//     const authState: AuthSlice = yield select((state) => state.auth);

//     writeLocalStorage(StorageKey.TOKEN, authState.token);
//   });
// }

// function* watchClearAuthState() {
//   yield takeLatest(clearAuthState.type, function removeToken() {
//     clearLocalStorage(StorageKey.TOKEN);
//   });
// }

// export { watchSetToken, watchClearAuthState };
