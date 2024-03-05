import { takeLatest, select, put } from 'redux-saga/effects';
import toast from 'react-hot-toast';

import { StatusSlice, setErrorMessage } from '@redux/slices/statusSlice';

function* watchSetErrorMessage() {
  yield takeLatest(setErrorMessage.type, function* toastError() {
    const statusState: StatusSlice = yield select((state) => state.status);

    if (statusState.error) toast.error(statusState.error);
    else yield put(setErrorMessage(null));
  });
}

export { watchSetErrorMessage };
