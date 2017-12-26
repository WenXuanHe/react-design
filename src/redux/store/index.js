/**
 * createStore 生成store
 * applyMiddleware  应用中间件，异步改变状态
 * compose
 * redux-thunk 改造store.dispatch，使后者可以接受函数作为参数
 */
import {createStore, applyMiddleware} from 'redux'
import createSagaMiddleware from 'redux-saga'
import reducer from '../reducers'
import mySaga from '../sagas'

const sagaMiddleware = createSagaMiddleware(mySaga);

export default (initialState) => {
  const store = createStore(
    reducer,
    initialState,
    applyMiddleware(
      sagaMiddleware
    )
  );

  return store;
}
