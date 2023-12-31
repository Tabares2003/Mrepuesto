import { all, put, takeEvery } from 'redux-saga/effects';
import { polyfill } from 'es6-promise';
import {
    actionTypes,
    getSelectConditionSuccess
} from '~/store/selectcondition/action';

polyfill();

function* getSelectConditionSaga({ payload }) {
    try {
        yield put( getSelectConditionSuccess(payload));
    } catch (err) {
        console.log(err);
    }
}

export default function* rootSaga() {
    yield all([takeEvery(actionTypes.GET_SELECTCONDITION, getSelectConditionSaga)]);
}