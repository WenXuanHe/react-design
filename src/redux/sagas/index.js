import apis from  '$apis';
import ActionTypes from '$redux/actionType'
import { call, put } from 'redux-saga/effects';
import { takeEvery } from 'redux-saga'

/**
 * queryCount
 */
export const queryCount = function *({payload}){

    try{
        let result = yield call(apis.getCount);
        yield put({
            type: ActionTypes.QUERY_COUNT,
            payload:result
        });

    }catch(e){

        throw new Error(e);
    }
};

/**
 * queryCount
 */
export const increaseCount = function *({payload}){
    
    try{
        let result = yield call(apis.increaseCount);
        yield put({
            type: ActionTypes.QUERY_COUNT,
            payload:result
        });

    }catch(e){

        throw new Error(e);
    }
};

/**
 * queryCount
 */
export const encreaseCount = function *({payload}){
    
    try{
        let result = yield call(apis.encreaseCount);
        yield put({
            type: ActionTypes.QUERY_COUNT,
            payload:result
        });

    }catch(e){

        throw new Error(e);
    }
};


export function* watchQueryCount() {
    yield takeEvery('queryCount', queryCount)
    yield takeEvery('increaseCount', increaseCount)
    yield takeEvery('encreaseCount', encreaseCount)
}

function *watchFetchData() {
    yield [
        watchQueryCount()
    ];
}

export default watchFetchData;